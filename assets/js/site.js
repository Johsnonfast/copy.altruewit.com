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
});
