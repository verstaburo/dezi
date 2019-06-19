// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import {
  freeze,
  unfreeze,
} from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  // $('.js-popup').fancybox({
  //   afterLoad() {
  //     if (!window.globalOptions.headerLight) {
  //       $('.header').addClass('header_light');
  //     }
  //     freeze();
  //     $(this.src).addClass('is-animate');
  //     $(this.src).find('.swiper-container').each((i, el) => {
  //       if (el.swiper !== undefined) {
  //         el.swiper.update();
  //         el.swiper.autoplay.start();
  //       }
  //     });
  //   },
  //   afterClose() {
  //     if (!window.globalOptions.headerLight) {
  //       $('.header').removeClass('header_light');
  //     }
  //     unfreeze();
  //     $(this.src).removeClass('is-animate');
  //     $(this.src).find('.swiper-container').each((i, el) => {
  //       if (el.swiper !== undefined) {
  //         el.swiper.update();
  //         el.swiper.autoplay.stop();
  //       }
  //     });
  //   },
  //   smallBtn: false,
  //   buttons: [],
  //   autoFocus: false,
  //   touch: false,
  //   animationEffect: false,
  // });

  const fancyOpts = {
    afterLoad() {
      if (!window.globalOptions.headerLight) {
        $('.header').addClass('header_light');
      }
      freeze();
      $(this.src).addClass('is-animate');
      $(this.src).find('.swiper-container').each((i, el) => {
        if (el.swiper !== undefined) {
          el.swiper.update();
          el.swiper.autoplay.start();
        }
      });
    },
    afterClose() {
      if (!window.globalOptions.headerLight) {
        $('.header').removeClass('header_light');
      }
      unfreeze();
      $(this.src).removeClass('is-animate');
      $(this.src).find('.swiper-container').each((i, el) => {
        if (el.swiper !== undefined) {
          el.swiper.update();
          el.swiper.autoplay.stop();
        }
      });
    },
    smallBtn: false,
    buttons: [],
    autoFocus: false,
    touch: false,
    animationDuration: 300,
  };

  const circle = document.createElement('div');
  circle.classList.add('js-morth-circle');
  circle.style.position = 'fixed';
  circle.style.display = 'block';
  circle.style.top = '0px';
  circle.style.left = '0px';
  circle.style.width = '10px';
  circle.style.height = '10px';
  circle.style.borderRadius = '50%';
  circle.style.backgroundColor = 'transparent';
  circle.style.pointerEvents = 'none';
  circle.style.opacity = 0;
  circle.style.transitionDuration = '0.3s';
  circle.style.transitionProperty = 'all';
  circle.style.transitionTimingFunction = 'ease';
  circle.style.transformOrigin = '50% 50% 0';
  circle.style.zIndex = 100;
  $('body').append(circle);

  $(document).on('click', '.js-popup', (evt) => {
    const self = evt.currentTarget;
    const src = $(self).attr('href').split('#').pop();
    const morthObj = $(self).find('[data-morphing]');
    const popup = $(`#${src}`)[0];
    const popupBgColor = window.getComputedStyle(popup).backgroundColor;
    console.log(popupBgColor);
    if (morthObj.length > 0) {
      const tY = $(morthObj).offset().top;
      const tX = $(morthObj).offset().left;
      const tW = $(morthObj).outerWidth();
      const tH = $(morthObj).outerHeight();
      const t = document.querySelector('.js-morth-circle');
      const scale = Math.max(window.innerHeight, window.innerWidth) / tW;
      console.log(t);
      if (t) {
        t.style.top = `${tY}px`;
        t.style.left = `${tX}px`;
        t.style.width = `${tW}px`;
        t.style.height = `${tH}px`;
        t.style.backgroundColor = popupBgColor;
        setTimeout(() => {
          t.style.opacity = 1;
          t.style.transform = `scale(${2 * scale}) translateZ(0)`;
          setTimeout(() => {
            $.fancybox.open({
              src: `#${src}`,
              type: 'inline',
              opts: fancyOpts,
            });
          }, 300);
        }, 50);
      }
    } else {
      $.fancybox.open({
        src: `#${src}`,
        type: 'inline',
        opts: fancyOpts,
      });
    }
  });

  $(document).on('click', '.js-popup-close', () => {
    const t = document.querySelector('.js-morth-circle');
    $.fancybox.close();
    if (t) {
      setTimeout(() => {
        t.style.opacity = 0;
        t.style.transform = 'scale(1) translateZ(0)';
      }, 300);
    }
  });
}
