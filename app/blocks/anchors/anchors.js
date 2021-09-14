const { $ } = window;

export default function anchors() {
  $(document).on('click', '.js-section-anchor', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const link = $(self).attr('href').split('#').pop();
    const target = $(`[data-section="${link}"]`);
    if (target.length > 0) {
      $('body, html').stop().animate({
        scrollTop: target.offset().top,
      }, 1000, 'swing');
    }
  });
}
