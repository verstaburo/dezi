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
      } else if (container.length > 0 && $(el)[0].readyState !== 4 && wW >= breakpoints.md) {
        $(container).addClass('is-loading');
      } else if (container.length > 0 && $(el)[0].readyState === 4 && wW >= breakpoints.md) {
        $(container).removeClass('is-loading').addClass('is-loaded');
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
      } else {
        video.play();
        $(video).addClass('is-play');
        if ($(video)[0].readyState !== 4) {
          $(container).addClass('is-loading');
        } else {
          $(container).removeClass('is-loading').addClass('is-loaded');
        }
      }
    }
  });

  $('.js-video').on('waiting', (evt) => {
    const video = evt.currentTarget;
    const container = $(video).closest('[data-video-container]');
    $(container).removeClass('is-loaded').addClass('is-loading');
  });

  $('.js-video').on('playing', (evt) => {
    const video = evt.currentTarget;
    const container = $(video).closest('[data-video-container]');
    $(container).addClass('is-loaded').removeClass('is-loading');
  });

  $(window).on('resize', videoActivation);

  $(window).on('scroll', videoActivation);
}
