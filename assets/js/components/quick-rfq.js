/**
 * Quick RFQ Form Component
 */

(function() {
  'use strict';

  const form = document.querySelector('[data-quick-rfq]');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(field, message) {
    field.classList.add('error');
    let errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(field) {
    field.classList.remove('error');
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
  }

  function clearAllErrors() {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-message').forEach(el => el.remove());
  }

  function validateForm() {
    let isValid = true;
    clearAllErrors();

    const nameInput = form.querySelector('[name="contactName"]');
    const emailInput = form.querySelector('[name="businessEmail"]');
    const productSelect = form.querySelector('[name="productInterest"]');
    const messageInput = form.querySelector('[name="requirementsMessage"]');

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Contact name is required');
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Business email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    if (!productSelect.value) {
      showError(productSelect, 'Please select a product interest');
      isValid = false;
    }

    if (messageInput && !messageInput.value.trim()) {
      showError(messageInput, 'Requirements message is required');
      isValid = false;
    }

    return isValid;
  }

  function setLoading(loading) {
    if (!submitBtn) return;

    submitBtn.disabled = loading;

    if (loading) {
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span>Submitting...';
    } else {
      submitBtn.textContent = submitBtn.dataset.originalText || 'Continue to full RFQ';
    }
  }

  async function submitToAPI(formData) {
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    const API_ENDPOINT = '/api/lead';

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      return await response.json();
    } catch (error) {
      console.warn('API submission failed, continuing with local storage');
      return { success: true };
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(form);
      await submitToAPI(formData);

      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      sessionStorage.setItem('quickRfq', JSON.stringify(payload));

      window.location.href = '/contact/#quote';
    } catch (error) {
      console.error('Form submission error:', error);
      showError(submitBtn, 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function init() {
    if (!form) return;

    form.addEventListener('submit', handleSubmit);

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', function() {
        if (this.value.trim()) {
          clearError(this);
        }
      });

      field.addEventListener('input', function() {
        if (this.classList.contains('error') && this.value.trim()) {
          clearError(this);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.QuickRFQ = {
    validate: validateForm,
    submit: handleSubmit,
    setLoading
  };

})();
