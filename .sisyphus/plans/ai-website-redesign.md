# AItruewit (真智达) 企业官网前端升级计划

## TL;DR

> **快速摘要**: 对现有静态 B2B 官网进行现代化 UI/UX 升级，保持导航与首页 6 Sections 顺序不变。

**交付物**:
- 升级版设计系统 (CSS Variables + Design Tokens)
- 模块化组件库 (HeaderNav, QuickRFQ, Cards 等)
- 增强版首页 (6 Sections + 移动端优化)
- 所有子页面基础版式
- 完整表单校验与状态管理

**预估工作量**: 中等 (5-7 天开发)
**并行执行**: YES - CSS/JS/HTML 可并行开发

---

## 1. Context

### 1.1 现有代码库结构

```
├── index.html                    # 首页 (6 sections)
├── assets/css/styles.css         # 现有样式 (609 lines)
├── assets/js/site.js             # 滚动动画
├── assets/js/quick-rfq.js        # 表单跳转
├── about/index.html
├── blog/index.html
├── contact/index.html            # 包含完整 RFQ 表单
├── products/index.html
├── oem-customization/index.html
├── quality-compliance/index.html
└── privacy/terms/cookies/
```

### 1.2 现有设计系统

```css
:root {
  --bg: #f7f8fb;
  --surface: #ffffff;
  --ink: #121826;
  --muted: #5b6b82;
  --primary: #1763ff;
  --radius-lg: 24px;
  --radius-md: 16px;
}
```

---

## 2. Work Objectives

### 2.1 核心目标

1. **设计系统升级**: CSS 变量升级为完整设计令牌系统
2. **组件化重构**: 创建可复用 UI 组件
3. **移动端优化**: 汉堡菜单和 Drawer 交互
4. **表单增强**: Quick RFQ 校验、状态管理、API 预留
5. **动效增强**: 滚动 reveal 动画
6. **可访问性**: 键盘可达、对比度足够

### 2.2 交付物清单

| 文件/组件 | 描述 | 优先级 |
|-----------|------|--------|
| design-tokens.css | 设计令牌文件 | P0 |
| styles.css | 主样式表升级 | P0 |
| assets/js/components/header-nav.js | 导航组件 | P0 |
| assets/js/components/quick-rfq.js | Quick RFQ 组件 | P0 |
| assets/js/components/mobile-drawer.js | 移动端 Drawer | P0 |
| index.html | 升级版首页 | P0 |
| contact/index.html | 完整 RFQ + #quote | P0 |
| products/index.html | 产品页面 | P1 |
| oem-customization/index.html | OEM 页面 | P1 |
| quality-compliance/index.html | 质量合规 | P1 |
| about/index.html | 关于页面 | P1 |
| blog/index.html | 博客页面 | P1 |
| README.md | 项目文档 | P2 |

### 2.3 完成定义

- [ ] 所有页面在桌面/平板/手机上都正确显示
- [ ] Header 导航吸顶、移动端汉堡菜单可用
- [ ] Quick RFQ 表单校验正常工作
- [ ] 滚动时 reveal 动画正常触发
- [ ] 键盘可完整导航所有交互元素
- [ ] 所有链接指向正确的路由

### 2.4 必须有 (Must Have)

**导航顺序 (固定)**:
Home → Products → OEM & Customization → Quality & Compliance → About → Blog → Contact

**首页 6 Sections 顺序 (固定)**:
Hero → Why → Featured Categories → OEM Ready → Quality+Scenarios → Quick RFQ

**Design Tokens (必须实现)**:
- --bg: #FFFFFF
- --bg-muted: #F6F8FB
- --primary: #2563EB
- --primary-700: #1D4ED8
- --text: #0B1220
- --text-muted: #5B667A
- --border: #E6EAF2
- --radius-card: 20px
- --radius-input: 14px
- --radius-pill: 9999px
- --shadow-card: 0 30px 80px rgba(15, 23, 42, 0.10)

### 2.5 必须没有 (Guardrails)

- 不改变导航链接的文本和顺序
- 不改变首页 6 Sections 的内容顺序
- 不添加用户未要求的页面
- 不使用夸张的动画效果
- 不使用外部图片资源 (背景渐变用 CSS 实现)

