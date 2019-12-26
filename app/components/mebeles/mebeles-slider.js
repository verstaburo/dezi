/* eslint-disable no-unused-vars */

const $ = window.$;

export default function mebelesSlider() {
  $(window).on('scroll', (evt) => {
    const sT = $(window).scrollTop();
    const screen = $('[data-scrolly-window]');
    if (screen.lenght > 0) {
      const scrTop = $(screen).offset().top;
      const scrHeight = $(screen).height();
      const scrPart = scrHeight / 4;
      const marker1 = scrPart + scrTop;
      const marker2 = marker1 + scrPart;
      const marker3 = scrTop + scrHeight;
      const slide1 = $('[data-slide="1"] .clip-path');
      const slide2 = $('[data-slide="2"] .clip-path');
      const slide3 = $('[data-slide="3"] .clip-path');
      if (sT >= scrTop && sT < marker1) {
        $(slide1).css('transform', `scale(${1.5 * ((sT - scrTop) / scrPart)})`);
        $(slide2).css('transform', 'scale(0)');
        $(slide3).css('transform', 'scale(0)');
      } else if (sT >= marker1 && sT < marker2) {
        $(slide1).css('transform', 'scale(1.5)');
        $(slide2).css('transform', `scale(${1.5 * ((sT - marker1) / scrPart)})`);
        $(slide3).css('transform', 'scale(0)');
      } else if (sT >= marker2 && sT < marker3) {
        $(slide1).css('transform', 'scale(1.5)');
        $(slide2).css('transform', 'scale(1.5)');
        $(slide3).css('transform', `scale(${1.5 * ((sT - marker2) / scrPart)})`);
      } else if (sT < scrTop) {
        $(slide1).css('transform', 'scale(0)');
        $(slide2).css('transform', 'scale(0)');
        $(slide3).css('transform', 'scale(0)');
      } else {
        $(slide1).css('transform', 'scale(1.5)');
        $(slide2).css('transform', 'scale(1.5)');
        $(slide3).css('transform', 'scale(1.5)');
      }
    }
  });
}
/* eslint-enable no-unused-vars */
