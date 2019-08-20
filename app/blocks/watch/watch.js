/* eslint-disable no-restricted-syntax */
import ResizeObserver from 'resize-observer-polyfill';
import seeThru from 'seethru';

const $ = window.$;

export default function watch() {
  function getSizesForVideo() {
    const watchBase = $('[data-watch-base]');
    const videoW = $(watchBase).outerWidth(true) + 1;
    const videoH = $(watchBase).outerHeight(true) + 1;
    return {
      x: videoW,
      y: videoH,
    };
  }

  function createWatch() {
    const wtch = document.getElementById('watch');
    if (wtch) {
      const param = getSizesForVideo();
      const watchEl = seeThru.create('#watch', {
        width: param.x,
        height: param.y,
      }).ready((inst, video) => {
        $(video).addClass('is-ready');
      });
      wtch.watch = watchEl;
    }
  }

  function setObserversForWatch() {
    const targets = document.querySelectorAll('[data-watch-base]');
    const tarLen = targets.length;

    if (tarLen) {
      for (let i = 0; i < tarLen; i += 1) {
        const watchSizes = new ResizeObserver(() => {
          const wtch = document.getElementById('watch');
          if (wtch) {
            const watchEl = wtch.watch;
            watchEl.revert();
            $(wtch).removeClass('is-ready');
          }
          createWatch();
        });

        watchSizes.observe(targets[i]);
      }
    }
  }

  function initWatch() {
    createWatch();
    setObserversForWatch();
  }

  initWatch();
  // $(window).on('resize', () => {
  //   const wtch = document.getElementById('watch');
  //   if (wtch) {
  //     const watchEl = wtch.watch;
  //     watchEl.revert();
  //     $(wtch).removeClass('is-ready');
  //   }
  //   createWatch();
  // });
}
/* eslint-enable no-restricted-syntax */
