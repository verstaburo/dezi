/* eslint-disable */
const $ = window.$;

export function fixHeader () {
  const header = $('.header');

  header.addClass('is-fixed');
}

export function unfixHeader () {
  const header = $('.header');

  header.removeClass('is-fixed');
}

export default function header() {

  $(window).scroll(function () {
    const w = $(this);

    if (w.scrollTop() > 0) {
      fixHeader();
    } else {
      unfixHeader();
    }
  });
};
