/**
 * Mobile Drawer Component
 */

(function() {
  'use strict';

  const drawer = document.querySelector('.mobile-drawer');
  const overlay = drawer ? drawer.querySelector('.drawer-overlay') : null;
  const closeBtn = drawer ? drawer.querySelector('.drawer-close') : null;

  function open() {
    if (!drawer) return;

    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    drawer.setAttribute('aria-hidden', 'false');
  }

  function close() {
    if (!drawer) return;

    drawer.classList.remove('open');
    document.body.style.overflow = '';
    drawer.setAttribute('aria-hidden', 'true');
  }

  function toggle() {
    if (drawer && drawer.classList.contains('open')) {
      close();
    } else {
      open();
    }
  }

  function init() {
    if (!drawer) return;

    if (overlay) {
      overlay.addEventListener('click', close);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        close();
      }
    });

    const links = drawer.querySelectorAll('.drawer-nav a');
    links.forEach(link => {
      link.addEventListener('click', close);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MobileDrawer = {
    open,
    close,
    toggle
  };

})();
