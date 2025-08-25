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


<style>
.taxonomy-intro {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #495057;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.intro-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-color: #90caf9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-item i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: block;
  color: #5c6bc0;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #495057;
}

.stat-label {
  font-size: 0.85rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.intro-description {
  text-align: center;
  padding: 0 1rem;
}

.intro-description p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #6c757d;
}

@media (max-width: 768px) {
  .taxonomy-intro {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .intro-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stat-item {
    padding: 0.75rem;
  }

  .stat-number {
    font-size: 1.25rem;
  }

  .intro-description p {
    font-size: 0.9rem;
  }
}
</style>
