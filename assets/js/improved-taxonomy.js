/**
 * Improved Taxonomy JavaScript
 * Handles search, filtering, pagination, and view modes
 * for both categories and tags pages
 */

class TaxonomyManager {
  constructor(type = 'categories') {
    this.type = type;
    this.currentPage = 1;
    this.itemsPerPage = type === 'tags' ? 15 : 12;
    this.filteredItems = [];
    this.allItems = [];
    this.allCloudItems = [];

    this.init();
  }

  init() {
    this.bindElements();
    this.bindEvents();
    this.initializeItems();
    this.filterAndSort();
  }

  bindElements() {
    this.searchInput = document.getElementById(`${this.type === 'categories' ? 'category' : 'tag'}Search`);
    this.sortSelect = document.getElementById(`sort${this.type === 'categories' ? 'Categories' : 'Tags'}`);
    this.viewButtons = document.querySelectorAll('.view-btn');
    this.grid = document.getElementById(`${this.type === 'categories' ? 'categories' : 'tags'}Grid`);
    this.cloudContainer = document.getElementById('tagsCloudContainer');
    this.pagination = document.getElementById(`${this.type === 'categories' ? 'category' : 'tag'}Pagination`);
    this.modal = document.getElementById(`${this.type === 'categories' ? 'category' : 'tag'}Modal`);
  }

  bindEvents() {
    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        this.filterAndSort();
        if (this.type === 'tags' && this.cloudContainer) {
          this.filterCloudTags(searchTerm);
        }
      });
    }

    // Sort functionality
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => {
        this.filterAndSort();
      });
    }

    // View toggle functionality
    this.viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleViewChange(e.target);
      });
    });

    // Pagination
    this.bindPaginationEvents();

    // Modal events
    this.bindModalEvents();

    // Keyboard shortcuts
    this.bindKeyboardEvents();
  }

  initializeItems() {
    const cardSelector = this.type === 'categories' ? '.taxonomy-card:not(.tag-card)' : '.tag-card';
    this.allItems = Array.from(document.querySelectorAll(cardSelector));

    if (this.type === 'tags') {
      this.allCloudItems = Array.from(document.querySelectorAll('.tag-cloud-item'));
    }
  }

  handleViewChange(button) {
    this.viewButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const view = button.dataset.view;

    if (this.type === 'tags' && view === 'cloud') {
      this.showCloudView();
    } else {
      this.showGridView(view);
    }
  }

  showCloudView() {
    if (this.cloudContainer) {
      this.cloudContainer.style.display = 'block';
      this.grid.style.display = 'none';
      this.pagination.style.display = 'none';
    }
  }

  showGridView(view) {
    if (this.cloudContainer) {
      this.cloudContainer.style.display = 'none';
    }
    this.grid.style.display = 'grid';
    this.grid.className = view === 'list' ? 'taxonomy-grid list-view' : 'taxonomy-grid';
    this.filterAndSort();
  }

  filterCloudTags(searchTerm) {
    this.allCloudItems.forEach(item => {
      const tagName = item.dataset.name;
      if (tagName.includes(searchTerm)) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterAndSort() {
    if (!this.searchInput || !this.sortSelect) return;

    const searchTerm = this.searchInput.value.toLowerCase();
    const sortValue = this.sortSelect.value;

    // Filter items
    this.filteredItems = this.allItems.filter(item => {
      const name = item.dataset.name;
      const title = item.querySelector(`.${this.type === 'categories' ? 'category' : 'tag'}-title`).textContent.toLowerCase();
      const description = item.querySelector(`.${this.type === 'categories' ? 'category' : 'tag'}-description`);
      const descText = description ? description.textContent.toLowerCase() : '';

      return name.includes(searchTerm) ||
             title.includes(searchTerm) ||
             descText.includes(searchTerm);
    });

    // Sort items
    this.filteredItems.sort((a, b) => {
      const aCount = parseInt(a.dataset.count);
      const bCount = parseInt(b.dataset.count);
      const aName = a.dataset.name;
      const bName = b.dataset.name;

      switch(sortValue) {
        case 'posts-desc':
          return bCount - aCount;
        case 'posts-asc':
          return aCount - bCount;
        case 'name-asc':
          return aName.localeCompare(bName);
        case 'name-desc':
          return bName.localeCompare(aName);
        default:
          return 0;
      }
    });

    this.currentPage = 1;
    this.displayItems();
    this.updatePagination();
  }

  displayItems() {
    // Hide all items
    this.allItems.forEach(item => item.style.display = 'none');

    if (this.filteredItems.length === 0) {
      this.showNoResults();
      return;
    }

    // Show items for current page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToShow = this.filteredItems.slice(startIndex, endIndex);

    itemsToShow.forEach((item, index) => {
      item.style.display = 'block';
      // Add staggered animation
      item.style.animationDelay = `${index * 50}ms`;
    });

    this.hideNoResults();
  }

  updatePagination() {
    if (!this.pagination) return;

    const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);

    if (totalPages <= 1) {
      this.pagination.style.display = 'none';
      return;
    }

    this.pagination.style.display = 'flex';
    const currentPageSpan = document.getElementById(`currentPage${this.type === 'categories' ? '' : 'Tags'}`);
    const totalPagesSpan = document.getElementById(`totalPages${this.type === 'categories' ? '' : 'Tags'}`);

    if (currentPageSpan) currentPageSpan.textContent = this.currentPage;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;

    const prevBtn = document.getElementById(`prevPage${this.type === 'categories' ? '' : 'Tags'}`);
    const nextBtn = document.getElementById(`nextPage${this.type === 'categories' ? '' : 'Tags'}`);

    if (prevBtn) prevBtn.disabled = this.currentPage === 1;
    if (nextBtn) nextBtn.disabled = this.currentPage === totalPages;
  }

  bindPaginationEvents() {
    const prevBtn = document.getElementById(`prevPage${this.type === 'categories' ? '' : 'Tags'}`);
    const nextBtn = document.getElementById(`nextPage${this.type === 'categories' ? '' : 'Tags'}`);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.displayItems();
          this.updatePagination();
          this.scrollToGrid();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.displayItems();
          this.updatePagination();
          this.scrollToGrid();
        }
      });
    }
  }

  bindModalEvents() {
    if (!this.modal) return;

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideModal();
      }
    });
  }

  bindKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      // Focus search with Ctrl+F or /
      if ((e.ctrlKey && e.key === 'f') || e.key === '/') {
        e.preventDefault();
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }

      // Clear search with Escape (when search is focused)
      if (e.key === 'Escape' && document.activeElement === this.searchInput) {
        this.searchInput.value = '';
        this.filterAndSort();
        this.searchInput.blur();
      }
    });
  }

  scrollToGrid() {
    if (this.grid) {
      this.grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  showNoResults() {
    const existing = document.querySelector('.no-results');
    if (existing) return;

    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <i class="fas fa-search"></i>
      <h3>Không tìm thấy ${this.type === 'categories' ? 'danh mục' : 'tag'} nào</h3>
      <p>Hãy thử với từ khóa khác</p>
    `;
    this.grid.appendChild(noResults);
  }

  hideNoResults() {
    const existing = document.querySelector('.no-results');
    if (existing) {
      existing.remove();
    }
  }

  showModal(title, content) {
    if (!this.modal) return;

    const modalTitle = this.modal.querySelector('h2');
    const modalBody = this.modal.querySelector('.modal-body');

    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;

    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Add fade-in animation
    this.modal.style.opacity = '0';
    requestAnimationFrame(() => {
      this.modal.style.transition = 'opacity 0.3s ease';
      this.modal.style.opacity = '1';
    });
  }

  hideModal() {
    if (!this.modal) return;

    this.modal.style.opacity = '0';
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  // Public methods for external use
  showTaxonomyPosts(taxonomyName) {
    const title = `Bài viết ${this.type === 'categories' ? 'trong danh mục' : 'với tag'}: ${this.type === 'categories' ? '' : '#'}${taxonomyName}`;

    this.showModal(title, '<div class="loading">Đang tải...</div>');

    // Simulate loading posts (in real implementation, this would fetch data)
    setTimeout(() => {
      const taxonomySection = document.querySelector(`#${taxonomyName.replace(/\s+/g, '-').toLowerCase()}`);
      if (taxonomySection) {
        this.showModal(title, taxonomySection.outerHTML);
      } else {
        this.showModal(title, '<p>Không tìm thấy bài viết nào.</p>');
      }
    }, 500);
  }
}

