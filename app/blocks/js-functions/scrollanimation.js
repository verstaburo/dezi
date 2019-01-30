/* eslint-disable no-unused-vars */
// https://github.com/jlmakes/scrollreveal
import ScrollReveal from 'scrollreveal';

const $ = window.$;

export default function scrollanimation() {
  // Стандартные настройки
  /* const sr = ScrollReveal({
    origin: 'bottom',
    reset: false,
    mobile: false,
    scale: 1,
    delay: 0,
    easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
    duration: 1000,
    distance: '50px',
    cleanup: true,
  });

  function makeSr(el, options) {
    if ($(el).length) {
      $(el).each(function () {
        sr.reveal($(this), options);
      });
    }
  }

  function makeRepeatSr(el, options) {
    if ($(el).length) {
      let myDelay = 0;

      $(el).each(function () {
        sr.reveal($(this), options);
      });

      myDelay += 50;
    }
  }

  makeSr('.js-sr_1', {});
  makeSr('.js-sr_2', { delay: 100 });
  makeSr('.js-sr_3', { delay: 200 });
  makeSr('.js-sr_4', { delay: 300 });
  makeSr('.js-sr_5', { delay: 400 });
  makeSr('.js-sr_6', { origin: 'left' });

  if ($('.js-sr_7').length) {
    let myDelay = 0;

    $('.js-sr_7').each(function () {
      sr.reveal($(this), {
        delay: myDelay,
        distance: '0px',
        scale: 0.9,
      });

      myDelay += 50;
    });
  }

  if ($('.js-sr_8').length) {
    let myDelay = 0;

    $('.js-sr_8').each(function () {
      sr.reveal($(this), {
        delay: myDelay,
        distance: '50px',
      });

      myDelay += 50;
    });
  }

  if ($('.js-sr_9').length) {
    let myDelay = 0;

    $('.js-sr_9').each(function () {
      sr.reveal($(this), {
        delay: myDelay,
        distance: '0px',
        scale: 0.9,
      });

      myDelay += 50;
    });
  }

  // Показываем элементы, если ScrollReveal не поддерживается
  if (!sr.isSupported()) {
    $(document).find('.js-sr').removeClass('.js-sr');
  } */

  $(document).find('.js-sr').removeClass('js-sr');
}
/* eslint-enable no-unused-vars */
