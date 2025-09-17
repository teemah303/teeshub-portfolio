// Basic interactive features: mobile nav toggle, form validation, modals, dynamic year

document.addEventListener('DOMContentLoaded', () => {
  // year
  const yrs = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = yrs;
  });

  // mobile nav toggle (works on pages sharing script)
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // simple modal for card details
  const modalRoot = document.getElementById('modal-root');
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-modal') || 'modal';
      openModal(`<div class="modal"><button class="modal-close" aria-label="Close">×</button><div class="modal-body"><h2>Project details</h2><p>Details about this project or prototype. Replace with real content.</p></div></div>`);
    });
  });

  function openModal(html){
    if(!modalRoot) return;
    modalRoot.innerHTML = `<div class="modal-overlay" tabindex="-1">${html}</div>`;
    modalRoot.querySelector('.modal-close').addEventListener('click', closeModal);
    modalRoot.querySelector('.modal-overlay').addEventListener('click', (ev) => {
      if(ev.target === ev.currentTarget) closeModal();
    });
  }
  function closeModal(){
    if(modalRoot) modalRoot.innerHTML = '';
  }

  // basic contact form validation + demo submit
  const form = document.getElementById('form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // built-in constraint validation
      if(!form.reportValidity()){
        status.textContent = 'Please complete the form correctly.';
        status.style.color = 'crimson';
        return;
      }
      status.style.color = '';
      status.textContent = 'Sending...';

      // demo: simulate sending then reset
      setTimeout(() => {
        status.style.color = 'green';
        status.textContent = 'Message sent! I will reply soon.';
        form.reset();
      }, 900);
    });
  }

  // keyboard: close modals with Esc
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      const modalOverlay = document.querySelector('#modal-root .modal-overlay');
      if(modalOverlay) modalRoot.innerHTML = '';
    }
  });
});
