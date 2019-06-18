const $ = window.$;

export default function contacts() {
  $(document).on('click', '.js-open-map', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const map = $(self).closest('.contacts');
    const isOpen = $(map).is('.is-map-open');
    if (isOpen) {
      $(map).removeClass('is-map-open').addClass('is-map-close');
    } else {
      $(map).addClass('is-map-open').removeClass('is-map-close');
    }
  });

  $(document).on('click', '.js-close-map', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const map = $(self).closest('.contacts');
    $(map).removeClass('is-map-open').addClass('is-map-close');
  });
}
