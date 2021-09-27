import isTouchDevice from 'is-touch-device';

const { $ } = window;

export default function contacts() {
  function removeMouse(callback) {
    const mouse = $('.js-mouse')[0];
    $(mouse).addClass('is-animate');
    setTimeout(() => {
      $(mouse).removeClass('is-animate');
      if (callback) {
        callback();
      }
      mouse.style.opacity = '';
    }, 300);
  }

  $(document).on('click', '.js-open-map', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const map = $(self).closest('.contacts');
    const isOpen = $(map).is('.is-map-open');
    if (isOpen) {
      removeMouse(() => {
        $(map).removeClass('is-map-open').addClass('is-map-close');
        if (!window.globalOptions.headerLight) {
          $('.header').removeClass('header_light');
        }
      });
    } else {
      $(map).addClass('is-map-open').removeClass('is-map-close');
      if (!window.globalOptions.headerLight) {
        $('.header').addClass('header_light');
      }
    }
  });

  $(document).on('click', '.js-close-map', (evt) => {
    if (!isTouchDevice()) {
      const source = evt.target;
      const self = evt.currentTarget;
      if (!($(source).is('.js-ignore-map') || $(source).closest('.js-ignore-map').length > 0)) {
        evt.preventDefault();
        const map = $(self).closest('.contacts');
        removeMouse(() => {
          $(map).removeClass('is-map-open').addClass('is-map-close');
          if (!window.globalOptions.headerLight) {
            $('.header').removeClass('header_light');
          }
        });
      }
    }
  });

  $(document).on('touchstart', '.js-close-map', (evt) => {
    if (isTouchDevice()) {
      const source = evt.target;
      const self = evt.currentTarget;
      if (!($(source).is('.js-ignore-map') || $(source).closest('.js-ignore-map').length > 0)) {
        const map = $(self).closest('.contacts');
        removeMouse(() => {
          $(map).removeClass('is-map-open').addClass('is-map-close');
          if (!window.globalOptions.headerLight) {
            $('.header').removeClass('header_light');
          }
        });
      }
    }
  });

  $(document).on('mousemove', '.contacts__bottom', (evt) => {
    const source = evt.target;
    const mouse = $('.js-mouse')[0];
    if ($(source).is('.js-ignore-map') || $(source).closest('.js-ignore-map').length > 0) {
      mouse.style.opacity = '';
    } else if (mouse) {
      mouse.style.opacity = 1;
      let evtX = evt.clientX;
      let evtY = evt.clientY;
      if (evt.touches !== undefined) {
        evtX = evt.touches[0].clientX;
        evtY = evt.touches[0].clientY;
      }
      const x = evtX - 15;
      const y = evtY - 15;
      mouse.style.left = `${x}px`;
      mouse.style.top = `${y}px`;
    }
  });

  $(document).on('mouseleave', '.contacts__bottom', () => {
    const mouse = $('.js-mouse')[0];
    if (mouse) {
      mouse.style.opacity = '';
    }
  });
}
