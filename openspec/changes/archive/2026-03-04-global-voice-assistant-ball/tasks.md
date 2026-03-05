## 1. 组件目录与基础结构

- [ ] 1.1 创建 `src/components/VoiceAssistantBall/` 目录结构（`index.tsx`、`SubtitleBubble.tsx`、`voice-assistant.css`）
- [ ] 1.2 定义 `ASRProvider` 接口类型（`{ text: string; isFinal: boolean }` 回调格式）
- [ ] 1.3 实现 `WebSpeechProvider`：封装 `SpeechRecognition`，支持 `continuous`、`interimResults`、`lang: 'zh-CN'`，并处理超时自动重启

## 2. 悬浮球 UI 组件

- [ ] 2.1 实现 `VoiceAssistantBall` 主组件，包含 idle / listening / error 三种状态的状态机
- [ ] 2.2 实现点击切换录音状态逻辑（开始/停止 `SpeechRecognition`）
- [ ] 2.3 添加浏览器兼容性检测：不支持 Web Speech API 时，点击后在字幕气泡显示引导提示
- [ ] 2.4 捕获麦克风权限拒绝（`NotAllowedError`），在字幕气泡显示权限引导

## 3. 字幕气泡组件

- [ ] 3.1 实现 `SubtitleBubble` 组件，接收 `{ text, isFinal, visible }` props
- [ ] 3.2 中间结果（interim）使用灰色字体，最终结果（final）使用深色字体样式
- [ ] 3.3 实现停止录音 3 秒后字幕气泡渐隐消失的定时逻辑

## 4. 样式与动画

- [ ] 4.1 编写 `voice-assistant.css`：悬浮球固定定位（右下角）、圆形按钮、渐变背景、hover 放大效果
- [ ] 4.2 实现 listening 状态的脉冲动画（`@keyframes pulse`）
- [ ] 4.3 实现字幕气泡的定位（悬浮球左侧）、圆角气泡样式、文字折行、淡入淡出过渡动画

## 5. 全局挂载

- [ ] 5.1 在 `src/app/layout.tsx` 中引入并渲染 `<VoiceAssistantBall />`，验证在所有路由页面均可见
- [ ] 5.2 确认悬浮球层级（`z-index`）不遮挡模态框等高层级元素

## 6. 验证与收尾

- [ ] 6.1 在 Chrome/Edge 中手动测试：点击录音、查看实时字幕、停止录音、字幕淡出
- [ ] 6.2 测试麦克风权限拒绝场景的错误提示
- [ ] 6.3 测试 Firefox/Safari 下的不兼容提示
- [ ] 6.4 更新 `log.md`，记录本次功能上线
