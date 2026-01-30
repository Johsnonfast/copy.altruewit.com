/**
 * Header Navigation Component
 *
 * Sticky header with current page highlighting,
 * mobile hamburger menu, and dropdown support.
 */

(function() {
  'use strict';

  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');

  function init() {
    if (!header) return;

    setupScrollEffect();
    setupActiveState();
    setupMobileMenu();
    setupKeyboardNavigation();
  }

  function setupScrollEffect() {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  function setupActiveState() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
        link.classList.add('active');
      } else if (href !== '/' && currentPath.startsWith(href)) {
        link.classList.add('active');
      } else if (currentHash && href.endsWith(currentHash)) {
        link.classList.add('active');
      }
    });
  }

  function setupMobileMenu() {
    if (!mobileMenuBtn || !drawer) return;

    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleDrawer();
    });

    const overlay = drawer.querySelector('.drawer-overlay');
    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    const drawerLinks = drawer.querySelectorAll('.drawer-nav a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  function toggleDrawer() {
    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');

    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function openDrawer() {
    if (!drawer) return;

    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    drawer.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeDrawer() {
    if (!drawer) return;

    drawer.classList.remove('open');
    document.body.style.overflow = '';
    drawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function setupKeyboardNavigation() {
    if (drawer) {
      drawer.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && drawer.classList.contains('open')) {
          const focusableElements = drawer.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }

  function getActiveLink() {
    return document.querySelector('.nav-links a.active');
  }

  function setActiveLink(href) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === href) {
        link.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.HeaderNav = {
    toggleDrawer,
    openDrawer,
    closeDrawer,
    getActiveLink,
    setActiveLink
  };
})();
