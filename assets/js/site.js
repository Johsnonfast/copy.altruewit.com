document.addEventListener('DOMContentLoaded', () => {
  const elements = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));

  // Mobile Navigation Drawer
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileDrawer = document.querySelector('[data-mobile-drawer]');
  const mobileDrawerClose = document.querySelectorAll('[data-mobile-drawer-close]');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const body = document.body;

  // Open/Close drawer
  function toggleMobileDrawer(show) {
    if (show === true) {
      mobileDrawer.classList.add('active');
      mobileMenuToggle.classList.add('active');
      body.style.overflow = 'hidden';
    } else if (show === false) {
      mobileDrawer.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      body.style.overflow = '';
    } else {
      mobileDrawer.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      if (mobileDrawer.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    }
  }

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileDrawer();
    });

    // Close on backdrop click
    mobileDrawerClose.forEach((closeBtn) => {
      closeBtn.addEventListener('click', () => {
        toggleMobileDrawer(false);
      });
    });

    // Close on backdrop click
    const backdrop = mobileDrawer.querySelector('.mobile-drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        toggleMobileDrawer(false);
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        toggleMobileDrawer(false);
      }
    });

    // Prevent click propagation on drawer content
    const drawerContent = mobileDrawer.querySelector('.mobile-drawer-content');
    if (drawerContent) {
      drawerContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  // Mobile submenu toggle
  mobileNavItems.forEach((item) => {
    const expandBtn = item.querySelector('.mobile-nav-expand');
    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Close other expanded items
        mobileNavItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('expanded')) {
            otherItem.classList.remove('expanded');
          }
        });
        item.classList.toggle('expanded');
      });
    }
  });

  // Close drawer when clicking nav links
  const mobileNavLinks = mobileDrawer?.querySelectorAll('.mobile-nav-links > a:not(.mobile-nav-expand)');
  mobileNavLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileDrawer(false);
    });
  });
});
