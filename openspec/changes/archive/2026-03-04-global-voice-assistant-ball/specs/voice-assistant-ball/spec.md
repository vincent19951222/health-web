## ADDED Requirements

### Requirement: 全局悬浮球渲染
系统 SHALL 在所有页面右下角固定渲染一个圆形语音助手悬浮球按钮，悬浮球不随页面滚动移动，始终可见。

#### Scenario: 悬浮球在任意页面可见
- **WHEN** 用户访问应用内任意路由页面
- **THEN** 右下角 SHALL 显示语音助手悬浮球，且不遮挡主内容操作区

#### Scenario: 悬浮球 hover 效果
- **WHEN** 用户鼠标悬停在悬浮球上
- **THEN** 悬浮球 SHALL 展示放大 + 高亮的视觉反馈

---

### Requirement: 录音状态交互
系统 SHALL 支持通过点击悬浮球在 idle / listening 两种状态间切换。

#### Scenario: 点击开始录音
- **WHEN** 用户在 idle 状态点击悬浮球
- **THEN** 系统 SHALL 请求麦克风权限并开始语音识别，悬浮球切换至 listening 状态（脉冲动画）

#### Scenario: 点击停止录音
- **WHEN** 用户在 listening 状态再次点击悬浮球
- **THEN** 系统 SHALL 停止语音识别，悬浮球恢复 idle 状态

#### Scenario: 麦克风权限被拒绝
- **WHEN** 用户拒绝麦克风权限请求
- **THEN** 字幕气泡 SHALL 显示"请在浏览器设置中允许麦克风权限"，悬浮球恢复 idle 状态

#### Scenario: 不支持的浏览器
- **WHEN** 用户使用不支持 Web Speech API 的浏览器打开应用
- **THEN** 点击悬浮球时 SHALL 在字幕气泡提示"请使用 Chrome 或 Edge 浏览器以启用语音功能"

---

### Requirement: 实时字幕展示
系统 SHALL 将语音识别的中间结果（interim）和最终结果（final）以字幕气泡形式实时展示在悬浮球旁边。

#### Scenario: 实时转录字幕显示
- **WHEN** 语音识别返回 interim 结果
- **THEN** 字幕气泡 SHALL 实时更新文字内容，字体颜色以灰色区分中间结果

#### Scenario: 最终转录结果展示
- **WHEN** 语音识别返回 final 结果
- **THEN** 字幕气泡 SHALL 以深色字体显示最终转录文字

#### Scenario: 字幕自动淡出
- **WHEN** 停止录音后 3 秒内无新的识别结果
- **THEN** 字幕气泡 SHALL 渐隐消失

#### Scenario: 字幕内容不执行业务逻辑
- **WHEN** 字幕气泡展示转录内容
- **THEN** 系统 SHALL 不执行任何导航、表单填写或 API 调用操作
