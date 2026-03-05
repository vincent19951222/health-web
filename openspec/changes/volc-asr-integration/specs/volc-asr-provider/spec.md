## ADDED Requirements

### Requirement: 火山引擎 WebSocket ASR 客户端
系统 SHALL 实现 `VolcASRProvider`，并通过 ASR 代理服务与火山引擎流式 ASR 通信，同时满足现有 `ASRProvider` 接口（`start` / `stop` / `isSupported`）。

#### Scenario: 成功建立连接并开始识别
- **WHEN** 用户触发 `VolcASRProvider.start()`
- **THEN** 系统 SHALL 先调用 `/api/asr-token` 获取代理地址，再建立 WebSocket 连接并发送 full client request，进入流式音频发送状态

#### Scenario: 实时流式发送音频
- **WHEN** WebSocket 连接可用且录音进行中
- **THEN** 系统 SHALL 按 100~200ms 分片发送 `PCM_S16LE` 音频帧

#### Scenario: 接收 interim 结果
- **WHEN** 服务端返回 `result.utterances[*].definite = false`
- **THEN** 系统 SHALL 回调 `{ text: result.text, isFinal: false }`

#### Scenario: 接收 final 结果
- **WHEN** 服务端返回 `result.utterances[*].definite = true`
- **THEN** 系统 SHALL 回调 `{ text: result.text, isFinal: true }`

#### Scenario: 停止录音
- **WHEN** `VolcASRProvider.stop()` 被调用
- **THEN** 系统 SHALL 停止音频采集，发送带最后一包标记的音频帧，并关闭 WebSocket 连接

#### Scenario: WebSocket 异常重连
- **WHEN** WebSocket 触发 `onerror` 或非主动 `onclose`
- **THEN** 系统 SHALL 自动重连最多 3 次，超过次数后回调 `onError('connection_failed')`

---

### Requirement: PCM 采集与降采样
系统 SHALL 使用浏览器音频能力将麦克风输入转换为 16kHz 单声道 `PCM_S16LE`。

#### Scenario: 输入采样率不是 16kHz
- **WHEN** `AudioContext.sampleRate` 不等于 16000
- **THEN** 系统 SHALL 执行降采样并输出 16kHz PCM 数据

#### Scenario: 已授予麦克风权限
- **WHEN** `getUserMedia` 成功返回音频流
- **THEN** 系统 SHALL 创建音频处理节点并持续采集 PCM 数据供发送

