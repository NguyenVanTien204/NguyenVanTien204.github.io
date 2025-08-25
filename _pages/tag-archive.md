---
title: "Tags"
layout: tags
permalink: /tags/
author_profile: true
sidebar:
  nav: "main"
classes: wide
---

Khám phá tất cả các tags được sử dụng trong blog. Tags giúp bạn tìm kiếm nội dung một cách chi tiết và cụ thể hơn theo từ khóa.

<div class="taxonomy-intro tags-intro">
  <div class="intro-stats">
    <div class="stat-item">
      <i class="fas fa-hashtag"></i>
      <span class="stat-number">{{ site.tags | size }}</span>
      <span class="stat-label">Tags</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-file-alt"></i>
      <span class="stat-number">{{ site.posts | size }}</span>
      <span class="stat-label">Bài viết</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-chart-line"></i>
      {% assign max_tag_count = 0 %}
      {% for tag in site.tags %}
        {% if tag[1].size > max_tag_count %}
          {% assign max_tag_count = tag[1].size %}
        {% endif %}
      {% endfor %}
      <span class="stat-number">{{ max_tag_count }}</span>
      <span class="stat-label">Tag phổ biến nhất</span>
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

.tags-intro {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1f5fe 100%);
  border: 2px solid #ce93d8;
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
  background: linear-gradient(135deg, #fff3e0 0%, #e8f5e8 100%);
  border-color: #ffb74d;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-item i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: block;
  color: #7e57c2;
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
