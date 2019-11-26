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
      } else {
        slider.prev();
      }
    } else if (slider.isEnd) {
      window.scrollState = 'MANUAL_SCROLL';
      unfreeze();
    } else {
      slider.next();
    }
  }
  const stopsection = document.querySelector('[data-stopscroll]');
  const wallTop = document.querySelector('[data-scrolly-top]');
  const wallBottom = document.querySelector('[data-scrolly-bottom]');
  window.scrollState = 'MANUAL_SCROLL';
  const screen = document.querySelector('[data-scrolly-window]');
  const slider = new SvgSlider(document.querySelector('[data-scrollsvg]'), document.querySelector('[data-scrolly-window]'));
  slider.init();
  if (stopsection && wallTop && wallBottom && screen) {
    window.lastScrollPosition = window.pageYOffset;
    $(window).on('scroll', () => {
      if (window.scrollState === 'MANUAL_SCROLL') {
        const sT = window.pageYOffset;
        const wH = window.innerHeight;
        const dir = (sT - window.lastScrollPosition) > 0 ? 'down' : 'up';
        window.lastScrollPosition = sT;
        const sStop = stopsection.getBoundingClientRect();
        const sWallT = wallTop.getBoundingClientRect();
        const sWallB = wallBottom.getBoundingClientRect();
        const sST = sStop.top + sT;
        const sSB = sStop.bottom + sT;
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
      console.log(evt.deltaY);
      if (window.scrollState === 'AUTO_SCROLL') {
        evt.preventDefault();
      }
      if (window.scrollState === 'NO_SCROLL') {
        console.log(`End? ${slider.isEnd} Or Start? ${slider.isStart}`);
        evt.preventDefault();
        const direction = evt.deltaY < 0 ? 'up' : 'down';
        sliderNavigation(slider, direction);
        // if (evt.deltaY < 0) {
        //   if (slider.isStart) {
        //     window.scrollState = 'MANUAL_SCROLL';
        //     unfreeze();
        //   } else {
        //     slider.prev();
        //   }
        // } else if (slider.isEnd) {
        //   window.scrollState = 'MANUAL_SCROLL';
        //   unfreeze();
        // } else {
        //   slider.next();
        // }
      }
    }, false);

    swipe(screen);
    screen.addEventListener('swipe', (evt) => {
      console.log('swipe');
      console.log(evt.detail.dir);
      const direction = evt.detail.dir;
      sliderNavigation(slider, evt.detail.dir);
    });
    // const slider = new SvgSlider(document.querySelector('[data-scrollsvg]'));
    // slider.init();

    // $.scrollify({
    //   section: '[data-scrolly-section]',
    //   scrollSpeed: 100,
    //   standardScrollElements: '[data-scrolly-simple]',
    //   setHeights: false,
    //   updateHash: false,
    //   afterRender() {
    //     window.mebelesBefore = $.scrollify.currentIndex();
    //   },
    //   before(i, sections) {
    //     const current = i;
    //     const direction = (current - window.mebelesBefore) > 0 ? 'down' : 'up';
    //     console.log('after');
    //     console.log(i);
    //     console.log(sections[i]);
    //     console.log(direction);
    //     if (sections[i].is('[data-scrolly-slide]')) {
    //       if (direction === 'down') {
    //         slider.next();
    //       } else {
    //         slider.prev();
    //       }
    //     }
    //     window.mebelesBefore = current;
    //   },
    // });
  }
  // const stopsection = document.querySelector('[data-stopscroll]');
  // window.mebel = {};
  // window.mebel.stopScroll = false;
  // window.mebel.scrollPosition = window.pageYOffset;

  // if (stopsection) {
  //   const slider = new SvgSlider(document.querySelector('[data-scrollsvg]'));
  //   slider.init();

  //   $(window).on('scroll', () => {
  //     console.log('scroll');
  //     const sT = window.pageYOffset;
  //     const wH = window.innerHeight;
  //     const ssSizes = stopsection.getBoundingClientRect();
  //     const t = ssSizes.top;
  //     const b = ssSizes.bottom;
  //     const direction = sT - window.scrollPosition > 0 ? 'down' : 'up';
  //     window.scrollPosition = sT;
  //     const top = ssSizes.top + sT;
  //     const bottom = ssSizes.bottom + sT;
  //     console.log(`b: ${b}, sT: ${sT}, top: ${top}, bottom: ${bottom}`);
  //     if (direction === 'down') {
  //       if (t > -100 && t <= 0) {
  //         if (!slider.isEnd) {
  //           stopsection.scrollIntoView(true);
  //           window.mebel.stopScroll = true;
  //           freeze();
  //         }
  //       } else if (sT > bottom) {
  //         slider.isEnd = false;
  //       }
  //     } else if (b > (wH - 100) && b <= wH) {
  //       if (!slider.isEnd) {
  //         stopsection.scrollIntoView(true);
  //         window.mebel.stopScroll = true;
  //         freeze();
  //       } else if (sT < top) {
  //         slider.isEnd = false;
  //       }
  //     }
  //   });

  //   window.addEventListener('mousewheel', (evt) => {
  //     console.log(slider.isEnd);
  //     const dir = evt.deltaY;
  //     if (slider.isEnd) {
  //       window.mebel.stopScroll = false;
  //       unfreeze();
  //     }
  //     if (window.mebel.stopScroll) {
  //       if (dir > 0) {
  //         slider.next();
  //       } else {
  //         slider.prev();
  //       }
  //     }
  //   });
  // }
}
/* eslint-enable no-unused-vars */
