/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';
import {
  TweenMax,
  TimelineMax,
  Power0,
  Power1,
} from 'gsap/TweenMax';

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

  function bgSliderF(el) {
    if (el.swiper === undefined) {
      if (wW > bp.lg) {
        const bgSlider = new Swiper(el, {
          loop: true,
          speed: 700,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          slidesPerView: 1,
          roundLengths: true,
          observer: true,
          observeParents: true,
          effect: 'flip',
          flipEffect: {
            rotate: 30,
            slideShadows: false,
          },
        });
      }
    } else if (wW <= bp.lg) {
      el.swiper.destroy();
    }
  }

  function bgSliderInit() {
    $('.js-bg-slider').each((i, el) => {
      bgSliderF(el);
    });
  }

  function leadSliderF(el) {
    const anim = new TimelineMax();
    const button = $(el).find('.slider-lead__button');
    const border = $(button).find('.slider-lead__border');
    anim
      .fromTo(border[0], 4, {
        strokeDashoffset: 540,
      }, {
        ease: Power1.easeInOut,
        strokeDashoffset: 0,
      }, 0);
    if (el.swiper === undefined) {
      if (wW > bp.lg) {
        const leadSlider = new Swiper(el, {
          loop: true,
          speed: 0,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            waitForTransition: false,
          },
          effect: 'fade',
          slidesPerView: 1,
          navigation: {
            nextEl: button,
          },
          roundLengths: true,
          on: {
            init() {
              anim.play(0);
            },
            update() {
              anim.play(0);
            },
            slideChange() {
              anim.play(0);
            },
          },
        });
      }
    } else if (wW <= bp.lg) {
      el.swiper.destroy();
    }
  }

  function leadSliderInit() {
    $('.js-slider-lead').each((i, el) => {
      leadSliderF(el);
    });
  }

  leadSliderInit();
  $(window).on('resize', leadSliderInit);
  bgSliderInit();
  $(window).on('resize', bgSliderInit);
}
/* eslint-enable no-unused-vars */
