export default class SvgSlider {
  constructor(el) {
    this.el = el;
    this.slides = this.el.querySelectorAll('[data-slide]');
    this.total = this.slides.length;
    this.current = 0;
    this.previous = ((this.current - 1) + this.total) % this.total;
    this.nxt = ((this.current + 1) + this.total) % this.total;
    this.isTransition = false;
    this.isEnd = false;
  }
  init() {
    const t = this;
    t.el.svgslider = t;
    const elSizes = t.el.getBoundingClientRect();
    const sT = window.pageYOffset;
    const elBottom = elSizes.bottom + sT;
    if (sT > elBottom) {
      t.slides[t.current].classList.remove('is-active');
      t.current = t.total - 1;
      t.previous = ((t.current - 1) + t.total) % t.total;
      t.nxt = ((t.current + 1) + t.total) % t.total;
      t.slides[t.current].classList.add('is-active');
    }
  }
  transition(n) {
    const t = this;
    t.isTransition = true;
    t.slides[t.current].classList.add('is-prev');
    t.slides[t.current].classList.remove('is-active');
    t.current = (n + t.total) % t.total;
    t.slides[t.current].classList.add('is-active');
    t.previous = ((t.current - 1) + t.total) % t.total;
    t.nxt = (t.current + 1 + t.total) % t.total;
    setTimeout(() => {
      t.isTransition = false;
      t.slides[t.nxt].classList.remove('is-prev');
      t.slides[t.previous].classList.remove('is-prev');
      if (t.nxt === 0 || t.previous === (t.total - 1)) {
        t.isEnd = true;
      }
    }, 600);
  }
  next() {
    const t = this;
    console.log('next');
    if (!t.isTransition) {
      t.transition(t.current + 1);
    }
  }
  prev() {
    const t = this;
    console.log('prev');
    if (!t.isTransition) {
      t.transition(t.current - 1);
    }
  }
}
