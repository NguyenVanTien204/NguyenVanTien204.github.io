---
title: "Tags"
layout: single
permalink: /tags/
author_profile: true
sidebar:
  nav: "main"
classes: wide
---

<div class="blog-tags">
  <!-- Header Section -->
  <div class="blog-header">
    <h1 class="blog-title">Tags</h1>
    <p class="blog-subtitle">Tìm kiếm bài viết theo từ khóa và chủ đề chi tiết</p>

    <!-- Search -->
    <div class="blog-search">
      <input type="text" id="tagSearch" placeholder="Tìm kiếm tags..." class="blog-search__input">
      <i class="fas fa-search blog-search__icon"></i>
    </div>
  </div>

  <!-- Tags Cloud -->
  <div class="blog-content">
    <div class="tags-section">
        <h2 class="tags-section__title">Tất cả Tags</h2>
        <div class="tags-cloud" id="tagsCloud">
          {% assign tags_max = 0 %}
          {% for tag in site.tags %}
            {% if tag[1].size > tags_max %}
              {% assign tags_max = tag[1].size %}
            {% endif %}
          {% endfor %}

          {% for tag in site.tags %}
            {% assign posts_count = tag[1].size %}
            {% assign tag_name = tag[0] %}
            {% assign tag_size = posts_count | times: 100 | divided_by: tags_max %}
            <span class="tag-item"
                  data-tag="{{ tag_name | downcase }}"
                  data-count="{{ posts_count }}"
                  onclick="showTagPosts('{{ tag_name }}')"
                  style="font-size: {{ tag_size | plus: 80 }}%;">
              #{{ tag_name }}
              <span class="tag-count">({{ posts_count }})</span>
            </span>
          {% endfor %}
        </div>
      </div>

      <!-- Popular Tags -->
      <div class="popular-tags">
        <h3 class="popular-tags__title">Tags phổ biến</h3>
        <div class="popular-tags__list">
          {% assign sorted_tags = site.tags | sort %}
          {% for tag in sorted_tags limit: 8 %}
            {% assign posts_count = tag[1].size %}
            {% assign tag_name = tag[0] %}
            <div class="popular-tag" data-tag="{{ tag_name | downcase }}">
              <div class="popular-tag__header" onclick="showTagPosts('{{ tag_name }}')">
                <span class="popular-tag__name">#{{ tag_name }}</span>
                <span class="popular-tag__count">{{ posts_count }} bài viết</span>
              </div>
              <div class="popular-tag__posts" id="posts-{{ tag_name | slugify }}" style="display: none;">
                {% for post in tag[1] limit: 3 %}
                  <div class="tag-post">
                    <h5 class="tag-post__title">
                      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </h5>
                    <div class="tag-post__meta">
                      <time>{{ post.date | date: "%d/%m/%Y" }}</time>
                    </div>
                  </div>
                {% endfor %}
                {% if posts_count > 3 %}
                  <div class="tag-post__more">
                    <a href="#" onclick="showAllTagPosts('{{ tag_name }}')">
                      Xem thêm {{ posts_count | minus: 3 }} bài viết...
                    </a>
                  </div>
                {% endif %}
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>

  <!-- Tag Posts Display -->
  <div class="tag-posts-display" id="tagPostsDisplay" style="display: none;">
    <div class="tag-posts-header">
        <button class="btn btn--back" onclick="hideTagPosts()">
          <i class="fas fa-arrow-left"></i> Quay lại
        </button>
        <h2 class="tag-posts-title" id="tagPostsTitle"></h2>
      </div>
      <div class="tag-posts-grid" id="tagPostsGrid"></div>
    </div>
  </div>

<style>
.blog-tags {
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
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.tags-section {
  margin-bottom: 3rem;
}

.tags-section__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Crimson Text', serif;
}

.tags-cloud {
  text-align: center;
  line-height: 2;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.tag-item {
  display: inline-block;
  margin: 0.25rem 0.5rem;
  padding: 0.5rem 1rem;
  background: #e9ecef;
  color: #495057;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid transparent;
}

.tag-item:hover {
  background: #3b82f6;
  color: white;
  transform: scale(1.05);
}

.tag-count {
  font-size: 0.8em;
  opacity: 0.7;
  margin-left: 0.25rem;
}

.popular-tags {
  border-top: 1px solid #e9ecef;
  padding-top: 2rem;
}

.popular-tags__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-family: 'Crimson Text', serif;
}

