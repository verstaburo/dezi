// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';
// import SvgSlider from './svgSlider';
import {
  // freeze,
  unfreeze,
} from '../../blocks/js-functions/freeze';

// const $ = window.$;

export default function mebelesSlider() {
  const stopsection = document.querySelector('[data-stopscroll]');
  if (stopsection) {
    const sz = stopsection.getBoundingClientRect();
    const sT = window.pageYOffset;
    const elBottom = sz.bottom + sT;
    let start = 0;
    if (sT > elBottom) {
      start = stopsection.querySelectorAll('[data-slide]').length - 1;
      stopsection.classList.add('is-toup');
    } else {
      stopsection.classList.add('is-todown');
    }
    const slider = new Swiper(stopsection, {
      direction: 'vertical',
      speed: 300,
      initialSlide: start,
      effect: 'fade',
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      mousewheel: {
        releaseOnEdges: true,
        // invert: true,
      },
      slideClass: 'mebeles-slider__slide',
      slideActiveClass: 'is-active',
      slideNextClass: 'is-next',
      slidePrevClass: 'is-prev',
      on: {
        slideNextTransitionStart() {
          const sw = this;
          const el = sw.el;
          el.classList.remove('is-toup');
          el.classList.add('is-todown');
        },
        slidePrevTransitionStart() {
          const sw = this;
          const el = sw.el;
          el.classList.remove('is-todown');
          el.classList.add('is-toup');
        },
        reachEnd() {
          console.log('end');
          const sw = this;
          const el = sw.el;
          unfreeze();
          setTimeout(() => {
            el.classList.remove('is-todown');
            el.classList.add('is-toup');
          }, 600);
        },
        reachBeginning() {
          console.log('start');
          const sw = this;
          const el = sw.el;
          unfreeze();
          setTimeout(() => {
            el.classList.remove('is-toup');
            el.classList.add('is-todown');
          }, 600);
        },
      },
    });
    console.log(slider);

    // $(window).on('scroll', () => {
    //   const sT = window.pageYOffset;
    //   const wH = window.innerHeight;
    //   const ssSizes = stopsection.getBoundingClientRect();
    //   const t = ssSizes.top;
    //   const b = ssSizes.bottom;
    //   const direction = sT - window.scrollPosition > 0 ? 'down' : 'up';
    //   window.scrollPosition = sT;
    //   const top = ssSizes.top + sT;
    //   const bottom = ssSizes.bottom + sT;
    //   console.log(direction);
    //   console.log(`t: ${t}, b: ${b}, sT: ${sT}, top: ${top}, bottom: ${bottom}`);
    //   if (t <= 0 && b <= wH) {
    //     stopsection.scrollIntoView(true);
    //     if ((slider.isBeginning && direction === 'down')
    //  || (slider.isEnd && direction === 'up')) {
    //       freeze();
    //     } else {
    //       unfreeze();
    //     }
    //   } else {
    //     unfreeze();
    //   }
    //   // if (direction === 'down' && (t > (-1 * wH) && t < (wH / 2))) {
    //   //   stopsection.scrollIntoView(true);
    //   //   if (slider.isBeginning) {
    //   //     console.log('freeze down');
    //   //     freeze();
    //   //   }
    //   // } else if (direction === 'up' && (b < wH && b > (-0.5 * wH))) {
    //   //   stopsection.scrollIntoView(true);
    //   //   if (slider.isEnd) {
    //   //     console.log('freeze up');
    //   //     freeze();
    //   //   }
    //   // }
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
