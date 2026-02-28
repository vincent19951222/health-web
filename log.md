# 项目更新日志

## 2026-02-28
- 优化了 `prototype_design/web/system_settings.html` 页面的 UI 交互：
  - 将“账号安全”和“系统偏好”模块重构成使用 `<details>` 和 `<summary>` 标签的可折叠卡片。
  - 默认状态下折叠内容，点击标题区域即可展开或收起，提升了页面主要区域的浏览体验。
  - 增加了展开与折叠状态时的箭头动画效果。
- 对齐了 `@web` 目录下所有 HTML 原型图的左侧侧边栏 UI，消除了“优唐”与“优糖”文本不一致及字体粗细差异，统一使用了 `dashboard.html` 的侧边栏设计，并确保各自所属菜单项的高亮（Active）状态正确显示。
- 在 `src/app/` 目录下，使用 Next.js 和 Tailwind CSS 高保真还原了 `prototype_design/web/dashboard.html`，构建了 `Sidebar`、`Header` 以及仪表盘各项子组件，使 Web 页面融入到 Next.js 框架体系中。
- 修复了 Tailwind CSS v4 的 `@source` 扫描路径问题（从 `"../"` 改为 `"../../src"`），解决了大量 CSS class 未生效的问题。
- 将原型 HTML 的自定义 CSS 完整迁移到 Next.js，用精确的 CSS 类名替代了 Tailwind utilities，使 Next.js 版本视觉效果与原型高度一致。
- 完成 CSS 分层重构，将原 17KB 的单一 `globals.css` 拆分为三层架构：
  - `src/styles/layout.css` — 侧边栏、Header 等所有页面共享的布局样式
  - `src/styles/components.css` — 状态徽章、Section Header 等跨页面通用组件样式
  - `src/styles/dashboard.css` — Dashboard 页面专用样式，通过 `DashboardLayout.tsx` 引入

