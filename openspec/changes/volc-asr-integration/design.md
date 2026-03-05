## Context

项目已有 `VoiceAssistantBall` 组件和 `ASRProvider` 接口（`webSpeechProvider.ts`）。  
当前 `WebSpeechProvider` 可用性受网络环境影响，无法稳定满足业务需求。

根据火山引擎文档（`volcengine_6561_1354869.md` 对应源文档）：

- WebSocket 接口：`wss://openspeech.bytedance.com/api/v3/sauc/bigmodel`
- 握手需要 `X-Api-App-Key`、`X-Api-Access-Key`、`X-Api-Resource-Id`、`X-Api-Connect-Id`
- 使用二进制帧协议，音频推荐按 100~200ms 分片发送

浏览器原生 WebSocket 无法附加上述自定义 Header，因此必须引入代理层。

## Goals / Non-Goals

**Goals**
- 不改动现有 UI 交互，仅替换 ASRProvider 底层实现
- 浏览器侧采集麦克风音频，转为 16kHz PCM_S16LE 并流式发送
- 通过代理完成火山鉴权，密钥仅在服务端存在
- 维持统一回调结构：`{ text: string; isFinal: boolean }`

**Non-Goals**
- 语音指令执行（本变更仅输出字幕）
- 音频文件落盘、后端存储与转写任务系统
- 多语种策略和高级识别参数全量支持

## Decisions

### 1) 鉴权架构：代理中转（强制）

**Decision**  
采用 `Browser -> ws://localhost:8766 (Proxy) -> wss://openspeech.bytedance.com/...`。  
代理负责注入 `X-Api-*` 头并转发双向二进制帧。

**Rationale**
- 浏览器 WebSocket 不能安全且稳定地满足文档要求的握手 Header
- 密钥下发给浏览器会产生泄露风险

**Consequence**
- 需要额外维护 `server/asr-proxy.js`
- 部署时要保证代理进程可用，并处理端口与重启策略

---

### 2) `/api/asr-token` 契约：只返回连接配置，不返回密钥

**Decision**  
`GET /api/asr-token` 仅返回前端连接代理所需的配置（当前最小返回 `{ wsUrl }`），并校验 `VOLC_ASR_API_KEY` 与 `VOLC_ASR_APP_ID` 是否已配置。

**Rationale**
- 路由名沿用历史命名，降低改动面
- 实际语义是“连接配置”，不承担 token 下发

**Error Contract**
- 未配置时：`500` + `{ error: "ASR service not configured" }`

---

### 3) 音频采集与降采样

**Decision**  
使用 `getUserMedia + AudioContext + ScriptProcessorNode` 采集音频；  
若采样率不是 16kHz，执行线性插值降采样，输出 `PCM_S16LE`。

**Rationale**
- 兼容当前浏览器环境与既有代码结构
- 满足火山音频参数要求（`rate=16000, bits=16, channel=1`）

---

### 4) 协议封装策略

**Decision**  
在 `volcASRProvider.ts` 内封装：
- `buildFullClientRequest()`
- `buildAudioRequest()`
- `parseServerResponse()`

帧结构统一采用文档定义的二进制格式（大端），并通过 `message type / flags` 区分 full、audio、last packet 与错误帧。

**Rationale**
- 协议细节集中封装，UI 不感知底层供应商协议差异

---

### 5) 可靠性策略

**Decision**
- WebSocket 断连自动重连，最多 3 次
- 超限触发 `onError('connection_failed')`
- `stop()` 时发送最后一包音频标记并清理音频资源

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| 代理进程不可用导致前端无法识别 | 启动脚本中显式拉起代理，增加健康检查与日志 |
| 音频降采样精度损失 | 统一 16kHz 目标并在 provider 内做线性插值 |
| 服务端链路排错困难 | 记录 `X-Api-Connect-Id` 与 `X-Tt-Logid`（代理日志） |
| `ScriptProcessorNode` 长期可维护性 | 后续可迁移到 `AudioWorkletNode` |

## Migration Plan

1. 保留 `ASRProvider` 接口，新增 `VolcASRProvider`
2. 新增代理服务并接入火山鉴权 Header
3. 调整 `/api/asr-token` 为“连接配置路由”
4. `index.tsx` 替换 provider 实例
5. 手工联调通过后再考虑下线旧 `WebSpeechProvider`
