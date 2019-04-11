/* eslint-disable */

import {
  TweenMax,
  TimelineMax,
  Power0,
  Power1,
} from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

const $ = window.$;

export default function splace() {
  const controller = new ScrollMagic.Controller();

  const anim = new TimelineMax()
    .add([
      TweenMax.staggerTo('.js-stag', 0.5, {
        opacity: 1,
        ease: Power1.easeIn,
      }, 0.1),
    ]);

  if ($('.splace').length > 0) {
    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.js-girl',
        duration: 0,
        offset: $(window).height() * 0.5,
      })
      .setClassToggle('.js-girl',
        'is-animated')
      .addTo(controller);

    const scene2 = new ScrollMagic
      .Scene({
        triggerElement: '.js-trigger',
        duration: 0,
        reverse: false,
        triggerHook: 0.6,
      })
      .setTween(anim)
      .addTo(controller);
  }
}
/* eslint-enable */
