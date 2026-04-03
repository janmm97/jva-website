/* ═══════════════════════════════════════════════════════════════
   MAIN.JS — Portfolio interactions
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────── THEME TOGGLE ────────────── */
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    // Reinit dots for new color
    initDots();
  });

  /* ────────────── HEADER SCROLL ────────────── */
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    lastScroll = window.scrollY;
  }, { passive: true });

  /* ────────────── MOBILE NAV ────────────── */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ────────────── HERO CURSOR GLOW ────────────── */
  const heroEl = document.getElementById('hero');
  const glow = document.getElementById('heroGlow');

  heroEl.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    glow.classList.add('active');
  });

  heroEl.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  });

  /* ────────────── DOTTED CANVAS ────────────── */
  const canvas = document.getElementById('dotCanvas');
  const ctx = canvas.getContext('2d');
  let dots = [];
  let mouse = { x: -9999, y: -9999 };
  const DOT_SPACING = 32;
  const DOT_RADIUS = 1.2;
  const INTERACTION_RADIUS = 120;

  function initDots() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    dots = [];
    const cols = Math.ceil(canvas.offsetWidth / DOT_SPACING) + 1;
    const rows = Math.ceil(canvas.offsetHeight / DOT_SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          ox: c * DOT_SPACING,
          oy: r * DOT_SPACING,
          x: c * DOT_SPACING,
          y: r * DOT_SPACING,
        });
      }
    }
  }

  function drawDots() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    const style = getComputedStyle(html);
    const dotColor = style.getPropertyValue('--dot-color').trim();

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const dx = mouse.x - d.ox;
      const dy = mouse.y - d.oy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < INTERACTION_RADIUS) {
        const force = (1 - dist / INTERACTION_RADIUS) * 14;
        const angle = Math.atan2(dy, dx);
        d.x = d.ox - Math.cos(angle) * force;
        d.y = d.oy - Math.sin(angle) * force;
      } else {
        d.x += (d.ox - d.x) * 0.1;
        d.y += (d.oy - d.y) * 0.1;
      }

      const alpha = dist < INTERACTION_RADIUS ? 0.4 + (1 - dist / INTERACTION_RADIUS) * 0.6 : 0.18;
      const radius = dist < INTERACTION_RADIUS ? DOT_RADIUS + (1 - dist / INTERACTION_RADIUS) * 1.5 : DOT_RADIUS;

      ctx.beginPath();
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor.replace(/[\d.]+\)$/, alpha + ')');
      ctx.fill();
    }

    requestAnimationFrame(drawDots);
  }

  heroEl.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  heroEl.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', initDots);
  initDots();
  drawDots();

  /* ────────────── PARALLAX ────────────── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ────────────── TECH CAROUSEL ────────────── */
  const carousel = document.getElementById('carousel');
  const logoCount = 25;
  let logoHTML = '';
  for (let i = 1; i <= logoCount; i++) {
    logoHTML += `<div class="carousel__item"><img src="assets/tools logo/techstack logos/${i}.png" alt="Tech ${i}" loading="lazy"></div>`;
  }
  // Duplicate for infinite loop
  carousel.innerHTML = logoHTML + logoHTML;

  /* ────────────── PROJECT CARDS ────────────── */
  const projectsData = [
    // Card-based projects
    { title: 'Project Alpha', desc: 'An AI-powered solution for intelligent task management and workflow optimization.', img: 'assets/images for card/card images/1.png', category: 'ai', badge: 'AI / GPT' },
    { title: 'Project Beta', desc: 'Smart content generation and analysis using advanced language models.', img: 'assets/images for card/card images/2.png', category: 'ai', badge: 'AI / GPT' },
    { title: 'Project Gamma', desc: 'Automated data pipeline with intelligent routing and processing.', img: 'assets/images for card/card images/3.png', category: 'ai', badge: 'AI / GPT' },
    // n8n projects
    { title: 'Content Generator', desc: 'Automated content creation pipeline using n8n workflows with AI integration.', img: 'assets/n8n projects/Content Generator.png', category: 'n8n', badge: 'n8n' },
    { title: 'Deal Flow Checker', desc: 'Automated deal screening and validation workflow for efficient pipeline management.', img: 'assets/n8n projects/Deal Flow Checker.png', category: 'n8n', badge: 'n8n' },
    { title: 'Events Review', desc: 'Intelligent event monitoring and review automation workflow.', img: 'assets/n8n projects/Events Review IMG.png', category: 'n8n', badge: 'n8n' },
    // Claude Code Agent projects (videos)
    { title: 'Calendar Assistant', desc: 'AI-powered calendar management agent built with Claude Code.', video: 'assets/Claude Code Agents/Calendar Assistant.mp4', category: 'claude', badge: 'Claude Code' },
    { title: 'Email Assistant', desc: 'Intelligent email drafting and management agent powered by Claude.', video: 'assets/Claude Code Agents/Email Assistant.mp4', category: 'claude', badge: 'Claude Code' },
  ];

  const grid = document.getElementById('projectsGrid');

  function renderProjects(filter) {
    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
    grid.innerHTML = '';

    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.style.transitionDelay = `${i * 0.08}s`;

      let mediaHTML;
      if (p.video) {
        mediaHTML = `<video src="${p.video}" muted loop playsinline preload="metadata"></video>`;
      } else {
        mediaHTML = `<img src="${p.img}" alt="${p.title}" loading="lazy">`;
      }

      card.innerHTML = `
        <div class="project-card__media">
          ${mediaHTML}
          <span class="project-card__badge">${p.badge}</span>
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${p.title}</h3>
          <p class="project-card__desc">${p.desc}</p>
        </div>
      `;

      // Play video on hover
      if (p.video) {
        const vid = card.querySelector('video');
        card.addEventListener('mouseenter', () => vid.play());
        card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
      }

      grid.appendChild(card);
    });

    // Re-observe for reveal
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    });
  }

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.dataset.tab);
    });
  });

  renderProjects('all');

  /* ────────────── SCROLL REVEAL ────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add .reveal to sections
  document.querySelectorAll('.section-label, .section-title, .about__grid, .resume__content, .contact__sub, .contact__links, .carousel-wrap, .projects__tabs').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ────────────── COUNT-UP ANIMATION ────────────── */
  const countEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current;
        }, 30);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => countObserver.observe(el));

  /* ────────────── GSAP HERO ENTRANCE ────────────── */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__label', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 })
      .from('.hero__title', { opacity: 0, y: 50, duration: 1 }, '-=0.5')
      .from('.hero__sub', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
      .from('.hero__cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.hero__scroll-hint', { opacity: 0, duration: 0.8 }, '-=0.3');

    // Fade hero on scroll
    gsap.to('.hero__content', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 0,
      y: -60,
    });
  }

  /* ────────────── SMOOTH ANCHOR SCROLL ────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
