/* ═══════════════════════════════════════════════════════════════
   MAIN.JS — Jan's Portfolio
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const html = document.documentElement;

  /* ────────────── THEME TOGGLE ────────────── */
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    initDots();
  });

  /* ────────────── HEADER SCROLL ────────────── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
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

  /* ────────────── TYPEWRITER ────────────── */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Virtual Assistant',
    'Operations Assistant',
    'Automation Specialist',
    'AI Agent Developer',
    'All-Rounder'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typewrite() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typewrite, 2000); // pause before deleting
        return;
      }
      setTimeout(typewrite, 70);
    } else {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typewrite, 400);
        return;
      }
      setTimeout(typewrite, 40);
    }
  }
  typewrite();

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
    logoHTML += `<div class="carousel__item"><img src="assets/tools logo/techstack logos/${i}.png" alt="Tool ${i}" loading="lazy"></div>`;
  }
  carousel.innerHTML = logoHTML + logoHTML; // duplicate for infinite loop

  /* ────────────── VIDEO PLAY/PAUSE ────────────── */
  document.querySelectorAll('.detail-card__media--video').forEach(mediaEl => {
    const video = mediaEl.querySelector('video');
    const overlay = mediaEl.querySelector('.play-overlay');

    mediaEl.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        overlay.classList.add('hidden');
      } else {
        video.pause();
        overlay.classList.remove('hidden');
      }
    });

    video.addEventListener('ended', () => {
      overlay.classList.remove('hidden');
    });
  });

  /* ────────────── MATH CAPTCHA ────────────── */
  let captchaAnswer = 0;
  const captchaQ = document.getElementById('captchaQuestion');

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = a + b;
    captchaQ.textContent = `What is ${a} + ${b}?`;
  }
  generateCaptcha();

  /* ────────────── CONTACT FORM → GOOGLE SHEETS ────────────── */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  // Google Apps Script Web App URL — replace with your deployed script URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxIj7uz1qofVkJK8E8UZLfTAGHsFgGkcXkoCwlCmxCl8CTAnVR-OMAW6DLJep5LYA/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate captcha
    const captchaInput = parseInt(document.getElementById('captcha').value, 10);
    if (captchaInput !== captchaAnswer) {
      statusEl.textContent = 'Incorrect answer. Please try again.';
      statusEl.className = 'form-status error';
      generateCaptcha();
      document.getElementById('captcha').value = '';
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    const query = new URLSearchParams({
      firstName: form.firstName.value,
      lastName:  form.lastName.value,
      email:     form.email.value,
      company:   form.company.value,
      website:   form.website.value,
      message:   form.message.value,
      timestamp: new Date().toISOString(),
    });

    try {
      await fetch(`${GOOGLE_SCRIPT_URL}?${query}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      statusEl.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      statusEl.className = 'form-status success';
      form.reset();
      generateCaptcha();
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please email me directly.';
      statusEl.className = 'form-status error';
    }

    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Message';
  });

  /* ────────────── SCROLL REVEAL ────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section-label, .section-title, .about__layout, .about__agent-cta, .showcase, .detail-card, .resume__content, .contact__sub, .contact-form, .contact__links, .carousel-wrap, .claude-cta, .footer__grid').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ────────────── GSAP HERO ENTRANCE ────────────── */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__wave', { opacity: 0, y: 24, duration: 0.7, delay: 0.2 })
      .from('.hero__title', { opacity: 0, y: 56, duration: 1.0 }, '-=0.4')
      .from('.hero__availability', { opacity: 0, y: 18, duration: 0.6 }, '-=0.4')
      .from('.hero__buttons', { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
      .from('.hero__stats', { opacity: 0, y: 14, duration: 0.6 }, '-=0.2')
      .from('.hero__scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.3');

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
