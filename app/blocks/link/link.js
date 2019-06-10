const $ = window.$;

export default function link() {
  $(document).on('mouseenter', '.link', (evt) => {
    const self = evt.currentTarget;
    $(self).addClass('is-mouse-in').removeClass('is-mouse-out');
  });

  $(document).on('mouseleave', '.link', (evt) => {
    const self = evt.currentTarget;
    $(self).addClass('is-mouse-out').removeClass('is-mouse-in');
  });
}
