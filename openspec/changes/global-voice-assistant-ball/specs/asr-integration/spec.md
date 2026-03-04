## ADDED Requirements

### Requirement: Web Speech API 集成
系统 SHALL 使用浏览器原生 `SpeechRecognition` API 进行语音识别，并以 `continuous: true`、`interimResults: true`、`lang: 'zh-CN'` 配置运行。

#### Scenario: 启动语音识别
- **WHEN** 用户点击悬浮球触发录音
- **THEN** 系统 SHALL 调用 `SpeechRecognition.start()`，并持续监听 `onresult` 事件获取转录文本

#### Scenario: 处理中间识别结果
- **WHEN** `SpeechRecognition` 触发 `onresult` 事件且 `isFinal` 为 false
- **THEN** 系统 SHALL 将 interim 文本更新至字幕气泡状态

#### Scenario: 处理最终识别结果
- **WHEN** `SpeechRecognition` 触发 `onresult` 事件且 `isFinal` 为 true
- **THEN** 系统 SHALL 将 final 文本更新至字幕气泡状态，并清空 interim 缓冲

#### Scenario: 识别超时自动重启
- **WHEN** `SpeechRecognition` 触发 `onend` 事件且悬浮球仍处于 listening 状态
- **THEN** 系统 SHALL 自动重新调用 `SpeechRecognition.start()` 以延续识别

---

### Requirement: ASRProvider 可扩展接口
系统 SHALL 通过 `ASRProvider` 接口抽象语音识别实现，使后续替换为第三方 ASR 服务（如讯飞、Azure）时无需修改 UI 组件代码。

#### Scenario: 默认使用 Web Speech Provider
- **WHEN** 系统初始化语音助手组件
- **THEN** 系统 SHALL 默认使用 `WebSpeechProvider` 实现 `ASRProvider` 接口

#### Scenario: Provider 统一回调格式
- **WHEN** 任意 ASRProvider 返回识别结果
- **THEN** 回调 SHALL 提供 `{ text: string, isFinal: boolean }` 格式的统一结构
