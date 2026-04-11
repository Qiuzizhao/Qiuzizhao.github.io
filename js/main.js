/**
 * 个人主页 - 主要 JavaScript
 * 处理滚动动画和交互
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化 Lucide 图标
  lucide.createIcons();

  // 滚动渐显动画
  initScrollReveal();

  // 平滑滚动
  initSmoothScroll();

  // 装饰元素视差效果
  initParallax();

  // 项目卡片悬停效果
  initProjectCards();
});

/**
 * 使用 Intersection Observer 实现滚动渐显动画
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 根据兄弟元素添加错落延迟
        const delay = calculateStaggerDelay(entry.target);
        entry.target.style.transitionDelay = `${delay}ms`;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el) => {
    observer.observe(el);
  });
}

/**
 * 计算兄弟元素的错落延迟
 */
function calculateStaggerDelay(element) {
  const parent = element.parentElement;
  const siblings = Array.from(parent.querySelectorAll('.reveal'));
  const index = siblings.indexOf(element);

  // 网格项目延迟
  if (parent.classList.contains('projects-grid')) {
    return index * 100;
  }

  // 列表项目延迟
  if (parent.classList.contains('about-facts') || parent.classList.contains('project-tags')) {
    return index * 50;
  }

  return 0;
}

/**
 * 平滑滚动到锚点
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 装饰元素视差效果
 */
function initParallax() {
  const decoCircle1 = document.querySelector('.deco-1');
  const decoCircle2 = document.querySelector('.deco-2');

  if (!decoCircle1 || !decoCircle2) return;

  // 检查用户是否减少了动效偏好
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;

        decoCircle1.style.transform = `translateY(${scrolled * 0.1}px)`;
        decoCircle2.style.transform = `translateY(${scrolled * -0.05}px)`;

        ticking = false;
      });

      ticking = true;
    }
  });

  // 添加鼠标移动微妙效果
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    decoCircle1.style.transform = `translate(${x}px, ${y}px)`;
    decoCircle2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
  });
}

/**
 * 项目卡片悬停增强
 */
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const year = card.querySelector('.project-year');
      if (year) {
        year.style.color = 'var(--accent-primary)';
      }
    });

    card.addEventListener('mouseleave', () => {
      const year = card.querySelector('.project-year');
      if (year) {
        year.style.color = '';
      }
    });
  });
}
