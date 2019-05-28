/* eslint-disable */
const $ = window.$;

function HeaderMenu(elem) {
  this.el = elem;
  this.isActive = false;
  this.burger = elem.querySelector('.js-show-menu');
  this.init = () => {
    const t = this;
    t.burger.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (t.isActive) {
        t.close();
      } else {
        t.open();
      }
    }, false);
  }
  this.open = () => {
    const t = this;
    t.isActive = true;
    $(t.el).addClass('is-open');
  };
  this.close = () => {
    const t = this;
    t.isActive = false;
    $(t.el).removeClass('is-open');
  };
  this.el.header = this;
}

export default function header() {
  $('.header').each((i, el) => {
    const header = new HeaderMenu(el);
    header.init();
  });
};
