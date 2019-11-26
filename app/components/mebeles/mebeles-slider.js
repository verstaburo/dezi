// http://idangero.us/swiper/#.WcIu5oy0OHs
// import * as Swiper from 'swiper/dist/js/swiper';
/* eslint-disable no-unused-vars */
// import $ from 'jquery';
// import scrollify from 'jquery-scrollify';
import SvgSlider from './svgSlider';
import swipe from '../../blocks/js-functions/swipe';
import {
  freeze,
  unfreeze,
} from '../../blocks/js-functions/freeze';

const $ = window.$;

export default function mebelesSlider() {
  function sliderNavigation(slider, direction) {
    if (direction === 'up') {
      if (slider.isStart) {
        window.scrollState = 'MANUAL_SCROLL';
        unfreeze();
        return;
      }
      slider.prev();
    } else {
      if (slider.isEnd) {
        window.scrollState = 'MANUAL_SCROLL';
        unfreeze();
        return;
      }
      slider.next();
    }
  }
  const stopsection = document.querySelector('[data-stopscroll]');
  const wallTop = document.querySelector('[data-scrolly-top]');
  const wallBottom = document.querySelector('[data-scrolly-bottom]');
  window.scrollState = 'MANUAL_SCROLL';
  const screen = document.querySelector('[data-scrolly-window]');
  if (stopsection && wallTop && wallBottom && screen) {
    const slider = new SvgSlider(document.querySelector('[data-scrollsvg]'), document.querySelector('[data-scrolly-window]'));
    slider.init();
    window.lastScrollPosition = window.pageYOffset;
    $(window).on('scroll', () => {
      if (window.scrollState === 'MANUAL_SCROLL') {
        const sT = window.pageYOffset;
        const wH = window.innerHeight;
        const dir = (sT - window.lastScrollPosition) > 0 ? 'down' : 'up';
        window.lastScrollPosition = sT;
        const sWallT = wallTop.getBoundingClientRect();
        const sWallB = wallBottom.getBoundingClientRect();
        const bWT = sWallT.bottom + sT;
        const tWB = sWallB.top + sT;
        if (sT <= bWT && sT >= (bWT - (wH / 2)) && dir === 'down') {
          window.scrollState = 'AUTO_SCROLL';
          $('body, html').stop().animate({
            scrollTop: bWT,
          }, 300, 'swing', () => {
            window.scrollState = 'NO_SCROLL';
            freeze();
          });
        }
        if (sT >= tWB && sT < (tWB + (wH / 2)) && dir === 'up') {
          window.scrollState = 'AUTO_SCROLL';
          $('body, html').stop().animate({
            scrollTop: bWT,
          }, 300, 'swing', () => {
            window.scrollState = 'NO_SCROLL';
            freeze();
          });
        }
      }
    });

    document.addEventListener('mousewheel', (evt) => {
      if (window.scrollState === 'AUTO_SCROLL') {
        evt.preventDefault();
      }
      if (window.scrollState === 'NO_SCROLL') {
        evt.preventDefault();
        const direction = evt.deltaY < 0 ? 'up' : 'down';
        sliderNavigation(slider, direction);
      }
    }, false);

    swipe(screen);
    screen.addEventListener('swipe', (evt) => {
      const direction = evt.detail.dir === 'up' ? 'down' : 'up';
      if (window.scrollState === 'NO_SCROLL') {
        sliderNavigation(slider, direction);
      }
    });
  }
}
/* eslint-enable no-unused-vars */
