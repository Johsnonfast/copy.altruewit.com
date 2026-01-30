/**
 * Site Main Script
 */

(function() {
  'use strict';

  function initRevealAnimations() {
    const elements = document.querySelectorAll('.reveal');

    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  function initFormPrefill() {
    const savedData = sessionStorage.getItem('quickRfq');
    if (!savedData) return;

    try {
      const data = JSON.parse(savedData);

      Object.keys(data).forEach(key => {
        const field = document.querySelector(`[name="${key}"]`);
        if (field) {
          field.value = data[key];
        }
      });
    } catch (e) {
      console.warn('Failed to pre-fill form data:', e);
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  function initMobileMenuButton() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    function updateVisibility() {
      if (window.innerWidth < 768) {
        if (menuBtn) menuBtn.style.display = 'flex';
        if (navLinks) navLinks.style.display = 'none';
        if (navCta) navCta.style.display = 'none';
      } else {
        if (menuBtn) menuBtn.style.display = 'none';
        if (navLinks) navLinks.style.display = 'flex';
        if (navCta) navCta.style.display = 'flex';
      }
    }

    updateVisibility();
    window.addEventListener('resize', updateVisibility);
  }

  function init() {
    initRevealAnimations();
    initFormPrefill();
    initSmoothScroll();
    initMobileMenuButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
