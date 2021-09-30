/* eslint-disable */
import CanvasSlider from './CanvasSlider';
import CanvasSlider2 from './CanvasSlider2';


const { $ } = window;

export default function sliderBg() {
  // const sliders = $('.js-bg-slider');
  // if (sliders) {
  //   $(sliders).each((i, el) => {
  //     const images = $(el).find('img');
  //     if (images.length > 1) {
  //       const slider = new CanvasSlider(el);
  //       slider.init();
  //       // slider.play();
  //     }
  //   });
  // }
  const sliders = document.querySelectorAll('.js-bg-slider');
  if (sliders) {
    sliders.forEach((slider) => {
      const images = slider.querySelectorAll('img');
      if (images) {
        CanvasSlider2(slider, images);
      }
    });
  }
}
/* eslint-enable */
