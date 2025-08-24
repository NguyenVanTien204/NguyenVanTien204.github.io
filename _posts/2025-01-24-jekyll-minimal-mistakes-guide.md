---
title: "Jekyll với Minimal Mistakes - Hướng dẫn tùy chỉnh giao diện"
date: 2025-01-24 12:00:00 +0700
categories:
  - web-development
  - tutorial
tags:
  - Jekyll
  - Minimal Mistakes
  - Blog
  - GitHub Pages
author_profile: true
excerpt: "Hướng dẫn chi tiết cách tùy chỉnh giao diện Jekyll với theme Minimal Mistakes để tạo blog cá nhân đẹp mắt."
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/jekyll-header.jpg
  caption: "Jekyll + Minimal Mistakes"
  teaser: /assets/images/jekyll-teaser.jpg
toc: true
toc_label: "Mục lục"
toc_icon: "cog"
---

Jekyll là một static site generator rất phổ biến, đặc biệt khi kết hợp với theme **Minimal Mistakes**. Trong bài viết này, tôi sẽ chia sẻ cách tùy chỉnh giao diện để tạo ra một blog đẹp mắt và chuyên nghiệp.

## Tại sao chọn Jekyll + Minimal Mistakes?

### Ưu điểm của Jekyll

- ⚡ **Tốc độ**: Static site load cực nhanh
- 🔒 **Bảo mật**: Không có database nên ít lỗ hổng bảo mật
- 💰 **Miễn phí**: Host trên GitHub Pages hoàn toàn free
- 📱 **Responsive**: Giao diện tự động thích ứng mọi thiết bị

### Minimal Mistakes Theme

Minimal Mistakes là một trong những theme Jekyll phổ biến nhất với:

- 🎨 **Giao diện đẹp**: Clean, modern và professional
- 📊 **Tính năng đầy đủ**: Comments, analytics, social sharing
- 🛠️ **Dễ tùy chỉnh**: Nhiều options và layouts
- 📚 **Tài liệu chi tiết**: Documentation rất đầy đủ

## Cấu trúc thư mục cơ bản

```
blog/
├── _config.yml          # Cấu hình chính
├── _data/               # Dữ liệu site
│   ├── navigation.yml   # Menu navigation
│   └── ui-text.yml     # Văn bản interface
├── _includes/           # Partial templates
├── _layouts/            # Layout templates
├── _pages/              # Trang tĩnh
├── _posts/              # Bài viết blog
├── _sass/               # SCSS files
├── assets/              # Images, CSS, JS
└── index.html           # Trang chủ
```

## Tùy chỉnh cấu hình cơ bản

### 1. Cập nhật `_config.yml`

```yaml
# Site Settings
title: "Blog của Naïvellé"
subtitle: "Viết, học và khám phá"
description: "Một blog cá nhân chia sẻ góc nhìn, trải nghiệm và kiến thức."
url: "https://yourusername.github.io"
baseurl: ""

# Theme
remote_theme: "mmistakes/minimal-mistakes"
minimal_mistakes_skin: "default" # "air", "aqua", "contrast", "dark", etc.

# Site Author
author:
  name: "Tên của bạn"
  avatar: "/assets/images/avatar.jpg"
  bio: "Mô tả ngắn về bản thân"
  location: "Vị trí của bạn"
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/username"
```

### 2. Tạo navigation menu

Tạo file `_data/navigation.yml`:

```yaml
main:
  - title: "Trang chủ"
    url: /
  - title: "Về tôi"
    url: /about/
  - title: "Danh mục"
    url: /categories/
  - title: "Tags"
    url: /tags/
  - title: "Tìm kiếm"
    url: /search/
```

## Tùy chỉnh giao diện

### 1. Thêm custom CSS

Tạo file `assets/css/main.scss`:

```scss
---
# Only the main Sass file needs front matter
---

@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin | default: 'default' }}";
@import "minimal-mistakes";

// Custom styles
.masthead {
  border-bottom: 1px solid $border-color;
}

.page__title {
  color: $primary-color;
  font-weight: 600;
}

// Custom colors cho code blocks
.highlight {
  background: #f8f8f8;
  border-radius: 4px;
  padding: 1em;
}
```

### 2. Tùy chỉnh footer

Tạo file `_includes/footer/custom.html`:

```html
<div class="page__footer-copyright">
  <p>&copy; {{ site.time | date: '%Y' }} {{ site.name | default: site.title }}.
  Được xây dựng với ❤️ bằng Jekyll & Minimal Mistakes.</p>
</div>
```

## Tạo trang tĩnh

### Trang About

```markdown
---
permalink: /about/
title: "Về tôi"
excerpt: "Tìm hiểu thêm về tác giả blog"
---

## Giới thiệu

Nội dung giới thiệu về bản thân...
```

### Trang Categories

```markdown
---
title: "Danh mục bài viết"
layout: categories
permalink: /categories/
author_profile: true
---
```

## Tips tối ưu hóa

### 1. SEO

```yaml
# Trong _config.yml
plugins:
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-feed

# Trong front matter của bài viết
seo:
  type: BlogPosting
```

### 2. Performance

- Tối ưu hóa hình ảnh trước khi upload
- Sử dụng lazy loading cho images
- Minify CSS/JS trong production

### 3. User Experience

- Thêm search functionality
- Cấu hình comments (Disqus, Utterances)
- Thêm related posts
- Cấu hình social sharing

## Deployment lên GitHub Pages

1. Push code lên GitHub repository
2. Vào Settings > Pages
3. Chọn source branch (thường là `main`)
4. GitHub sẽ tự động build và deploy

```bash
# Commands cơ bản
git add .
git commit -m "Update blog content"
git push origin main
```

## Kết luận

Jekyll với Minimal Mistakes là combo hoàn hảo để tạo blog cá nhân. Với những tùy chỉnh cơ bản trên, bạn đã có thể tạo ra một blog đẹp mắt và chuyên nghiệp.

Trong bài viết tiếp theo, tôi sẽ chia sẻ về cách tối ưu hóa SEO và thêm các tính năng nâng cao.

**Bạn có kinh nghiệm gì với Jekyll không? Hãy chia sẻ trong comment nhé!** 💬
