// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import {
  freeze,
  unfreeze,
} from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-popup').fancybox({
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
  });

  $(document).on('click', '.js-popup-close', () => {
    $.fancybox.close();
  });
}
