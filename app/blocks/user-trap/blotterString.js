// /* eslint-disable */
const $ = window.$;
const Blotter = window.Blotter;

function a(a1, b1, c1, d1) {
  const e = 180 * (Math.atan2(d1 - b1, c1 - a1) / Math.PI);
  return (180 + e);
}

function b(a1, b1, c1, d1) {
  const e = a1 - c1;
  const f = b1 - d1;
  return Math.sqrt((e * e) + (f * f));
}

export default class BlotterString {
  constructor(source, container) {
    this.el = source;
    this.container = container;
    this.fontSizes = {
      md: 25,
      lg: 60,
      xl: 100,
      xxl: 100,
    };
    this.onRender = this.onRender.bind(this);
    this.getOption = this.getOption.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    this._setListeners = this._setListeners.bind(this);
    this._prepareBlotter = this._prepareBlotter.bind(this);
    this._blotterTexts = this._blotterTexts.bind(this);
    this._handleMousemove = this._handleMousemove.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleNewCenter = this._handleNewCenter.bind(this);
    this._setInitialCenter = this._setInitialCenter.bind(this);
    this.update = this.update.bind(this);
    this._prepareBlotter();
    this.el.textEffect = this;
  }
  _setListeners() {
    const t = this;
    $(document).on('mousemove', t._handleMousemove);
    $(document).on('touchmove', t._handleTouchMove);
    $(window).on('resize', t.update);
  }
  onRender() {
    const t = this;
    t.blotter.on('ready', () => {
      t._setListeners();
      $.each(t.scopes, (i, scope) => {
        $(t.container).append(scope.domElement);
      });
      t._setInitialCenter();
    });
  }
  onDestroy() {
    const t = this;
    t.blotter.stop();
    $(t.container).empty();
  }
  getOption() {
    const t = this;
    const wW = $(window).width();
    const sizes = t.fontSizes;
    let siteWidth = 1920;
    let fontSize = sizes.xxl;
    let scale = 1;
    if (wW < 768) {
      siteWidth = 320;
      fontSize = sizes.md;
    } else if (wW >= 768 && wW < 1025) {
      siteWidth = 1024;
      fontSize = sizes.lg;
    } else if (wW >= 1025 && wW < 1367) {
      siteWidth = 1366;
      fontSize = sizes.xl;
    }
    scale = wW / siteWidth;
    const finalSize = scale * fontSize;
    const option = {
      family: '"ProximaNova", Arial, sans-serif',
      size: finalSize,
      weight: 700,
      fill: '#000000',
      paddingLeft: finalSize,
      paddingRight: finalSize,
    };
    return option;
  }
  _prepareBlotter() {
    const t = this;
    t.blotterTexts = t._blotterTexts();
    t.material = new Blotter.ChannelSplitMaterial();
    t.material.needsUpdate = true;
    t.blotter = new Blotter(t.material, {
      texts: t.blotterTexts,
      autobild: false,
    });
    t.blotter.needsUpdate = true;
    t.scopes = $.map(t.blotterTexts, (txt) => {
      const scope = t.blotter.forText(txt);
      return scope;
    });
    t.onRender();
  }
  _blotterTexts() {
    const t = this;
    const texts = [];
    $(t.el).find('.user-trap__string').each((i, el) => {
      const text = new Blotter.Text($(el).text(), t.getOption());
      texts.push(text);
    });
    return texts;
  }
  _setInitialCenter() {
    const t = this;
    const dW = $(t.container).width();
    const dH = $(t.container).height();
    const c = $(t.el).width();
    const d = $(t.el).height();
    const examplePosition = $(t.el).offset();
    const exX = (examplePosition.left + (c / 2)) / dW;
    const exY = (examplePosition.top + (d / 2)) / dH;
    t._handleNewCenter(exX, exY);
  }
  _handleMousemove(evt) {
    const t = this;
    const dW = $(t.container).width();
    const dH = $(t.container).height();
    const d = evt.pageX / dW;
    const e = evt.pageY / dH;
    t._handleNewCenter(d, e);
  }
  _handleTouchMove(evt) {
    const t = this;
    const dW = $(t.container).width();
    const dH = $(t.container).height();
    const d = evt.originalEvent.touches[0].pageX / dW;
    const e = evt.originalEvent.touches[0].pageY / dH;
    t._handleNewCenter(d, e);
  }
  _handleNewCenter(x, y) {
    const t = this;
    const e = $(t.container).width();
    const f = $(t.container).height();
    $.each(t.scopes, (ix, g) => {
      const el = g;
      const h = $(g.domElement);
      const i = h.offset();
      const j = (i.left + (h.width() / 2)) / e;
      const k = (i.top + (h.height() / 2)) / f;
      const l = a(j, k, x, y);
      const m = Math.min(0.2, b(j, k, x, y));
      el.material.uniforms.uRotation.value = l;
      el.material.uniforms.uOffset.value = m;
    });
  }
  update() {
    const t = this;
    const bt = t.blotter;
    bt.stop();
    $.each(t.scopes, (i, scope) => {
      const scp = scope;
      const text = scope.text;
      const mt = scope.material;
      text.properties = t.getOption();
      text.needsUpdate = true;
      // $(t.container).append(scope.domElement);
      mt.needsUpdate = true;
      scp.needsUpdate = true;
      scope.render();
    });
    bt.needsUpdate = true;
    bt.start();
    setTimeout(bt.start, 200);
  }
}
// /* eslint-enable */
