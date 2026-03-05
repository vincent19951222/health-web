## Why

老年用户在健康管理场景中频繁需要录入数据或提问，但键盘输入对老年群体存在较高使用门槛，语音输入是更自然、无障碍的交互方式。通过全局悬浮球提供随时可用的语音入口，降低交互阻力，验证该交互模式的可行性与用户接受度。

## What Changes

- **新增** 全局悬浮球组件（`VoiceAssistantBall`），固定于页面右下角，在所有页面均可见
- **新增** 点击后触发麦克风权限请求并开始录音的交互逻辑
- **新增** 基于 Web Speech API（浏览器原生）或接入第三方 ASR API 的语音识别集成
- **新增** 字幕展示区域：转录结果以浮动字幕形式展示在悬浮球旁边，不执行任何业务逻辑
- **新增** 录音状态动画：悬浮球在录音/处理状态时展示不同视觉反馈（脉冲动画等）

## Capabilities

### New Capabilities

- `voice-assistant-ball`: 全局悬浮球 UI 组件，包含点击交互、录音状态动画及字幕展示区域
- `asr-integration`: 语音识别接入层，支持 Web Speech API（浏览器原生，首选）及可扩展的第三方 ASR 接口

### Modified Capabilities

（无，首版为全新功能）

## Impact

- **前端组件**：新增 `src/components/VoiceAssistantBall/` 组件目录，在 `src/app/layout.tsx` 全局挂载
- **CSS 样式**：新增 `voice-assistant-ball.css`，处理悬浮球定位、动画、字幕样式
- **浏览器 API**：依赖浏览器原生 `Web Speech API`（`SpeechRecognition`），无需额外后端依赖（第一版原型）
- **权限**：需要浏览器麦克风权限（`navigator.mediaDevices`）
- **兼容性**：主要针对 Chrome/Edge 等支持 Web Speech API 的桌面浏览器（与现有 Web 端定位一致）
