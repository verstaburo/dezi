// import * as PIXI from 'pixi.js';
import CanvasSlider from './CanvasSlider';

const $ = window.$;

export default function sliderBg() {
  const sliders = $('.js-bg-slider');
  if (sliders) {
    $(sliders).each((i, el) => {
      const images = $(el).find('img');
      if (images.length > 1) {
        const slider = new CanvasSlider(el);
        slider.init();
      }
    });
  }
}
