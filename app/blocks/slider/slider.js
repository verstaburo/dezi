/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  const wW = $(window).width();
  const bp = window.globalOptions.sizes;
  const mySlider = new Swiper('.js-slider', {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 2000,
    },
    slidesPerView: 1,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
    roundLengths: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
    },
  });

  if ($('.js-slider-lead').length > 0) {
    const button = $('.js-slider-lead').find('.slider-lead__button');
    const leadSlider = new Swiper('.js-slider-lead', {
      loop: true,
      speed: 500,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: '.slider-lead__button',
      },
      roundLengths: true,
      on: {
        init() {
          $(button).addClass('is-animated');
        },
        slideChange() {
          $(button).removeClass('is-animated');
          setTimeout(() => {
            $(button).addClass('is-animated');
          }, 500);
        },
        sliderMove() {
          $(button).removeClass('is-animated');
        },
      },
    });
  }
}
/* eslint-enable no-unused-vars */
