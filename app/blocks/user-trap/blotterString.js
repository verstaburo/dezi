// /* eslint-disable */
const { $ } = window;
const { Blotter } = window;

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
      md: 24,
      lg: 60,
      xl: 86,
      xxl: 120,
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
    t.blotter.on('update', () => {
      $(t.el).removeClass('is-loading');
    });
  }

  onRender() {
    const t = this;
    t.blotter.on('ready', () => {
      t._setListeners();
      const str = t.strings;
      let fullLength = 0;
      const strings = [0];
      const containers = [];
      for (let s = 0; s < str.length; s += 1) {
        const wrap = document.createElement('div');
        wrap.classList.add('b-string');
        const strl = str[s].length;
        const strLast = (fullLength + strl);
        fullLength += strl;
        strings.push(strLast);
        containers.push(wrap);
      }
      $.each(t.scopes, (i, scope) => {
        for (let k = 0; k < strings.length; k += 1) {
          if (i <= strings[k] && i >= strings[k - 1]) {
            $(containers[k - 1]).append(scope.domElement);
          }
        }
      });
      $.each(containers, (i, wr) => {
        $(t.container).append(wr);
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
      family: '"Archivo", Arial Black, sans-serif',
      size: finalSize,
      weight: 400,
      fill: '#000000',
      paddingLeft: finalSize,
      paddingRight: finalSize,
    };
    return option;
  }

  _prepareBlotter() {
    const t = this;
    $(t.el).addClass('is-loading');
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
      if (txt.value === ' ') {
        scope.domElement.classList.add('b-spaceword');
      }
      return scope;
    });
    t.onRender();
  }

  _blotterTexts() {
    const t = this;
    const texts = [];
    const textParam = [];
    $(t.el).find('.user-trap__string').each((i, el) => {
      const str = $(el).text();
      // const strlength = str.length;
      const words = str.split(' ');
      const wordsCount = words.length;
      // const wordsLengths = [];
      // let spaceCoords = 0;
      // for (let w = 0; w < (wordsCount - 1); w += 1) {
      //   spaceCoords += w.length;
      //   wordsLengths.push(spaceCoords);
      // }
      const strInfo = {
        length: wordsCount,
        // spacesIndexes: wordsLengths,
      };
      for (let k = 0; k < wordsCount; k += 1) {
        const text = new Blotter.Text(words[k], t.getOption());
        texts.push(text);
      }
      textParam.push(strInfo);
    });
    t.strings = textParam;
    return texts;
  }

  _setInitialCenter() {
    const t = this;
    const cW = $(t.container).width();
    const cH = $(t.container).height();
    const eW = $(t.el).width();
    const eH = $(t.el).height();
    const examplePosition = $(t.el).offset();
    const exX = (examplePosition.left + (eW / 2)) / cW;
    const exY = (examplePosition.top + (eH / 2)) / cH;
    t._handleNewCenter(exX, exY);
  }

  _handleMousemove(evt) {
    const t = this;
    const cW = $(t.container).width();
    const cH = $(t.container).height();
    const d = evt.pageX / cW;
    const e = evt.pageY / cH;
    t._handleNewCenter(d, e);
  }

  _handleTouchMove(evt) {
    const t = this;
    const cW = $(t.container).width();
    const cH = $(t.container).height();
    const d = evt.originalEvent.touches[0].pageX / cW;
    const e = evt.originalEvent.touches[0].pageY / cH;
    t._handleNewCenter(d, e);
  }

  _handleNewCenter(x, y) {
    const t = this;
    const cW = $(t.container).width();
    const cH = $(t.container).height();
    $.each(t.scopes, (ix, g) => {
      const scope = g;
      const el = $(g.domElement);
      const ePar = el.offset();
      const eW = (ePar.left + (el.width() / 2)) / cW;
      const eH = (ePar.top + (el.height() / 2)) / cH;
      const l = a(eW, eH, x, y);
      const m = Math.min(0.15, b(eW, eH, x, y));
      scope.material.uniforms.uRotation.value = l;
      scope.material.uniforms.uOffset.value = m;
    });
  }

  update() {
    const t = this;
    $(t.el).addClass('is-loading');
    const bt = t.blotter;
    bt.stop();
    $.each(t.scopes, (i, scope) => {
      const scp = scope;
      const { text } = scope;
      const mt = scope.material;
      text.properties = t.getOption();
      text.needsUpdate = true;
      mt.needsUpdate = true;
      scp.needsUpdate = true;
      scope.render();
    });
    bt.needsUpdate = true;
    bt.start();
  }
}
// /* eslint-enable */