.popular-tags__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.popular-tag {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e9ecef;
}

.popular-tag__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.popular-tag__header:hover {
  background: #e9ecef;
}

.popular-tag__name {
  font-weight: 500;
  color: #3b82f6;
  font-size: 1.1rem;
}

.popular-tag__count {
  font-size: 0.875rem;
  color: #6c757d;
  background: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.popular-tag__posts {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.tag-post {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.tag-post:last-child {
  border-bottom: none;
}

.tag-post__title {
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.tag-post__title a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.tag-post__title a:hover {
  color: #3b82f6;
}

.tag-post__meta {
  font-size: 0.8rem;
  color: #6c757d;
}

.tag-post__more {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.tag-post__more a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}

.tag-post__more a:hover {
  text-decoration: underline;
}

.btn--back {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn--back:hover {
  background: #e9ecef;
  transform: translateX(-2px);
}

.tag-posts-display {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.tag-posts-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.tag-posts-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.tag-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tag-post-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.tag-post-card:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.tag-post-card__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.tag-post-card__title a {
  color: #2c3e50;
  text-decoration: none;
}

.tag-post-card__title a:hover {
  color: #3b82f6;
}

.tag-post-card__meta {
  color: #6c757d;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.tag-post-card__excerpt {
  color: #495057;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .blog-tags {
    padding: 0.5rem 0;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-header {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .blog-content {
    padding: 1rem;
  }

  .popular-tags__list {
    grid-template-columns: 1fr;
  }

  .tag-posts-display {
    padding: 1rem;
  }

  .tags-cloud {
    padding: 1rem;
  }

  .tag-item {
    margin: 0.25rem;
    padding: 0.375rem 0.75rem;
  }
}
</style>

<script>
// Search functionality
document.getElementById('tagSearch').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const tagItems = document.querySelectorAll('.tag-item');
  const popularTags = document.querySelectorAll('.popular-tag');

  // Filter tags cloud
  tagItems.forEach(item => {
    const tagName = item.dataset.tag;
    if (tagName.includes(searchTerm)) {
      item.style.display = 'inline-block';
    } else {
      item.style.display = 'none';
    }
  });

  // Filter popular tags
  popularTags.forEach(tag => {
    const tagName = tag.dataset.tag;
    if (tagName.includes(searchTerm)) {
      tag.style.display = 'block';
    } else {
      tag.style.display = 'none';
    }
  });
});

// Show tag posts in popular tags section
function showTagPosts(tagName) {
  const postsDiv = document.getElementById('posts-' + tagName.replace(/\s+/g, '-').toLowerCase());
  if (postsDiv) {
    if (postsDiv.style.display === 'none' || postsDiv.style.display === '') {
      postsDiv.style.display = 'block';
    } else {
      postsDiv.style.display = 'none';
    }
  } else {
    // Show full tag posts display
    showAllTagPosts(tagName);
  }
}

// Show all posts for a tag
function showAllTagPosts(tagName) {
  document.querySelector('.blog-content').style.display = 'none';
  document.getElementById('tagPostsDisplay').style.display = 'block';
  document.getElementById('tagPostsTitle').textContent = `Bài viết với tag: #${tagName}`;

  // Load posts for this tag - this would need to be populated with actual posts
  const postsGrid = document.getElementById('tagPostsGrid');
  postsGrid.innerHTML = '<p>Đang tải bài viết...</p>';

  // Here you would typically load posts via AJAX or have them pre-rendered
}

// Hide tag posts display
function hideTagPosts() {
  document.getElementById('tagPostsDisplay').style.display = 'none';
  document.querySelector('.blog-content').style.display = 'block';
}

// Add smooth transitions when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add staggered animation to tag cloud
  const tagItems = document.querySelectorAll('.tag-item');
  tagItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 50}ms`;
  });
});
</script>
