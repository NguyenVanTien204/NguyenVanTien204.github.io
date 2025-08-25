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

  <div class="intro-description">
    <p>Tags được tổ chức theo độ phổ biến và chủ đề. Sử dụng chế độ Tag Cloud để thấy trực quan các chủ đề được quan tâm nhất, hoặc chuyển sang chế độ Grid/List để xem chi tiết hơn.</p>
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

.tags-intro {
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #10b981 100%);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
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
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
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
