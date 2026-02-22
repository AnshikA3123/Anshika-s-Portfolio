/**
 * Portfolio - Main Application Script
 * Modular structure with clear separation of concerns
 */

// ============================================
// GLOBAL STATE
// ============================================
let isLoading = true;
let particles = [];
let canvas, ctx;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeWebsite();
});

function initializeWebsite() {
  // Hide loading screen after 2 seconds
  setTimeout(() => {
    hideLoadingScreen();
  }, 2000);

  // UI Effects
  initScrollProgress();
  initThemeToggle();

  // Core components
  initParticles();
  initNavigation();
  initScrollAnimations();
  initTypewriter();
  initSkills();
  initProjects();
  initContactForm();
  initBackToTop();
  initSmoothScrolling();
}

// ============================================
// LOADING SCREEN
// ============================================
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  loadingScreen.classList.add('hidden');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    isLoading = false;
    startInitialAnimations();
  }, 500);
}

function startInitialAnimations() {
  const heroElements = document.querySelectorAll('.fade-in-up');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}


// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Load saved preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });
}

// 👇 THIS WAS MISSING
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
});


// ============================================
// PARTICLES
// ============================================
function initParticles() {
  canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  ctx = canvas.getContext('2d');
  resizeCanvas();
  createParticles();
  animateParticles();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  if (!canvas) return;
  const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }
}