// Global functions for backward compatibility
function showCategoryPosts(categoryName) {
  if (window.categoryManager) {
    window.categoryManager.showTaxonomyPosts(categoryName);
  }
}

function hideCategoryPosts() {
  if (window.categoryManager) {
    window.categoryManager.hideModal();
  }
}

function showTagPosts(tagName) {
  if (window.tagManager) {
    window.tagManager.showTaxonomyPosts(tagName);
  }
}

function hideTagPosts() {
  if (window.tagManager) {
    window.tagManager.hideModal();
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Detect which page we're on
  const path = window.location.pathname;

  if (path.includes('/categories')) {
    window.categoryManager = new TaxonomyManager('categories');
  } else if (path.includes('/tags')) {
    window.tagManager = new TaxonomyManager('tags');
  }

  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading state to buttons
  document.querySelectorAll('.view-all-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';

      setTimeout(() => {
        this.innerHTML = 'Xem tất cả <i class="fas fa-arrow-right"></i>';
      }, 1000);
    });
  });

  // Enhanced search with debounce
  const searchInputs = document.querySelectorAll('.taxonomy-search');
  searchInputs.forEach(input => {
    let timeout;
    input.addEventListener('input', function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Search logic is handled by TaxonomyManager
      }, 300);
    });
  });

  // Add keyboard navigation for cards
  const cards = document.querySelectorAll('.taxonomy-card');
  cards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const btn = this.querySelector('.view-all-btn');
        if (btn) btn.click();
      }

      // Arrow key navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextCard = cards[index + 1];
        if (nextCard) nextCard.focus();
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevCard = cards[index - 1];
        if (prevCard) prevCard.focus();
      }
    });
  });
});

// Performance optimization: Intersection Observer for lazy loading
const observeCards = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll('.taxonomy-card').forEach(card => {
    observer.observe(card);
  });
};

// Call after DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeCards);
} else {
  observeCards();
}
