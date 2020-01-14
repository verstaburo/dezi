const $ = window.$;

export default function bgvideo() {
  const breakpoints = window.globalOptions.sizes;

  function videoActivation() {
    const sT = $(window).scrollTop();
    const wW = $(window).width();
    const wH = $(window).height();
    $('.js-video').each((i, el) => {
      const container = $(el).closest('[data-video-container]');
      if (container.length === 0 || ($(container).hasClass('is-loaded') && wW >= breakpoints.md)) {
        if (wW < breakpoints.md) {
          $(el).removeAttr('autoplay');
          $(el)[0].pause();
          $(el).removeClass('is-play');
        } else {
          const top = $(el).offset().top;
          const vH = $(el).outerHeight();
          const bottom = top + vH;
          $(el).attr('preload', 'auto');
          $(el).attr('autoplay', 'autoplay');
          if ((bottom >= sT && bottom <= (sT + wH)) || (top >= sT && (top <= (sT + wH)))) {
            $(el)[0].play();
            $(el).addClass('is-play');
          } else {
            $(el)[0].pause();
            $(el).removeClass('is-play');
          }
        }
      } else if (container.length > 0 && $(el)[0].readyState !== 4) {
        if (wW >= breakpoints.md) {
          $(container).addClass('is-loading');
        } else if ($(el).hasClass('is-play')) {
          $(container).addClass('is-loading');
        }
      } else if (container.length > 0 && $(el)[0].readyState === 4) {
        if (wW >= breakpoints.md) {
          $(container).removeClass('is-loading').addClass('is-loaded');
        } else if ($(el).hasClass('is-play')) {
          $(container).removeClass('is-loading').addClass('is-loaded');
          $(el)[0].play();
        }
      }
    });
  }

  videoActivation();

  $('.js-video').on('canplaythrough', (evt) => {
    const self = evt.currentTarget;
    const wrapper = $(self).closest('[data-video-container]');
    if (wrapper.length > 0) {
      $(wrapper).removeClass('is-loading');
      $(wrapper).addClass('is-loaded');
      videoActivation();
    }
  });

  $(document).on('click', '.js-video', (evt) => {
    const video = evt.currentTarget;
    const wW = $(window).width();
    const container = $(video).closest('[data-video-container]');
    if (wW < breakpoints.md) {
      if ($(video).hasClass('is-play')) {
        $(video).removeClass('is-play');
        video.pause();
      } else if ($(video)[0].readyState !== 4) {
        $(container).addClass('is-loading');
        // video.play();
        $(video).addClass('is-play');
      } else {
        $(container).removeClass('is-loading').addClass('is-loaded');
        video.play();
        $(video).addClass('is-play');
      }
    }
  });

  $(window).on('resize', videoActivation);

  $(window).on('scroll', videoActivation);
}
