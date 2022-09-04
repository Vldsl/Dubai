// // import * as flsFunctions from "./modules/functions.js";

// // flsFunctions.isWebp();

// "use sctrict"
// // ============== Header
// const header = document.querySelector('.header');
// const intro = document.querySelector('.intro');
// const headerHeight = header.offsetHeight;
// const introHeight = intro.offsetHeight;
// let lastScrollTop = 0;

// window.addEventListener('scroll', () => {
//   let scrollDistance = window.scrollY;
//   if (scrollDistance >= introHeight + headerHeight) {
//     header.classList.add('fixed');
//     intro.style.marginTop = `${headerHeight}px`;
//   } else {
//     header.classList.remove('fixed');
//     intro.style.marginTop = null;
//   }
//   lastScrollTop = scrollDistance;
// });

// ======================= Replace header button
document.addEventListener('DOMContentLoaded', () => {
  const headerBtn = document.querySelector('.header__btn');
  const headerBox = document.querySelector('.header__box');
  const menuBody = document.querySelector('.menu__body');
  // const menuIcon = document.querySelector('.menu__icon');
  const headerBody = document.querySelector('.header__body');
  const headerInner = document.querySelector('.header__inner');
  if (headerBtn) {
    function replaceBtn() {
      if (document.documentElement.offsetWidth <= 767.9) {
        menuBody.append(headerBtn);
        menuBody.append(headerBox);
        // headerBody.append(headerBtn);
      } else if (document.documentElement.offsetWidth >= 767.9 && document.documentElement.offsetWidth <= 1919.9) {
        headerBody.prepend(headerBox);
        headerBody.prepend(headerBtn);
      } else {
        headerBody.append(headerBtn);
        headerInner.append(headerBox);
        // menuList.append(headerBtn);
      }
      // if (document.documentElement.offsetWidth <= 1919.9) {
      //   headerInner.append(menuIcon);
      // } else {
      //   menuBody.before(menuIcon);
      // }
    }
    window.addEventListener('resize', replaceBtn);
    replaceBtn();
  }
});

// =======================Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu__icon');
  const menu = document.querySelector('.menu__body');
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('_active');
      document.body.classList.toggle('lock');
      menu.classList.toggle('_open');
    });
  }
});

// HeaderSublist
const arrows = document.querySelectorAll('.arrow');
if (arrows.length > 0 && document.documentElement.offsetWidth <= 1919.9) {
  arrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const menuLink = self.previousElementSibling;
      const sublist = self.nextElementSibling;

      self.classList.toggle('_active');
      menuLink.classList.toggle('_active');

      if (self.classList.contains('_active')) {
        sublist.style.maxHeight = sublist.scrollHeight + "px"
      } else {
        sublist.style.maxHeight = null;
      }
    });
  });
}

// Modal
const modal = document.querySelector('.modals');
if (modal) {
  const openBtns = document.querySelectorAll('.open-btn');
  const closeBtn = document.querySelector('.modal__btn');
  const modalForm = document.querySelector('.modal__form');

  let disableScroll = function () {
    let pagePosition = window.scrollY;
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  let enableScroll = function () {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  }
  openBtns.forEach(item => {
    item.addEventListener('click', () => {
      modal.style.display = 'block';
      disableScroll();
    });
  })

  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    enableScroll();
  })

  modal.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      enableScroll();
    }
  });

  modalForm.addEventListener('submit', e => {
    // e.preventDefault();
  });
}


// // Scroll to Top
// const scrollBtn = document.querySelector('.scroll-up');
// scrollBtn.addEventListener('click', () => {
//   window.scrollBy({
//     top: -document.documentElement.scrollHeight,
//     behavior: 'smooth'
//   });
// });
// window.onscroll = function () {
//   if (window.scrollY > introHeight) {
//     scrollBtn.classList.add('active');
//   } else {
//     scrollBtn.classList.remove('active');
//   }
// }

