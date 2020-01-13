const $ = window.$;

export default function bgvideo() {
  const breakpoints = window.globalOptions.sizes;

  function videoActivation() {
    const sT = $(window).scrollTop();
    const wW = $(window).width();
    const wH = $(window).height();
    $('.js-video').each((i, el) => {
      if (wW < breakpoints.md) {
        $(el).removeAttr('autoplay');
        $(el)[0].pause();
      } else {
        const top = $(el).offset().top;
        const vH = $(el).outerHeight();
        const bottom = top + vH;
        $(el).attr('preload', 'auto');
        $(el).attr('autoplay', 'autoplay');
        if ((bottom >= sT && bottom <= (sT + wH)) || (top >= sT && (top <= (sT + wH)))) {
          $(el)[0].play();
        } else {
          $(el)[0].pause();
        }
      }
    });
  }

  videoActivation();

  $(window).on('resize', videoActivation);

  $(window).on('scroll', videoActivation);
}
