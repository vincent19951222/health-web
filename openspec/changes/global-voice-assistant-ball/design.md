## Context

项目是一个面向老年用户的健康管理 Web 应用（Next.js + TypeScript），当前已有侧边栏导航、血糖/血压记录、AI 问诊等核心模块。用户交互全部通过键盘/鼠标完成，缺少语音输入路径。本设计为第一版原型，目标是验证"语音悬浮球"交互模式，快速上线、低侵入。

## Goals / Non-Goals

**Goals:**
- 在所有页面右下角渲染一个固定定位的语音助手悬浮球
- 点击悬浮球后触发麦克风录音，展示实时/最终转录字幕
- 使用浏览器原生 `Web Speech API` 作为 ASR 层，无需后端改动
- 字幕仅展示，不触发任何业务逻辑或导航

**Non-Goals:**
- 语音指令执行（导航、填写表单、调用 API 等）
- 接入付费 ASR 服务（如讯飞、Azure Speech）——留给后续迭代
- 移动端/小程序适配
- 语音历史记录持久化

## Decisions

### 1. 挂载位置：`layout.tsx` 全局插入

**决策**：在 `src/app/layout.tsx` 的 `<body>` 末尾渲染 `<VoiceAssistantBall />`，利用 Next.js App Router 根布局实现真正全局可见。

**备选方案**：在每个页面单独引入 → 维护成本高，排除。

---

### 2. ASR 方案：Web Speech API（优先）

**决策**：使用 `window.SpeechRecognition`（Chrome/Edge 原生支持），`continuous: true` + `interimResults: true` 实现实时字幕流。代码中预留 `ASRProvider` 接口，供后续替换为讯飞/Azure。

**备选方案**：直接调用第三方 API → 需要后端代理、密钥管理，原型阶段不必要，排除。

**风险**：Safari 不支持 Web Speech API → 提示用户使用 Chrome，在 UI 上给出友好提示。

---

### 3. 字幕展示方式：悬浮球旁气泡

**决策**：字幕以绝对定位气泡（`position: fixed`）显示在悬浮球左侧，最大宽度 320px，超出折行，超过 3 秒无新内容后自动淡出。

**交互状态机**：
```
idle → listening（点击） → transcribing（有返回文本） → idle（停止/超时）
```

---

### 4. 组件结构

```
src/components/VoiceAssistantBall/
├── index.tsx          # 主组件（状态机 + 事件处理）
├── SubtitleBubble.tsx # 字幕气泡子组件
└── voice-assistant.css # 专用样式（动画、定位）
```

不使用 CSS Modules，保持与项目现有全局 CSS 文件的一致风格。

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| Web Speech API 仅限 Chrome/Edge | UI 提示，非 Chrome 时显示"请使用 Chrome 浏览器以启用语音功能" |
| 麦克风权限被拒绝 | 捕获 `NotAllowedError`，在气泡中显示权限引导提示 |
| 长时间录音断开（约 60s 超时） | 监听 `onend` 事件并在录音状态下自动重启识别 |
| 悬浮球遮挡页面内容 | 提供拖动位置功能（v2），v1 固定右下角 + 半透明 hover 效果 |

## Open Questions

- 后续版本是否需要接入讯飞 ASR（免费额度 vs. Web Speech API 精度对比）？
- 是否需要支持方言输入（粤语、闽南语）？这影响 ASR 服务商选型。
