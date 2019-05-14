/* eslint-disable */
const $ = window.$;

function HeaderMenu(elem) {
  this.el = elem;
  this.isActive = false;
  this.el.header = this;
  this.init = () => {
    const t = this;

  }
  this.open = () => {
    const t = this;
    t.isActive = true;
    t.el
  };
  this.close = () => {
    const t = this;
    t.isActive = false;
  };
}

export default function header() {

  $(window).scroll(function () {
    const w = $(this);

    if (w.scrollTop() > 0) {
      fixHeader();
    } else {
      unfixHeader();
    }
  });
};
