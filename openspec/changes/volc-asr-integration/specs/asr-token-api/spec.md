## ADDED Requirements

### Requirement: ASR Connection Config API
系统 SHALL 提供 Next.js API Route `GET /api/asr-token`，用于返回前端连接 ASR 代理所需的非敏感参数，并在服务端检查 ASR 配置可用性。

#### Scenario: 成功返回连接配置
- **WHEN** 前端调用 `GET /api/asr-token`
- **THEN** 系统 SHALL 返回 `200` 和 `{ wsUrl: string }`，其中 `wsUrl` 指向可连接的代理地址（如开发环境 `ws://localhost:8766`）

#### Scenario: 服务未配置
- **WHEN** `VOLC_ASR_API_KEY` 或 `VOLC_ASR_APP_ID` 未配置
- **THEN** API Route SHALL 返回 `500` 和 `{ error: "ASR service not configured" }`

#### Scenario: 响应体不泄露密钥
- **WHEN** 任意客户端请求 `GET /api/asr-token`
- **THEN** 响应体 SHALL 不包含 `apiKey`、`accessKey`、`token` 等敏感字段

## MODIFIED Requirements

### Requirement: Web Speech API 集成
系统的默认 ASR 实现 SHALL 由 `WebSpeechProvider` 替换为 `VolcASRProvider`，`ASRProvider` 接口定义（`start`/`stop`/`isSupported`）保持不变，`{ text: string; isFinal: boolean }` 回调格式保持不变。

#### Scenario: 默认使用 VolcASR Provider
- **WHEN** 系统初始化语音助手组件
- **THEN** 系统 SHALL 使用 `VolcASRProvider` 作为默认实现，取代原 `WebSpeechProvider`

#### Scenario: Provider 统一回调格式
- **WHEN** `VolcASRProvider` 返回识别结果
- **THEN** 回调 SHALL 提供 `{ text: string, isFinal: boolean }`，UI 层无需感知底层供应商变化
