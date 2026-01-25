document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-quick-rfq]');
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    sessionStorage.setItem('quickRfq', JSON.stringify(payload));
    window.location.href = '/contact/#rfq-form';
  });
});
