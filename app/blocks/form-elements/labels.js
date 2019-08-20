const $ = window.$;

export default function iniLabels() {
  function initLabels(labels) {
    const targets = labels || document.querySelectorAll('.inputbox input, .inputbox textarea');
    for (let i = 0; i < targets.length; i += 1) {
      const item = targets[i];
      item.addEventListener('animationstart', (evt) => {
        const self = evt.target;
        $(self).closest('.inputbox').addClass('is-top');
      }, true);
      item.addEventListener('focus', (evt) => {
        const self = evt.target;
        if ($(self).siblings('input').length === 0) {
          $(self).closest('.inputbox').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
        } else if ($(self).siblings('input')[0].value.length === 0) {
          $(self).closest('.inputbox').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
        }
      }, true);
      item.addEventListener('blur', (evt) => {
        const self = evt.target;
        if ($(self).siblings('input').length === 0) {
          $(self).closest('.inputbox').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
        } else if ($(self).siblings('input')[0].value.length === 0) {
          $(self).closest('.inputbox').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
        }
      }, true);
      item.addEventListener('input', (evt) => {
        const self = evt.target;
        if ($(self).siblings('input').length === 0) {
          $(self).closest('.inputbox').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
        } else if ($(self).siblings('input')[0].value.length === 0) {
          $(self).closest('.inputbox').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
        }
      }, true);
    }
  }

  initLabels();
}
