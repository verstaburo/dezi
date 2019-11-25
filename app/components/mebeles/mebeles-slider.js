// http://idangero.us/swiper/#.WcIu5oy0OHs
// import * as Swiper from 'swiper/dist/js/swiper';
/* eslint-disable no-unused-vars */
import $ from 'jquery';
import scrollify from 'jquery-scrollify';
import SvgSlider from './svgSlider';
import {
  // freeze,
  // unfreeze,
} from '../../blocks/js-functions/freeze';

// const $ = window.$;

export default function mebelesSlider() {
  const stopsection = document.querySelector('[data-stopscroll]');
  if (stopsection) {
    const slider = new SvgSlider(document.querySelector('[data-scrollsvg]'));
    slider.init();

    $.scrollify({
      section: '[data-scrolly-section]',
      scrollSpeed: 600,
      standardScrollElements: '[data-scrolly-simple]',
      setHeights: false,
      updateHash: false,
      afterRender() {
        window.mebelesBefore = $.scrollify.currentIndex();
      },
      before(i, sections) {
        const current = i;
        const direction = (current - window.mebelesBefore) > 0 ? 'down' : 'up';
        console.log('after');
        console.log(i);
        console.log(sections[i]);
        console.log(direction);
        if (sections[i].is('[data-scrolly-slide]')) {
          if (direction === 'down') {
            slider.next();
          } else {
            slider.prev();
          }
        }
        window.mebelesBefore = current;
      },
    });
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
