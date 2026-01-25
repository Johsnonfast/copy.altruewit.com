document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('[data-cookie-banner]');
  if (!banner) {
    return;
  }

  const consentKey = 'altruewit_cookie_consent';
  const acceptBtn = banner.querySelector('[data-cookie-accept]');
  const declineBtn = banner.querySelector('[data-cookie-decline]');
  const preferencesBtn = banner.querySelector('[data-cookie-preferences]');

  let details = banner.querySelector('.cookie-details');
  if (!details) {
    details = document.createElement('div');
    details.className = 'cookie-details';
    details.textContent = 'Analytics cookies load only after you accept.';
    banner.insertBefore(details, banner.querySelector('.cookie-actions'));
  }

  const loadGa4 = () => {
    const config = window.SITE_CONFIG || {};
    if (!config.ga4Id || window.__gaLoaded) {
      return;
    }
    window.__gaLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', config.ga4Id, { anonymize_ip: true });
  };

  const setConsent = (value) => {
    localStorage.setItem(consentKey, value);
    banner.classList.remove('show');
    if (value === 'accepted') {
      loadGa4();
    }
  };

  const existing = localStorage.getItem(consentKey);
  if (!existing) {
    banner.classList.add('show');
  } else if (existing === 'accepted') {
    loadGa4();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => setConsent('accepted'));
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', () => setConsent('declined'));
  }
  if (preferencesBtn) {
    preferencesBtn.addEventListener('click', () => {
      banner.classList.toggle('show-details');
    });
  }
});
