import './css/main.css';
// require('./css/main.css');

const element = {
  modal: document.querySelector('.menu__box'),
  burger: document.querySelector('#menu__btn'),
};

// const modalModule = () => {
//   const matchTarget = e.target === element.menu__toggle;
//   document.addEventListener('click', e => {
//     openModalWindow(e);
//     closeModalWindow(e);
//   });

//   const openModalWindow = e => {
//     if (e.target === element.menu__toggle) {
//       document.body.style.overflow = 'hidden';
//       element.modal.classList.toggle('visible');
//     }
//   };

//   const closeModalWindow = e => {
//     console.log(e.target, 'tttt');

//     if (e.target.classList.contains('visible') || e.target.dataset.action === 'btn__closeModal' || e.key === 'Escape') {
//       console.log('hello');
//       document.body.style.overflow = 'auto';

//       modalOverlay.removeEventListener('click', closeModalWindow);
//       window.removeEventListener('keydown', closeModalWindow);
//     }
//   };
// };

// modalModule();
