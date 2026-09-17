/**
 * MAIN JAVASCRIPT
 * Market Entry & Business Expansion Consultancy
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar
  const navbar = document.querySelector('.navbar-premium');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerText = '☀️';
  } else {
    if (themeToggle) themeToggle.innerText = '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerText = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerText = '☀️';
      }
    });
  }

  // 3. RTL Toggle
  const rtlToggle = document.getElementById('rtl-toggle');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  
  function setRTL(isRTL) {
    if (isRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      let link = document.getElementById('rtl-stylesheet');
      if (!link) {
        link = document.createElement('link');
        link.id = 'rtl-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
        document.head.appendChild(link);
      }
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      let link = document.getElementById('rtl-stylesheet');
      if (link) link.remove();
    }
  }

  if (currentDir === 'rtl') {
    setRTL(true);
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      let dir = document.documentElement.getAttribute('dir');
      if (dir === 'rtl') {
        setRTL(false);
        localStorage.setItem('dir', 'ltr');
      } else {
        setRTL(true);
        localStorage.setItem('dir', 'rtl');
      }
    });
  }

  // 4. Scroll Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // 5. Scroll to Top
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Prevent scrolling when mobile menu is open
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    mainNav.addEventListener('show.bs.collapse', () => {
      document.body.style.overflow = 'hidden';
    });
    mainNav.addEventListener('hide.bs.collapse', () => {
      document.body.style.overflow = '';
    });
  }
});

