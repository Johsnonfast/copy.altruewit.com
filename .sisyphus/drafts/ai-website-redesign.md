# Draft: AItruewit (真智达) 企业官网前端升级计划

## 项目概述
对现有静态 HTML 网站进行现代化 UI/UX 升级，保持导航和首页 6 个 Section 顺序不变的前提下，实现设计系统规范化、组件化、响应式和可访问性增强。

## 现有代码库分析

### 目录结构
```
├── index.html (首页 - 6 sections)
├── assets/
│   ├── css/styles.css (现有样式)
│   └── js/
│       ├── site.js (滚动动画)
│       ├── quick-rfq.js (表单跳转)
│       ├── consent.js (cookie)
│       └── config.js
├── about/ (about 页面)
├── blog/ (blog 页面)
├── contact/ (contact 页面)
│   └── index.html (包含完整 RFQ 表单)
├── products/ (产品列表)
│   ├── mini-air-pump/
│   ├── portable-fan/
│   └── digital-camera/
├── oem-customization/
├── quality-compliance/
├── privacy/
└── terms/
└── cookies/
```

### 现有设计系统 (CSS Variables)
```css
:root {
  --bg: #f7f8fb;
  --surface: #ffffff;
  --ink: #121826;
  --muted: #5b6b82;
  --primary: #1763ff;
  --primary-dark: #0c4ccc;
  --shadow-lg: 0 24px 60px rgba(15, 23, 42, 0.1);
  --radius-lg: 24px;
  --radius-md: 16px;
}
```

### 需要保留的功能
- 导航顺序：Home → Products → OEM & Customization → Quality & Compliance → About → Blog → Contact
- 首页 6 个 Section 顺序
- 路由对应关系
- 现有页面内容结构

## 设计系统升级

### 新 Design Tokens (贴近截图)
```css
:root {
  /* 基础颜色 */
  --bg: #FFFFFF;
  --bg-muted: #F6F8FB;
  --primary: #2563EB;
  --primary-700: #1D4ED8;
  --text: #0B1220;
  --text-muted: #5B667A;
  --border: #E6EAF2;

  /* 圆角 */
  --radius-card: 20px;
  --radius-input: 14px;
  --radius-pill: 9999px;

  /* 阴影 (柔和) */
  --shadow-card: 0 30px 80px rgba(15, 23, 42, 0.10);
  --shadow-card-sm: 0 6px 20px rgba(15, 23, 42, 0.06);
}
```

### 背景渐变 (新增)
```css
.hero-gradient {
  background:
    radial-gradient(ellipse at 20% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
}
```

## 需要新建的组件

### 核心组件 (components/)
- `HeaderNav.js` - 吸顶导航 + 移动端 Drawer
- `Hero.js` - Hero 区域组件
- `SectionContainer.js` - Section 容器
- `Card.js` - 通用卡片
- `BadgePill.js` - 胶囊标签
- `StatChip.js` - 统计芯片
- `CTAButton.js` - 按钮组件
- `FormCard.js` - 表单卡片
- `FormInput.js` - 输入组件
- `FormSelect.js` - 下拉组件
- `FormTextarea.js` - 文本域
- `Footer.js` - 页脚
- `QuickRFQ.js` - Quick RFQ 表单组件
- `MobileDrawer.js` - 移动端抽屉

### 页面模板 (pages/)
- `products/index.html`
- `oem-customization/index.html`
- `quality-compliance/index.html`
- `about/index.html`
- `blog/index.html`
- `contact/index.html` (增强版)

## 关键功能升级

### 1. Header 导航
- 吸顶 + 极轻阴影
- 当前页高亮
- 移动端汉堡菜单 (Drawer)
- CTA 按钮跳转到 /contact#quote

### 2. Quick RFQ Section (Section 6)
- 左右分栏布局
- 白色 FormCard (大圆角 + 软阴影)
- 表单字段：
  - Contact name (Input)
  - Business email (Input)
  - Product interest (Select)
  - Requirements message (Textarea)
- 全宽胶囊蓝按钮: "Continue to full RFQ"
- 前端校验
- /api/lead 预留接口
- 成功后跳转到 /contact#quote
- 底部小字提示

### 3. 动效
- 全站 section 进入视口 reveal (opacity + translateY)
- 克制动画，不夸张

### 4. 响应式断点
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 技术栈建议

由于是静态 HTML 项目，建议采用：
1. **Vanilla JavaScript + CSS Custom Properties** (保持轻量)
2. **模块化 JS** (components/ 目录)
3. **渐进增强** (不影响 SEO)

## 待确认事项

1. 是否需要支持 IE11？
2. 表单数据提交到哪个 API endpoint？
3. 是否需要 GA/Analytics 集成？
4. 图片资源如何处理？
5. 是否需要多语言支持？

## 实施优先级

### P0 (必须完成)
- Design tokens CSS 升级
- Header 组件 (含移动端)
- Quick RFQ 表单增强
- 响应式适配
- 可访问性 (a11y)

### P1 (重要)
- 所有页面基础版式
- Footer 组件
- 动效增强

### P2 (增强)
- 更多组件封装
- 主题定制
- 性能优化
