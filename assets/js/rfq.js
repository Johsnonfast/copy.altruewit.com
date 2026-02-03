document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-rfq-form]');
  if (!form) {
    return;
  }

  const statusEl = form.querySelector('[data-rfq-status]');
  const config = window.SITE_CONFIG || {};

  // Check if RFQ endpoint is configured - if not, show friendly message
  if (!config.rfqEndpoint || config.rfqEndpoint.trim() === '') {
    const formContainer = form.closest('.form-container') || form.parentElement;
    if (formContainer) {
      // Create a more user-friendly maintenance message
      formContainer.innerHTML = `
        <div class="message-box" style="
          padding: 2.5rem;
          border-radius: 16px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #bae6fd;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        ">
          <div style="margin-bottom: 1.5rem;">
            <div style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 64px;
              height: 64px;
              background: #0284c7;
              border-radius: 50%;
              margin-bottom: 1rem;
            ">
              <span style="color: white; font-size: 28px;">📧</span>
            </div>
            <h3 style="
              margin: 0 0 0.75rem 0;
              color: #0369a1;
              font-size: 1.75rem;
              font-weight: 700;
            ">
              Request a Quote - Coming Soon
            </h3>
            <p style="
              margin: 0;
              color: #475569;
              font-size: 1.1rem;
              line-height: 1.6;
            ">
              We're finalizing our RFQ system for the best experience.
            </p>
          </div>
          
          <div style="
            background: white;
            border-radius: 12px;
            padding: 1.75rem;
            margin: 1.5rem 0;
            border: 1px solid #e2e8f0;
            text-align: left;
          ">
            <p style="margin: 0 0 1rem 0; color: #334155; line-height: 1.6;">
              For immediate inquiries, please contact us directly:
            </p>
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
              <div style="
                width: 40px;
                height: 40px;
                background: #f1f5f9;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                flex-shrink: 0;
              ">
                <span style="color: #0369a1;">✉️</span>
              </div>
              <div>
                <div style="font-weight: 600; color: #0f172a; margin-bottom: 0.25rem;">
                  Primary Contact Email
                </div>
                <a href="mailto:summer@altruewit.com" style="
                  color: #0369a1;
                  text-decoration: none;
                  font-size: 1.1rem;
                  font-weight: 500;
                ">
                  summer@altruewit.com
                </a>
              </div>
            </div>
            
            <div style="
              background: #f8fafc;
              border-radius: 8px;
              padding: 1.25rem;
              margin-top: 1.5rem;
            ">
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: 0.75rem;
              ">
                <span style="color: #059669; margin-right: 0.5rem;">✓</span>
                <span style="color: #334155; font-weight: 500;">
                  Response Time: Within 1 business day
                </span>
              </div>
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: 0.75rem;
              ">
                <span style="color: #059669; margin-right: 0.5rem;">✓</span>
                <span style="color: #334155; font-weight: 500;">
                  Available: Monday - Friday, 9AM - 6PM (UTC+8)
                </span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="color: #059669; margin-right: 0.5rem;">✓</span>
                <span style="color: #334155; font-weight: 500;">
                  Languages: English, Chinese
                </span>
              </div>
            </div>
          </div>
          
          <p style="
            color: #64748b;
            font-size: 0.95rem;
            margin: 1.5rem 0 0 0;
            line-height: 1.5;
          ">
            The online RFQ form will be available shortly. 
            Thank you for your interest in Altruewit products.
          </p>
        </div>
      `;
    }
    return; // Stop further execution
  }

  // Original RFQ functionality below (only executes if rfqEndpoint is configured)
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
    statusEl.style.marginTop = 'var(--space-3)';
    statusEl.style.padding = 'var(--space-3)';
    statusEl.style.borderRadius = 'var(--radius-sm)';
    statusEl.style.background = isError ? 'rgba(180, 35, 24, 0.08)' : 'rgba(15, 118, 110, 0.08)';
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

      // Add debug info in development
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('vercel')) {
        payload._debug = {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        };
      }

      const response = await fetch(config.rfqEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let result;
      try {
        result = await response.json();
      } catch (e) {
        throw new Error('Invalid response from server');
      }

      if (!response.ok || !result.ok) {
        const errorMessage = result.message || 'Submission failed. Please try again.';
        throw new Error(errorMessage);
      }

      form.reset();
      setStatus('Thank you! Your RFQ has been submitted successfully. We will reply within 1 business day.', false);
      
      // Scroll to status message
      if (statusEl) {
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (error) {
      console.error('RFQ submission error:', error);
      let errorMessage = 'Submission failed. Please try again or email us directly.';
      
      if (error.message) {
        if (error.message.includes('Missing reCAPTCHA') || error.message.includes('Failed to load reCAPTCHA')) {
          errorMessage = 'Security verification (reCAPTCHA) failed to load. Please check your connection and try again.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('Invalid response')) {
          errorMessage = 'Server error. Please try again later or contact us directly.';
        } else if (error.message.includes('reCAPTCHA')) {
          errorMessage = 'Security verification failed. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setStatus(errorMessage + ' For immediate assistance, email: summer@altruewit.com', true);
    } finally {
      form.dataset.submitting = 'false';
    }
  });
});