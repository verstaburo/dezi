import ScrollMagic from 'scrollmagic';
import watch from '../../blocks/watch/watch';

const { $ } = window;

export default function watchAnimation() {
  function watchAnim() {
    const wtch = document.getElementById('watch');
    const trigger = document.querySelectorAll('.js-watch-3');
    if (trigger.length) {
      if (wtch) {
        watch();
      }
      const controller = new ScrollMagic.Controller();
      const scene = new ScrollMagic
        .Scene({
          triggerElement: '.js-watch-3',
        })
        .addTo(controller);
      scene.on('enter', () => {
        if (wtch) {
          const see = wtch.watch;
          $('.js-watch-3').addClass('is-animate');
          setTimeout(() => {
            $('.js-watch-1').addClass('is-animate');
            see.play();
            setTimeout(() => {
              $('.js-watch-2').addClass('is-animate');
            }, 5000);
            scene.off('enter');
          }, 1500);
        } else {
          $('.js-watch-3').addClass('is-animate');
          setTimeout(() => {
            $('.js-watch-1').addClass('is-animate');
            setTimeout(() => {
              $('.js-watch-2').addClass('is-animate');
            }, 600);
            scene.off('enter');
          }, 1500);
        }
      });
    }
  }

  watchAnim();

  window.globalFunctions.watchAnim = watchAnim;
}
