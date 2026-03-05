## Why

当前语音悬浮球使用浏览器原生 Web Speech API，依赖外部服务，在国内网络环境可用性不稳定。  
接入火山引擎豆包流式 ASR（`bigmodel`）是正确方向，但根据官方文档，WebSocket 握手必须携带 `X-Api-*` 鉴权头，浏览器原生 WebSocket 无法自定义这些 Header。

因此，方案需要明确为：**浏览器连接本地/服务端代理，代理再连接火山引擎并注入鉴权头**，而不是浏览器直接连火山地址。

## What Changes

- **新增** `VolcASRProvider`：实现 `ASRProvider` 接口，处理音频采集、协议帧封装、结果解析与重连。
- **新增** 本地代理 `server/asr-proxy.js`：由代理负责连接 `wss://openspeech.bytedance.com/api/v3/sauc/bigmodel` 并注入 `X-Api-App-Key`、`X-Api-Access-Key`、`X-Api-Resource-Id`、`X-Api-Connect-Id`。
- **新增** Next.js API Route `GET /api/asr-token`：仅下发前端可用连接信息（如 `wsUrl`），并做服务配置检查。
- **修改** `VoiceAssistantBall/index.tsx`：默认 `ASRProvider` 切换为 `VolcASRProvider`，UI 交互保持不变。
- **保留** `ASRProvider` 抽象：确保后续替换供应商时 UI 层无需改动。

## Capabilities

### New Capabilities

- `volc-asr-provider`  
  实现 WebSocket 二进制协议、16kHz PCM 采集与分片发送（100~200ms）、interim/final 结果回调、断线重连。
- `asr-proxy-gateway`  
  通过 Node.js 代理桥接浏览器与火山引擎，解决浏览器无法设置自定义握手 Header 的限制。
- `asr-token-api`  
  提供前端可消费的连接配置（`wsUrl`），不暴露任何密钥。

### Modified Capabilities

- `asr-integration`  
  语音识别底层由 `WebSpeechProvider` 切换到 `VolcASRProvider`，`{ text, isFinal }` 回调协议保持不变。

## Impact

- **新增文件**：`src/components/VoiceAssistantBall/volcASRProvider.ts`
- **新增文件**：`src/app/api/asr-token/route.ts`
- **新增文件**：`server/asr-proxy.js`
- **修改文件**：`src/components/VoiceAssistantBall/index.tsx`
- **配置变更**：`.env.local` 配置 `VOLC_ASR_API_KEY`（由服务端读取，且 `.env*` 已被忽略）
- **网络路径**：前端连接代理 `ws://localhost:8766`（开发环境），代理再连接火山 `wss://openspeech.bytedance.com/api/v3/sauc/bigmodel`

## Security Notes

- API Key 仅允许存在于服务端环境变量，不得出现在前端代码、浏览器 Network 响应体或持久化存储中。
- `/api/asr-token` 仅返回非敏感连接参数，不返回 `apiKey/token`。

