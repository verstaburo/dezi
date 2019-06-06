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

  function leadSliderF(el) {
    const anim = new TimelineMax();
    const button = $(el).find('.slider-lead__button');
    const border = $(button).find('.slider-lead__border');
    anim
      .fromTo(border[0], 4, {
        strokeDashoffset: 2000,
      }, {
        ease: Power1.easeInOut,
        strokeDashoffset: 0,
      });
    if (el.swiper === undefined) {
      if (wW > bp.md) {
        const leadSlider = new Swiper(el, {
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
            slideChangeTransitionStart() {
              anim.pause(4);
            },
            slideChangeTransitionEnd() {
              anim.play(0);
            },
            sliderMove() {
              anim.pause(4);
            },
          },
        });
      } else {
        el.swiper.destroy();
      }
    }
  }

  function leadSliderInit() {
    $('.js-slider-lead').each((i, el) => {
      leadSliderF(el);
    });
  }

  leadSliderInit();
  $(window).on('resize', leadSliderInit);
}
/* eslint-enable no-unused-vars */