function animateParticles() {
  if (isLoading || !canvas || !ctx) {
    requestAnimationFrame(animateParticles);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(252, 10, 126, ${particle.opacity})`;
    ctx.fill();
  });

  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach((other) => {
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(252, 10, 126, ${0.1 * (1 - distance / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animateParticles);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar) return;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (menuToggle && navMenu) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  window.addEventListener('scroll', throttle(updateActiveSection, 100));
}

function updateActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  const animationElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .zoom-in');
  animationElements.forEach((el) => observer.observe(el));

  // Section observer for in-view
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('section').forEach((section) => {
    sectionObserver.observe(section);
  });
}

// ============================================
// TYPEWRITER
// ============================================
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const texts = typeof CONFIG !== 'undefined' && CONFIG.TYPEWRITER_TEXTS
    ? CONFIG.TYPEWRITER_TEXTS
    : ['ANSHIKA TOMAR', 'SOFTWARE ENGINEER', 'AI ENTHUSIAST', 'WEB DEVELOPER'];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
  }

  setTimeout(typeWriter, 3000);
}

// ============================================
// SKILLS (Populate from CONFIG)
// ============================================
function initSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const skillsData = typeof CONFIG !== 'undefined' && CONFIG.SKILLS ? CONFIG.SKILLS : getDefaultSkills();

  Object.values(skillsData).forEach((category, index) => {
    const categoryEl = document.createElement('div');
    categoryEl.className = `skill-category slide-in-${index % 2 === 0 ? 'left' : 'right'}`;

    let skillItemsHtml = '';
    category.skills.forEach((skill) => {
      skillItemsHtml += `
        <div class="skill-item">
          <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percentage">${skill.percentage}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" data-width="${skill.percentage}%"></div>
          </div>
        </div>
      `;
    });

    categoryEl.innerHTML = `
      <h3 class="skill-category-title skill-category-title-with-icon">
        <span class="skill-category-icon">${category.icon}</span>
        ${category.title}
      </h3>
      ${skillItemsHtml}
    `;

    container.appendChild(categoryEl);
  });

  // Animate skill bars when visible
  initSkillBars();
}

function getDefaultSkills() {
  return {
    frontend: {
      title: 'Frontend',
      icon: '🖥️',
      skills: [
        { name: 'HTML', percentage: 90 },
        { name: 'CSS', percentage: 73 },
        { name: 'JavaScript', percentage: 74 },
        { name: 'React.js', percentage: 80 },
        { name: 'Next.js', percentage: 75 },
        { name: 'Tailwind CSS', percentage: 85 }
      ]
    },

    backend: {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'C', percentage: 83 },
        { name: 'C++', percentage: 60 },
        { name: 'Python', percentage: 81 },
        { name: 'Java', percentage: 90 },
        { name: 'Node.js', percentage: 80 },
        { name: 'Express.js', percentage: 72 },
        { name: 'REST API', percentage: 75 }
      ]
    },

    database: {
      title: 'Database',
      icon: '🗄️',
      skills: [
        { name: 'MySQL', percentage: 82 },
        { name: 'MongoDB', percentage: 80 }
      ]
    },

    aiml: {
      title: 'AI / ML',
      icon: '🤖',
      skills: [
        { name: 'Python', percentage: 85 },
        { name: 'Pandas', percentage: 75 },
        { name: 'NumPy', percentage: 75 },
        { name: 'Scikit-Learn', percentage: 70 },
        { name: 'TensorFlow (Basic)', percentage: 65 }
      ]
    },

    tools: {
      title: 'Tools & Concepts',
      icon: '🛠️',
      skills: [
        { name: 'DSA', percentage: 78 },
        { name: 'OOPS', percentage: 74 },
        { name: 'Software Engineering', percentage: 85 },
        { name: 'OS', percentage: 80 },
        { name: 'Git & GitHub', percentage: 73 },
        { name: 'Docker', percentage: 73 }
      ]
    }
  };
}

function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.getAttribute('data-width');
          setTimeout(() => {
            skillBar.style.width = width;
          }, 500);
          skillObserver.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
}

// ============================================
// PROJECTS (Populate, Filters, Modal)
// ============================================
function initProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const projects = typeof CONFIG !== 'undefined' && CONFIG.PROJECTS ? CONFIG.PROJECTS : [];

  container.classList.add('grid-layout');

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card-enhanced filter-show';
    card.dataset.category = Array.isArray(project.category)
  ? project.category.join(',')
  : project.category;

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-card-actions">
          <a href="${project.liveUrl}" class="btn-demo" target="_blank" rel="noopener">Live Demo</a>
          <a href="${project.githubUrl}" class="btn-github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        openProjectModal(project);
      }
    });

    container.appendChild(card);
  });

  // Filter logic
  initProjectFilters();

  // Modal
  initProjectModal();
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card-enhanced');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const categories = card.dataset.category.split(',');
const show = filter === 'all' || categories.includes(filter);
        card.classList.remove('filter-show', 'filter-hide');
        card.classList.add(show ? 'filter-show' : 'filter-hide');

        if (show) {
          card.style.animationDelay = `${i * 0.05}s`;
        }
      });
    });
  });
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const overlay = modal?.querySelector('.project-modal-overlay');
  const closeBtn = modal?.querySelector('.project-modal-close');

  if (!modal || !modalBody) return;

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h3 class="project-title">${project.title}</h3>
    ${project.subtitle ? `<p class="project-subtitle" style="margin: 8px 0 15px 0;">${project.subtitle}</p>` : ''}
    <p class="project-description">${project.description}</p>
    ${project.features && project.features.length ? `
      <h4 style="margin: 20px 0 10px 0; color: #fc0a7e;">Features</h4>
      <ul class="project-modal-features">
        ${project.features.map((f) => `<li>${f}</li>`).join('')}
      </ul>
    ` : ''}
    <div class="project-tech" style="margin-top: 20px;">
      ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
    </div>
    <div class="project-card-actions" style="margin-top: 25px;">
      <a href="${project.liveUrl}" class="btn-demo" target="_blank" rel="noopener">Live Demo</a>
      <a href="${project.githubUrl}" class="btn-github" target="_blank" rel="noopener">GitHub</a>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

// ============================================
// CONTACT FORM (Backend Integration)
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('.submit-button');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.classList.add('loading');
    submitButton.disabled = true;
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    const formData = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      subject: form.querySelector('#subject').value.trim(),
      message: form.querySelector('#message').value.trim(),
    };

    // Frontend validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showError();
      resetButton();
      return;
    }

    const apiUrl = typeof CONFIG !== 'undefined'
      ? `${CONFIG.API_BASE_URL}${CONFIG.CONTACT_ENDPOINT}`
      : '/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        successMessage.classList.add('show');
        form.reset();
        setTimeout(() => successMessage.classList.remove('show'), 5000);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.message) {
          errorMessage.querySelector('.message-text').textContent = data.message;
        }
        showError();
      }
    } catch (err) {
      // Fallback: show success for demo when backend unavailable (network/CORS error)
      const isNetworkError = err instanceof TypeError || (err.message && (
        err.message.includes('fetch') || err.message.includes('Failed') || err.message.includes('Network')
      ));
      if (isNetworkError) {
        successMessage.querySelector('.message-text').textContent =
          'Thank you! Message received. (Demo mode - start backend for real storage)';
        successMessage.classList.add('show');
        form.reset();
        setTimeout(() => successMessage.classList.remove('show'), 5000);
      } else {
        showError();
      }
    } finally {
      resetButton();
    }
  });

  function showError() {
    errorMessage.classList.add('show');
    setTimeout(() => errorMessage.classList.remove('show'), 5000);
  }

  function resetButton() {
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
  }

  // Focus effects
  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
    input.addEventListener('blur', () => {
      if (!input.value) input.parentElement?.classList.remove('focused');
    });
  });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.substring(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// UTILITIES
// ============================================
function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================
// ADDITIONAL EVENT HANDLERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const scrollArrow = document.querySelector('.scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// Parallax on hero image (desktop only)
document.addEventListener('mousemove', (e) => {
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.innerWidth > 768) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    heroImage.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
  }
});

// Image loading animation
document.querySelectorAll('img').forEach((img) => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  img.addEventListener('load', () => (img.style.opacity = '1'));
  if (img.complete) img.style.opacity = '1';
});