---

## 3. Verification Strategy

### 3.1 验收命令

```bash
# 检查文件存在
ls -la assets/css/design-tokens.css assets/css/styles.css
ls -la assets/js/components/

# 手动测试清单
# - 打开首页 http://localhost:8000/
# - 滚动检查 reveal 动画
# - 点击导航链接检查路由
# - 调整浏览器宽度检查响应式
# - 测试 Quick RFQ 表单校验
# - 测试移动端汉堡菜单
```

---

## 4. Execution Strategy

### 4.1 并行执行 Waves

```
Wave 1 (立即开始):
├── Task 1: design-tokens.css
├── Task 2: styles.css 升级
└── Task 5: mobile-drawer.js

Wave 2 (After Wave 1):
├── Task 3: header-nav.js
├── Task 4: quick-rfq.js
└── Task 6: index.html 升级

Wave 3 (After Wave 2):
├── Task 7: contact/index.html
└── Task 8: 其他子页面

Wave 4 (Parallel):
├── Task 9: site.js 升级
└── Task 10: README 文档
```

### 4.2 依赖矩阵

| 任务 | 依赖 | 阻塞 | 可并行 |
|------|------|------|--------|
| 1. Design Tokens | None | 2,3,4,5 | - |
| 2. Styles Upgrade | 1 | 3,4,6 | 1 |
| 3. HeaderNav | 1,2 | 6 | 2,5 |
| 4. QuickRFQ | 1,2 | 6 | 2,5 |
| 5. Mobile Drawer | 1,2 | 3 | 2 |
| 6. Homepage | 2,3,4 | 7,8 | - |
| 7. Contact Page | 6 | None | 8 |
| 8. Other Pages | 6 | None | 7 |
| 9. site.js | 3,4,5 | None | 10 |
| 10. README | All | None | 9 |

---

## 5. TODOs

### 5.1 基础架构

- [ ] 1. 创建 `assets/css/design-tokens.css`

  **做什么**:
  - 定义完整的 CSS 变量系统
  - 颜色、圆角、阴影、字体、间距变量

  **参考**:
  - `assets/css/styles.css:1-29` (现有 CSS 变量)
  - 用户规格: --bg: #FFFFFF, --bg-muted: #F6F8FB, --primary: #2563EB

  **验收标准**:
  - [ ] CSS 文件创建成功
  - [ ] 所有设计令牌定义正确

- [ ] 2. 升级 `assets/css/styles.css`

  **做什么**:
  - 引入 design-tokens.css
  - 重写组件样式 (Card, Button, Form, etc.)
  - 添加响应式断点 (768px, 1024px)
  - 添加背景渐变效果
  - 添加可访问性样式 (focus ring)
  - 添加动效类 (.reveal, .reveal-visible)

  **参考**:
  - `assets/css/styles.css:31-609` (现有样式)
  - 用户规格: 圆角 20px/14px, 柔和阴影

  **验收标准**:
  - [ ] 样式表升级完成
  - [ ] 所有组件样式正确

### 5.2 组件开发

- [ ] 3. 创建 `assets/js/components/header-nav.js`

  **做什么**:
  - 吸顶效果 (sticky header)
  - 当前页高亮
  - 移动端汉堡菜单按钮
  - 导航链接顺序: Home → Products → OEM & Customization → Quality & Compliance → About → Blog → Contact

  **必须不做**:
  - 不改变链接的 href 值
  - 不改变导航顺序

  **参考**:
  - `index.html:30-53` (现有 header HTML)

  **验收标准**:
  - [ ] 导航吸顶生效
  - [ ] 移动端汉堡菜单可用
  - [ ] CTA 按钮跳转到 /contact#quote

- [ ] 4. 创建 `assets/js/components/quick-rfq.js`

  **做什么**:
  - 表单校验 (name, email, product interest 必填)
  - Email 格式校验
  - 提交 loading 状态
  - POST /api/lead 预留接口
  - 成功后跳转到 /contact#quote

  **必须不做**:
  - 不改变字段顺序

  **参考**:
  - `assets/js/quick-rfq.js` (现有实现)

  **验收标准**:
  - [ ] 表单校验正常工作
  - [ ] 提交后跳转到 /contact#quote

