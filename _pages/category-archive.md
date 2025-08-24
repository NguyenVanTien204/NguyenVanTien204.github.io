---
title: "Danh mục bài viết"
layout: single
permalink: /categories/
author_profile: true
sidebar:
  nav: "main"
classes: wide
---

<div class="blog-categories">
  <!-- Header Section -->
  <div class="blog-header">
    <h1 class="blog-title">Danh mục bài viết</h1>
    <p class="blog-subtitle">Khám phá những chủ đề mà tôi thường viết về</p>

    <!-- Simple Search -->
    <div class="blog-search">
      <input type="text" id="categorySearch" placeholder="Tìm kiếm danh mục..." class="blog-search__input">
      <i class="fas fa-search blog-search__icon"></i>
    </div>
  </div>

  <!-- Categories List -->
  <div class="blog-content">
    <div class="categories-list" id="categoriesList">
        {% assign categories_max = 0 %}
        {% for category in site.categories %}
          {% if category[1].size > categories_max %}
            {% assign categories_max = category[1].size %}
          {% endif %}
        {% endfor %}

        {% for category in site.categories %}
          {% assign posts_count = category[1].size %}
          {% assign category_name = category[0] %}
          <div class="category-item" data-category="{{ category_name | downcase }}">
            <div class="category-header" onclick="toggleCategory('{{ category_name }}')">
              <div class="category-info">
                <h3 class="category-name">
                  <i class="category-icon">
                    {% case category_name %}
                      {% when 'web-development' %}
                        <i class="fas fa-code"></i>
                      {% when 'personal' %}
                        <i class="fas fa-user"></i>
                      {% when 'tutorial' %}
                        <i class="fas fa-book"></i>
                      {% else %}
                        <i class="fas fa-folder"></i>
                    {% endcase %}
                  </i>
                  {{ category_name | replace: '-', ' ' | capitalize }}
                </h3>
                <span class="category-count">{{ posts_count }} bài viết</span>
              </div>
              <div class="category-toggle">
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>

            <div class="category-description">
              {% case category_name %}
                {% when 'web-development' %}
                  Những bài viết về lập trình web, framework và công nghệ mới
                {% when 'personal' %}
                  Suy nghĩ cá nhân, trải nghiệm và những bài học từ cuộc sống
                {% when 'tutorial' %}
                  Hướng dẫn chi tiết, từng bước một cách dễ hiểu
                {% else %}
                  Khám phá những chủ đề thú vị trong {{ category_name }}
              {% endcase %}
            </div>

            <div class="category-posts" id="posts-{{ category_name }}" style="display: none;">
              <div class="posts-list">
                {% for post in category[1] limit: 5 %}
                  <article class="post-preview">
                    <h4 class="post-title">
                      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </h4>
                    <div class="post-meta">
                      <time>{{ post.date | date: "%d/%m/%Y" }}</time>
                      {% if post.tags.size > 0 %}
                        <span class="post-tags">
                          {% for tag in post.tags limit: 3 %}
                            <span class="tag">#{{ tag }}</span>
                          {% endfor %}
                        </span>
                      {% endif %}
                    </div>
                    {% if post.excerpt %}
                      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
                    {% endif %}
                  </article>
                {% endfor %}

                {% if category[1].size > 5 %}
                  <div class="view-all">
                    <a href="/categories/#{{ category_name }}" class="view-all-link">
                      Xem tất cả {{ posts_count }} bài viết <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                {% endif %}
              </div>
            </div>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>

<style>
.blog-categories {
  padding: 1rem 0;
  background: transparent;
  min-height: auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
  background: white;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-family: 'Crimson Text', serif;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  font-style: italic;
}

.blog-search {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.blog-search__input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.3s ease;
}

.blog-search__input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.blog-search__icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.blog-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.categories-list {
  padding: 1.5rem !important;
}

.category-item {
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
}

.category-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.category-header:hover {
  background: #e9ecef;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-icon {
  color: #3b82f6;
  width: 20px;
}

.category-count {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.category-toggle {
  color: #6c757d;
  transition: transform 0.3s ease;
}

.category-item.active .category-toggle {
  transform: rotate(180deg);
}

.category-description {
  color: #6c757d;
  font-style: italic;
  margin: 0.75rem 1rem 1rem 1rem;
  line-height: 1.5;
}

.category-posts {
  margin-top: 1rem;
  padding: 0 1rem;
}

.posts-list {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.post-preview {
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.post-preview:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.post-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.post-title a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: #3b82f6;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.post-excerpt {
  color: #495057;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.view-all {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.view-all-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.view-all-link:hover {
  color: #1d4ed8;
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .blog-categories {
    padding: 0.5rem 0;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-header {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .categories-list {
    padding: 1rem;
  }

  .category-header {
    padding: 0.75rem;
  }

  .category-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

<script>
// Search functionality
document.getElementById('categorySearch').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    const categoryName = item.dataset.category;
    const categoryText = item.querySelector('.category-name').textContent.toLowerCase();
    const categoryDesc = item.querySelector('.category-description').textContent.toLowerCase();

    if (categoryName.includes(searchTerm) || categoryText.includes(searchTerm) || categoryDesc.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

// Toggle category posts
function toggleCategory(categoryName) {
  const postsDiv = document.getElementById('posts-' + categoryName);
  const categoryItem = document.querySelector(`[data-category="${categoryName.toLowerCase()}"]`);

  if (postsDiv.style.display === 'none' || postsDiv.style.display === '') {
    postsDiv.style.display = 'block';
    categoryItem.classList.add('active');
  } else {
    postsDiv.style.display = 'none';
    categoryItem.classList.remove('active');
  }
}

// Auto-focus search when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for view-all links
  document.querySelectorAll('.view-all-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // You can add logic here to show all posts for the category
    });
  });
});
</script>
