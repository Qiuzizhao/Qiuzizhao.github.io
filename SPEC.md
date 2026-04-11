# 个人主页 - 设计规范

## 1. 概念与愿景

一个温暖、有故事的个人主页，像一本精心编排的个人杂志。不是冰冷的作品集，而是一个有温度的空间，邀请朋友走进你的世界。每一个项目都是一个故事章节，每一个细节都在说：「这是我」。

## 2. 设计语言

### 美学方向
**杂志编辑风格 + 温暖现代主义** — 编辑杂志的精致排版结合个人日志的温暖手质感。想象一本独立杂志，关于一个有趣的人和他做的有趣的事。

### 色彩方案
```css
--bg-primary: #FDF8F3;        /* 温暖奶油白 */
--bg-secondary: #F5EDE4;      /* 浅亚麻色 */
--text-primary: #2D2A26;      /* 深咖啡色 */
--text-secondary: #6B635A;    /* 温暖灰 */
--accent-primary: #C67D5E;    /* 赤陶橙 */
--accent-secondary: #8B9A7D;  /* 苔藓绿 */
--accent-tertiary: #D4A574;   /* 骆驼金 */
--highlight: #E8C5A8;          /* 蜜桃色 */
```

### 字体
- **标题/英雄区**：Playfair Display（衬线，优雅，有编辑感）
- **副标题**：Cormorant Garamond（精致衬线）
- **正文**：Source Sans 3（清晰易读）
- **代码/标签**：JetBrains Mono（项目技术栈展示）

### 空间系统
- 大量留白，让内容呼吸
- 区块之间的间距不均匀（32px / 64px / 120px），创造视觉韵律
- 最大内容宽度：1200px，区域最大宽度：800px（增加亲密感）

### 动效哲学
- **进场动画**：staggered fade-up，模拟翻页的从容
- **悬停**：微妙的 scale (1.02) + 阴影加深，像在拿起一本书
- **滚动触发**：章节淡入，增加探索感
- **时间**：400-600ms，ease-out，优雅不急促

### 视觉资源
- 背景：subtle paper texture（造纸业的温暖感）
- 装饰：手绘风格的几何线条（圆形、波浪线）
- 图标：Lucide Icons（线条风格统一）
- 项目截图：圆角 + 柔和阴影，像照片一样展示

## 3. 页面结构

### 页面流程
```
[英雄区 Hero]
├── 大标题 + 个人 tagline
├── 一句话介绍
└── 向下滚动提示（动画）

[项目区 Projects]
├── 区块标题（「项目们」）
├── 项目卡片列表（带年份、技术栈、简介、截图）
└── 每个项目可点击查看详情

[关于区 About]
├── 个人照片（可选）
├── 个人故事/介绍
└── 兴趣、爱好或有趣的 facts

[联系方式区 Contact]
├── 联系方式/社交链接
└── 结尾语

[页脚 Footer]
└── 版权 + GitHub 链接
```

### 响应式策略
- Desktop：双栏布局（项目卡片）
- Tablet：单栏，卡片更大
- Mobile：完全单栏，保持阅读舒适度

## 4. 功能与交互

### 英雄区
- 进厂时文字 staggered 动画
- 滚动提示箭头持续动画（bounce）
- 鼠标移动时背景有微妙的 parallax 效果

### 项目卡片
- 项目截图展示（16:10 比例）
- 项目名称、年份、技术栈标签
- 项目简介（可从 GitHub README 截取）
- GitHub 链接 + 在线地址（如有）
- Hover：轻微上浮 + 左边框高亮

### 关于区
- 个人照片区（圆形裁切，边框装饰）
- 个人介绍文字
- 基本信息（地点、职业等）

### 联系方式区
- 社交链接 icons
- Hover 时 icon 变色 + scale

## 5. 组件清单

### 英雄标题
- 字体：Playfair Display, 72px (desktop) / 48px (mobile)
- 颜色：--text-primary
- 动画：fade-up, 延迟 0ms

### 区块标题
- 字体：Cormorant Garamond, 36px
- 下方装饰线（accent-primary）
- 动画：fade-up

### 项目卡片
- 截图：16:10 比例，圆角
- 背景：--bg-secondary
- 圆角：16px
- 内边距：24px
- 内部：年份、标题、描述、技术栈标签、链接
- Hover：translateY(-6px), shadow 加强
- 状态：default / hover

### 技术标签
- 小型胶囊形状
- 字体：JetBrains Mono, 12px
- 背景：--highlight
- 间距：4px gap

### 社交图标
- 56x56 clickable area
- Lucide icon, 24px
- 颜色：--text-secondary
- Hover：--accent-primary, scale(1.05), translateY(-4px)

### 滚动指示器
- 向下箭头
- 持续 bounce 动画
- 位置：hero 底部中央

## 6. 技术方案

### 框架
- **纯 HTML + CSS + JavaScript**（无框架，最大兼容性）
- 便于 GitHub Pages 直接部署

### 文件结构
```
personal-homepage/
├── index.html          # 主页
├── css/
│   └── style.css       # 样式
├── js/
│   └── main.js         # 交互逻辑
├── images/             # 项目截图
└── SPEC.md            # 设计规范
```

### 部署
- 直接上传到 GitHub 仓库
- 开启 GitHub Pages
- 可用自定义域名

### 关键实现
- CSS Custom Properties 管理颜色和字体
- Intersection Observer 实现滚动触发动画
- CSS Grid + Flexbox 布局
- Google Fonts CDN 载入字体
- Lucide Icons CDN 载入图标
