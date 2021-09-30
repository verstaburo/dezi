/* eslint-disable */
import CanvasSlider2 from './CanvasSlider2';


const { $ } = window;

export default function sliderBg() {
  const sliders = document.querySelectorAll('.js-bg-slider');
  if (sliders) {
    sliders.forEach((slider) => {
      const images = slider.querySelectorAll('img');
      const canvas = document.createElement('canvas');
      slider.appendChild(canvas);
      const desk = slider.querySelector('canvas');
      if (images) {
        CanvasSlider2(slider, images, desk);
      }
    });
  }
}
/* eslint-enable */