- [ ] 5. 创建 `assets/js/components/mobile-drawer.js`

  **做什么**:
  - 汉堡菜单按钮 (手机端显示)
  - Drawer 滑出动画
  - 遮罩层点击关闭
  - 相同的导航链接顺序

  **验收标准**:
  - [ ] 移动端显示汉堡菜单
  - [ ] Drawer 滑出动画正常

### 5.3 页面开发

- [ ] 6. 升级 `index.html` 首页

  **做什么**:
  - Section 1: Hero (badge, 双按钮, 3 chips, 右侧面板+3卡)
  - Section 2: Why (3 cards)
  - Section 3: Featured Categories (3 product cards)
  - Section 4: OEM Ready (split layout)
  - Section 5: Quality+Scenarios (split layout)
  - Section 6: Quick RFQ (左右分栏, FormCard)

  **必须不做**:
  - 不改变 6 Sections 顺序

  **参考**:
  - `index.html:55-245` (现有首页结构)

  **验收标准**:
  - [ ] 6 Sections 顺序正确
  - [ ] Quick RFQ 布局正确

- [ ] 7. 创建 `contact/index.html`

  **做什么**:
  - #quote 锚点
  - 完整 RFQ 表单
  - 联系信息

  **验收标准**:
  - [ ] #quote 锚点存在
  - [ ] 完整 RFQ 表单可用

- [ ] 8. 创建其他页面

  **做什么**:
  - `products/index.html`
  - `oem-customization/index.html`
  - `quality-compliance/index.html`
  - `about/index.html`
  - `blog/index.html`

  **验收标准**:
  - [ ] 页面路由正确
  - [ ] 样式与首页一致

### 5.4 文档与优化

- [ ] 9. 升级 `assets/js/site.js`

  **做什么**:
  - 优化 reveal 动画
  - 集成新组件

- [ ] 10. 创建 `README.md`

  **做什么**:
  - 一键运行说明
  - 目录结构
  - 占位字段位置

---

## 6. 对齐检查清单

在输出最终代码前，验证以下对齐点：

### 6.1 Header 导航
- [ ] 品牌文字 Logo (左侧): AItruewit
- [ ] 中间导航顺序: Home → Products → OEM & Customization → Quality & Compliance → About → Blog → Contact
- [ ] 右侧 CTA: Request a Quote (圆角胶囊、蓝底白字)
- [ ] CTA 跳转: /contact#quote
- [ ] 吸顶效果 + 极轻阴影/底部分隔线
- [ ] 当前页高亮
- [ ] 移动端: 汉堡菜单 Drawer

### 6.2 首页 6 Sections 顺序
- [ ] 1. Hero
- [ ] 2. Why
- [ ] 3. Featured Categories
- [ ] 4. OEM Ready
- [ ] 5. Quality+Scenarios
- [ ] 6. Quick RFQ

### 6.3 Hero Section
- [ ] Badge: B2B OEM Manufacturing
- [ ] 双按钮: Request a Quote + View Products
- [ ] 3 个 chips (stats)
- [ ] 右侧大面板 + 3 卡布局

### 6.4 Quick RFQ Section
- [ ] 左右分栏布局
- [ ] 左侧标题: Quick RFQ + 副标题
- [ ] 右侧白色 FormCard
- [ ] 表单字段顺序: Contact name → Business email → Product interest → Requirements message
- [ ] 全宽胶囊蓝按钮: "Continue to full RFQ"
- [ ] 底部小字: "We reply within 1 business day."
- [ ] 前端校验
- [ ] /api/lead 预留
- [ ] 成功后跳转 /contact#quote

---

## 7. 成功标准

1. **设计对齐**: Design Tokens 与用户规格完全一致
2. **结构对齐**: 导航和 Sections 顺序保持不变
3. **功能完整**: 所有交互功能正常工作
4. **响应式**: 手机/平板/桌面都能正确显示
5. **可访问性**: 键盘可达、对比度足够
6. **无错误**: 无控制台错误
