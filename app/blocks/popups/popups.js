// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';
import CanvasSlider2 from '../slider/CanvasSlider2';

import {
  freeze,
  unfreeze,
} from '../js-functions/freeze';

const { $ } = window;

export default function popups() {
  const bp = window.globalOptions.sizes;

  const fancyOpts = {
    afterLoad() {
      freeze();
      $(this.src).addClass('is-animate');
      $(this.src).find('.swiper-container').each((i, el) => {
        if (el.swiper !== undefined) {
          el.swiper.update();
          el.swiper.autoplay.start();
        }
      });
      $(this.src).find('.js-bg-slider').each((i, el) => {
        const wW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        window.globalFunctions.shaderSlider.stop();

        if (window.globalFunctions.shaderSlider && wW >= bp.md) {
          const images = el.querySelectorAll('img');
          const desk = el.querySelector('canvas');
          if (images) {
            CanvasSlider2(el, images, desk);
          }
          window.globalFunctions.shaderSlider.play();
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
      $(this.src).find('.js-bg-slider').each(() => {
        if (window.globalFunctions.shaderSlider) {
          window.globalFunctions.shaderSlider.stop();
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
  circle.style.transitionProperty = 'opacity, transform';
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
    if (morthObj.length > 0) {
      const tSz = $(morthObj)[0].getBoundingClientRect();
      const tY = tSz.top;
      const tX = tSz.left;
      const tW = tSz.width;
      const tH = tSz.height;
      const t = document.querySelector('.js-morth-circle');
      const scale = Math.max(window.innerHeight, window.innerWidth) / tW;
      if (t) {
        t.style.top = `${tY}px`;
        t.style.left = `${tX}px`;
        t.style.width = `${tW}px`;
        t.style.height = `${tH}px`;
        t.style.backgroundColor = popupBgColor;
        setTimeout(() => {
          t.style.opacity = 1;
          setTimeout(() => {
            t.style.transform = `scale(${2 * scale}) translateZ(0)`;
            if (!window.globalOptions.headerLight) {
              $('.header').addClass('header_light');
            }
            setTimeout(() => {
              $.fancybox.open({
                src: `#${src}`,
                type: 'inline',
                opts: fancyOpts,
              });
            }, 300);
          }, 50);
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
      t.style.transitionDelay = '0.4s, 0';
      setTimeout(() => {
        t.style.transform = 'scale(1) translateZ(0)';
        setTimeout(() => {
          t.style.opacity = 0;
        }, 50);
      }, 300);
    }
  });
}
