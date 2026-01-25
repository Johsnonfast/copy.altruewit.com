document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-rfq-form]');
  if (!form) {
    return;
  }

  const statusEl = form.querySelector('[data-rfq-status]');
  const config = window.SITE_CONFIG || {};

  const stored = sessionStorage.getItem('quickRfq');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      Object.keys(data).forEach((key) => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && !field.value) {
          field.value = data[key];
        }
      });
    } catch (error) {
      sessionStorage.removeItem('quickRfq');
    }
    sessionStorage.removeItem('quickRfq');
  }

  const setStatus = (message, isError) => {
    if (!statusEl) {
      return;
    }
    statusEl.textContent = message;
    statusEl.style.color = isError ? '#b42318' : '#0f766e';
  };

  const loadRecaptcha = () => {
    if (!config.recaptchaSiteKey) {
      return Promise.reject(new Error('Missing reCAPTCHA site key.'));
    }
    if (window.grecaptcha) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${config.recaptchaSiteKey}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load reCAPTCHA.'));
      document.head.appendChild(script);
    });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') {
      return;
    }

    if (!config.rfqEndpoint) {
      setStatus('RFQ endpoint is not configured yet.', true);
      return;
    }

    form.dataset.submitting = 'true';
    setStatus('Submitting your request...', false);

    try {
      await loadRecaptcha();
      const token = await window.grecaptcha.execute(config.recaptchaSiteKey, {
        action: config.recaptchaAction || 'rfq_submit'
      });

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((value, key) => {
        if (key === 'privacyConsent') {
          payload[key] = form.elements[key].checked;
        } else {
          payload[key] = value;
        }
      });

      payload.recaptchaToken = token;
      payload.recaptchaAction = config.recaptchaAction || 'rfq_submit';
      payload.sourcePage = window.location.href;

      const response = await fetch(config.rfqEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      form.reset();
      setStatus('Thank you! Your RFQ has been submitted.', false);
    } catch (error) {
      setStatus('Submission failed. Please try again or email us.', true);
    } finally {
      form.dataset.submitting = 'false';
    }
  });
});