// // Dark mode
// const btnTheme = document.querySelector('.toggle-theme');
// btnTheme.addEventListener('click', (event) => {
//   event.preventDefault();
//   if (localStorage.getItem('theme') === 'dark') {
//     localStorage.removeItem('theme');
//   }
//   else {
//     localStorage.setItem('theme', 'dark')
//   }
//   addDarkClassToHTML()
// });
// function addDarkClassToHTML() {
//   try {
//     if (localStorage.getItem('theme') === 'dark') {
//       document.querySelector('html').classList.add('dark_mode');
//       btnTheme.classList.add('active');
//     }
//     else {
//       document.querySelector('html').classList.remove('dark_mode');
//       btnTheme.classList.remove('active');
//     }
//   } catch (err) { }
// }
// addDarkClassToHTML();

// // ======================Spoiler
// const accordions = document.querySelectorAll('.spoiler-room__item');
// if (accordions) {
//   accordions.forEach(el => {
//     el.addEventListener('click', (e) => {
//       const self = e.currentTarget;
//       const content = self.querySelector('.spoiler-room__content');

//       self.classList.toggle('open');

//       if (self.classList.contains('open')) {
//         content.style.maxHeight = content.scrollHeight + 'px';
//       } else {
//         content.style.maxHeight = null;
//       }
//     });
//   });
// }

// // ==============================Slider
// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.querySelector('.slider-testimonials__body');
//   const track = document.querySelector('.slider-testimonials__track');
//   const items = document.querySelectorAll('.slider-testimonials__item');
//   const btnPrev = document.querySelector('.control__btn_prev');
//   const btnNext = document.querySelector('.control__btn_next');
//   const dots = document.querySelectorAll('.pagination__item');
//   let width = container.offsetWidth;
//   let count = 0;
//   if (items.length > 0) {

//     function init() {
//       track.style.width = width * items.length + "px";
//       items.forEach(item => {
//         item.style.width = width + "px";
//       });
//       rollsSlider();
//     }
//     window.addEventListener('resize', init);
//     init();
//     const nextSlide = () => {
//       count++;
//       if (count >= items.length) {
//         count = 0;
//       }
//       activeDot(count);
//       rollsSlider();
//     }
//     const prevSlide = () => {
//       count--;
//       if (count < 0) {
//         count = items.length - 1;
//       }
//       activeDot(count);
//       rollsSlider();
//     }
//     function rollsSlider() {
//       track.style.transform = 'translate(-' + count * width + 'px)';
//     }
//     function activeDot(n) {
//       dots.forEach(function (item) {
//         item.classList.remove('active');
//       });
//       dots[n].classList.add('active');
//     }
//     dots.forEach((item, indexDot) => {
//       item.addEventListener('click', () => {
//         count = indexDot;
//         activeDot(count);
//         rollsSlider();
//       });
//     });
//     btnPrev.addEventListener('click', prevSlide);
//     btnNext.addEventListener('click', nextSlide);

//     setInterval(nextSlide, 2500);
//   }
// });

// // =============== Footer list arrow
// // const arrows = document.querySelectorAll('.footer__list_arrow');
// // arrows.forEach(function (el) {
// //   el.addEventListener('click', function () {
// //     el.nextElementSibling.classList.toggle('open');
// //     el.classList.toggle('active');
// //   });
// // });

// Footer Sublist
const menuFooterItems = document.querySelectorAll('.menu-footer__item');
if (menuFooterItems.length > 0 && document.documentElement.offsetWidth <= 699.9) {
  menuFooterItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const self = e.currentTarget;
      // const menuLink = self.previousElementSibling;
      const sublist = self.querySelector('.sublist-footer')

      self.classList.toggle('_active');
      // menuLink.classList.toggle('_active');

      if (self.classList.contains('_active')) {
        sublist.style.maxHeight = sublist.scrollHeight + "px"
      } else {
        sublist.style.maxHeight = null;
      }
    });
  });
}
