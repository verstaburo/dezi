/* eslint-disable no-unused-vars */
// https://github.com/jlmakes/scrollreveal
import ScrollReveal from 'scrollreveal';

const $ = window.$;

export default function scrollanimation() {
  // Стандартные настройки
  const sr = ScrollReveal({
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

  if ($('.js-sr_1').length) {
    sr.reveal('.js-sr_1');
  }

  if ($('.js-sr_2').length) {
    sr.reveal('.js-sr_2', {
      delay: 100,
    });
  }

  if ($('.js-sr_3').length) {
    sr.reveal('.js-sr_3', {
      delay: 200,
    });
  }

  if ($('.js-sr_4').length) {
    sr.reveal('.js-sr_4', {
      delay: 300,
    });
  }

  if ($('.js-sr_5').length) {
    sr.reveal('.js-sr_5', {
      delay: 400,
    });
  }

  if ($('.js-sr_6').length) {
    sr.reveal('.js-sr_6', {
      origin: 'left',
    });
  }

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

  // Показываем элементы, если ScrollReveal не поддерживается
  if (!sr.isSupported()) {
    $(document).find('.js-sr').removeClass('.js-sr');
  }
}
/* eslint-enable no-unused-vars */
