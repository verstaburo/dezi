const $ = window.$;

export default function bgvideo() {
  const breakpoints = window.globalOptions.sizes;

  function videoActivation() {
    // const wH = $(window).height();
    const wW = $(window).width();
    $('.js-video').each((i, el) => {
      // const wrapper = $(el).closest('[data-video-container]');
      // const top = $(wrapper).offset().top;
      // const vH = $(wrapper).outerHeight();
      // const bottom = top + vH;
      if (wW < breakpoints.md) {
        $(el).removeAttr('autoplay');
        $(el)[0].pause();
        // } else if (bottom <= 0 || top >= wH) {
        //   $(el)[0].pause();
      } else {
        $(el).attr('preload', 'auto');
        $(el).attr('autoplay', 'autoplay');
        $(el)[0].play();
      }
    });
  }

  videoActivation();

  $(window).on('resize', videoActivation);
}
