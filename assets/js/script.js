function openQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) {
    return;
  }

  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const firstInput = form.querySelector('input, select, textarea');
  if (firstInput) {
    firstInput.focus();
  }
}

function handleQuoteSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = {
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    phone: formData.get('phone')?.toString().trim() || '',
    service: formData.get('service')?.toString().trim() || '',
    message: formData.get('message')?.toString().trim() || ''
  };

  if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
    return;
  }

  const text = [
    '*Quote request*',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Project details: ${data.message}`
  ].join('\n');

  const whatsappNumber = '+19784893235';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');

  const status = document.getElementById('quote-status');
  if (status) {
    status.textContent = 'Your request was prepared. Please send the WhatsApp message to complete the quote.';
  }

  form.reset();
}

document.addEventListener('DOMContentLoaded', function () {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', handleQuoteSubmit);
  }

  const quoteTriggers = document.querySelectorAll('[data-quote-trigger]');
  quoteTriggers.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      openQuoteForm();
    });
  });

  if (window.location.hash === '#quote-form') {
    openQuoteForm();
  }
});
