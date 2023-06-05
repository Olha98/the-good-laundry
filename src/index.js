import './css/main.css';

//*---------- FUNCTIONS ----------

const element = {
  modal: document.querySelector('.menu__box'),
  burger: document.querySelector('#menu__btn'),
  menu__toggle: document.querySelector('#menu__toggle'),
  overlay: document.querySelector('.hamburger-menu__overlay'),
  wrapper: document.querySelector('.hamburger-menu').dataset.name,
};

document.addEventListener('click', modalModule);
document.addEventListener('keydown', modalModule);

function modalModule(e) {
  const isVisible = element.modal.classList.contains('visible');
  const matchTarget = e.target === element.menu__toggle;
  const clickOutside = e.target === element.overlay;

  function toggle() {
    if (matchTarget && !isVisible) openModal();
    if ((matchTarget && isVisible) || e.key === 'Escape' || clickOutside) closeModal();
  }

  function openModal() {
    if (matchTarget && !isVisible) {
      element.menu__toggle.checked = true;
      document.body.style.overflow = 'hidden';
      element.modal.classList.toggle('visible');
      element.overlay.style.display = 'inline-block';
      element.overlay.style.opacity = '100%';
    }
  }
  function closeModal() {
    if ((matchTarget && isVisible) || e.key === 'Escape' || clickOutside) {
      element.menu__toggle.checked = false;
      document.body.style.overflow = 'auto';
      element.modal.classList.toggle('visible');
      element.overlay.style.display = 'none';
    }
  }
  toggle();
}

//* ---------- CLASS ----------

// class Modal {
//   constructor() {
//     this.modal = document.querySelector('.menu__box');
//     this.burger = document.querySelector('#menu__btn');
//     this.menu__toggle = document.querySelector('#menu__toggle');
//     this.overlay = document.querySelector('.hamburger-menu__overlay');
//     document.addEventListener('click', this.toggle.bind(this));
//     this.menu__toggle.addEventListener('keydown', this.toggle.bind(this));
//   }

//   toggle(e) {
//     console.log(e.target);
//     if (e.target === this.menu__toggle && !this.modal.classList.contains('visible')) {
//       this.open();
//       if (this.modal.classList.contains('visible')) return;
//     }
//     if (
//       (e.target === this.menu__toggle && this.modal.classList.contains('visible')) ||
//       e.key === 'Escape' ||
//       e.target === this.overlay
//     ) {
//       this.close();
//     }
//   }

//   open() {
//     this.menu__toggle.checked = true;
//     document.body.style.overflow = 'hidden';
//     this.modal.classList.toggle('visible');
//     this.overlay.style.display = 'inline-block';
//     this.overlay.style.opacity = '1';
//   }

//   close() {
//     this.menu__toggle.checked = false;
//     document.body.style.overflow = 'auto';
//     this.modal.classList.toggle('visible');
//     this.overlay.style.display = 'none';
//   }
// }
// const modal = new Modal();

// window.removeEventListener('keydown', closeModalWindow);
// window.removeEventListener('keydown', closeModalWindow);
