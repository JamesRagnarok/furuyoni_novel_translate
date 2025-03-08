# 双语轻小说阅读

这是一个用于展示双语轻小说的静态网页项目。支持繁体中文翻译与日文原文对照阅读。

## 功能特点

- 清晰的双语对照展示
- 响应式设计，支持各种设备
- 简单的章节导航
- 无需后端，可直接部署到 GitHub Pages

## 使用方法

1. 将小说内容按照以下格式添加到 `index.html` 文件中的 `paragraph-container` 区域：

```html
<div class="paragraph">
    <div class="chinese">
        <!-- 繁体中文翻译 -->
        「中文内容」
    </div>
    <div class="japanese">
        <!-- 日文原文 -->
        「日文内容」
    </div>
</div>
```

2. 在 `chapter-select` 下拉菜单中添加新的章节选项。

## 部署说明

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为源
4. 访问生成的 GitHub Pages URL 即可阅读

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Noto Sans TC/JP)