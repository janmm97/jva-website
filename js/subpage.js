/* ═══════════════════════════════════════════════════════════════
   SUBPAGE.JS — Shared logic for project detail pages
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const html = document.documentElement;

  /* ────────────── THEME TOGGLE ────────────── */
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  function applyLogoTheme(theme) {
    const src = theme === 'dark'
      ? 'assets/logo/logo-white.svg'
      : 'assets/logo/logo-black.svg';
    document.querySelectorAll('.logo-img').forEach(img => { img.src = src; });
  }
  applyLogoTheme(html.getAttribute('data-theme') || 'dark');

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyLogoTheme(next);
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

  /* ────────────── SCROLL REVEAL ────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

})();
