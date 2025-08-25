---
title: "Danh mục bài viết"
layout: categories
permalink: /categories/
author_profile: true
sidebar:
  nav: "main"
classes: wide
---

Khám phá tất cả các danh mục bài viết trên blog của tôi. Sử dụng các công cụ tìm kiếm và lọc để dễ dàng tìm thấy nội dung mà bạn quan tâm.

<div class="taxonomy-intro">
  <div class="intro-stats">
    <div class="stat-item">
      <i class="fas fa-folder-open"></i>
      <span class="stat-number">{{ site.categories | size }}</span>
      <span class="stat-label">Danh mục</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-file-alt"></i>
      <span class="stat-number">{{ site.posts | size }}</span>
      <span class="stat-label">Bài viết</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-clock"></i>
      <span class="stat-number">{{ site.posts.last.date | date: "%Y" }}</span>
      <span class="stat-label">Năm bắt đầu</span>
    </div>
  </div>

  <div class="intro-description">
    <p>Các bài viết được tổ chức theo danh mục để bạn có thể dễ dàng tìm kiếm nội dung theo chủ đề quan tâm. Mỗi danh mục bao gồm những bài viết chất lượng với thông tin hữu ích và cập nhật.</p>
  </div>
</div>

<style>
.taxonomy-intro {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.intro-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
  opacity: 0.9;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.intro-description {
  text-align: center;
  padding: 0 1rem;
}

.intro-description p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .taxonomy-intro {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .intro-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-item {
    padding: 0.75rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .intro-description p {
    font-size: 1rem;
  }
}
</style>
