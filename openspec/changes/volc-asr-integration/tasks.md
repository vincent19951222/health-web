## 1. 环境与代理配置

- [x] 1.1 在 `.env.local` 中配置 `VOLC_ASR_API_KEY`（仅服务端读取）
- [x] 1.2 确认 `.env*` 已在 `.gitignore` 中，密钥不入库
- [x] 1.3 新增并启动 `server/asr-proxy.js`，作为浏览器与火山之间的 WebSocket 中转

## 2. ASR 连接配置 API

- [x] 2.1 创建 `src/app/api/asr-token/route.ts`，实现 `GET` 处理器
- [x] 2.2 `GET /api/asr-token` 返回 `{ wsUrl: string }`（前端连接代理地址）
- [x] 2.3 未配置 `VOLC_ASR_API_KEY` 或 `VOLC_ASR_APP_ID` 时返回 `500` + `{ error: "ASR service not configured" }`
- [x] 2.4 确认响应体不包含 `apiKey/token/accessKey` 等敏感字段

## 3. VolcASR Provider 核心实现

- [x] 3.1 创建 `src/components/VoiceAssistantBall/volcASRProvider.ts`，实现 `ASRProvider` 接口
- [x] 3.2 实现 `buildFullClientRequest()`：封装 full client request 二进制帧
- [x] 3.3 实现 `buildAudioRequest()`：封装 audio-only request，支持 last packet 标记
- [x] 3.4 实现 `parseServerResponse()`：解析服务端响应并提取 `result.text` 与 `utterances[*].definite`
- [x] 3.5 实现音频采集：`getUserMedia` + `AudioContext` + `ScriptProcessorNode`
- [x] 3.6 实现降采样：统一到 `16000Hz` + `PCM_S16LE`
- [x] 3.7 实现 `start()`：请求 `/api/asr-token` -> 建立代理 WebSocket -> 发送 full request -> 开始音频流
- [x] 3.8 实现 `stop()`：发送最后一包音频 -> 关闭连接 -> 释放音频资源
- [x] 3.9 实现断连自动重连（最多 3 次），超限回调 `onError('connection_failed')`

## 4. UI 集成

- [x] 4.1 修改 `src/components/VoiceAssistantBall/index.tsx`，默认 provider 改为 `new VolcASRProvider()`
- [x] 4.2 保持回调结构 `{ text, isFinal }` 与 UI 逻辑兼容
- [x] 4.3 `isSupported()` 以 `getUserMedia + WebSocket` 可用性为准

## 5. 验证

- [x] 5.1 启动前端与代理，确认可建立到代理的 WebSocket 连接
- [x] 5.2 说话时字幕气泡实时显示（interim/final）
- [x] 5.3 停止录音后 3 秒淡出保持正常
- [x] 5.4 确认 API Key 未出现在前端 Bundle 和 `/api/asr-token` 响应体中
- [x] 5.5 更新 `log.md` 记录本次变更
