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
  createWatch();

  $(window).on('resize', () => {
    const wtch = document.getElementById('watch');
    if (wtch) {
      const watchEl = wtch.watch;
      watchEl.revert();
      $(wtch).removeClass('is-ready');
    }
    createWatch();
  });
}
