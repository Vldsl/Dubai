// // import * as flsFunctions from "./modules/functions.js";

// // flsFunctions.isWebp();

'use sctrict';

// ============== Header
const header = document.querySelector('.header');
if (header) {
  const intro = document.querySelector('.intro');
  const headerHeight = header.offsetHeight;
  const introHeight = intro.offsetHeight;
  // let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollDistance = window.scrollY;
    if (scrollDistance >= introHeight + headerHeight) {
      header.classList.add('fixed');
      intro.style.marginTop = `${headerHeight}px`;
    } else {
      header.classList.remove('fixed');
      intro.style.marginTop = null;
    }
    // lastScrollTop = scrollDistance;
  });
}

// ======================= Replace header button
document.addEventListener('DOMContentLoaded', () => {
  const headerBtn = document.querySelector('.header__btn');
  if (headerBtn) {
    const headerBox = document.querySelector('.header__box');
    const menuBody = document.querySelector('.menu__body');
    const headerBody = document.querySelector('.header__body');
    const headerContent = document.querySelector('.header__content');
    const replaceBtn = () => {
      if (document.documentElement.offsetWidth <= 767.9) {
        menuBody.append(headerBtn);
        menuBody.append(headerBox);
      } else if (document.documentElement.offsetWidth >= 767.9 && document.documentElement.offsetWidth <= 1919.9) {
        headerBody.prepend(headerBox);
        headerBody.prepend(headerBtn);
      } else {
        headerBody.append(headerBtn);
        headerContent.append(headerBox);
      }
    };
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
  arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const menuLink = self.previousElementSibling;
      const sublist = self.nextElementSibling;

      self.classList.toggle('_active');
      menuLink.classList.toggle('_active');

      if (self.classList.contains('_active')) {
        sublist.style.maxHeight = sublist.scrollHeight + "px";
        // sublist.style.maxHeight = `${sublist.scrollHeight} px`;
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
  // const modalForm = document.querySelector('.modal__form');

  const disableScroll = function () {
    const pagePosition = window.scrollY;
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
    // document.body.style.top = `${-pagePosition} px`;
  };

  const enableScroll = function () {
    const pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  };
  openBtns.forEach((item) => {
    item.addEventListener('click', () => {
      modal.style.display = 'block';
      disableScroll();
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    enableScroll();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      enableScroll();
    }
  });

  // modalForm.addEventListener('submit', (e) => {
  // e.preventDefault();
  // });
}

// Intro replace pagination
const pagination = document.querySelector('.intro__pagination');
if (pagination) {
  const introContent = document.querySelector('.intro__content');
  const introBottom = document.querySelector('.intro__bottom');
  const replacePagination = () => {
    if (document.documentElement.offsetWidth >= 767.9) {
      introBottom.append(pagination);
    } else {
      introContent.append(pagination);
    }
  };
  window.addEventListener('resize', replacePagination);
  replacePagination();
}

// Change background
const paginationItems = document.querySelectorAll('.pagination__item');
if (paginationItems.length > 0) {
  const introBody = document.querySelector('.intro__body');
  const btnPrev = document.querySelector('.control__btn_prev');
  const btnNext = document.querySelector('.control__btn_next');
  const bgArray = [];
  let count = 0;

  const nextSlide = () => {
    count++;
    if (count > bgArray.length - 1) {
      count = 0;
    }
    introBody.style.backgroundImage = `url("${bgArray[count]}")`;
    activeDot(count);
    activeBtn(count);
  };

  const prevSlide = () => {
    count--;
    if (count < 0) {
      count = bgArray.length - 1;
    }
    introBody.style.backgroundImage = `url("${bgArray[count]}")`;
    activeDot(count);
    activeBtn(count);
  };

  const activeBtn = (countBtn) => {
    if (countBtn === 0) {
      btnPrev.classList.remove('_active');
    } else {
      btnPrev.classList.add('_active');
    }

    if (countBtn === bgArray.length - 1) {
      btnNext.classList.remove('_active');
    } else {
      btnNext.classList.add('_active');
    }
  };

  const activeDot = (n) => {
    paginationItems.forEach((item) => {
      item.classList.remove('_active');
    });
    paginationItems[n].classList.add('_active');
  };

  paginationItems.forEach((item, index) => {
    bgArray.push(item.dataset.src);
    item.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const data = self.dataset.src;
      count = index;
      activeDot(count);
      activeBtn(count);
      introBody.style.backgroundImage = `url("${data}")`;
    });
  });

  btnPrev.addEventListener('click', prevSlide);

  btnNext.addEventListener('click', nextSlide);

  setInterval(nextSlide, 5000);
}

// Footer Sublist
const menuFooterItems = document.querySelectorAll('.menu-footer__item');
if (menuFooterItems.length > 0 && document.documentElement.offsetWidth <= 699.9) {
  menuFooterItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const self = e.currentTarget;
      // const menuLink = self.previousElementSibling;
      const sublist = self.querySelector('.sublist-footer');

      self.classList.toggle('_active');
      // menuLink.classList.toggle('_active');

      if (self.classList.contains('_active')) {
        sublist.style.maxHeight = sublist.scrollHeight + "px";
      } else {
        sublist.style.maxHeight = null;
      }
    });
  });
}
