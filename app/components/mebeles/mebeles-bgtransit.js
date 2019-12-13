/* eslint-disable */

import {
  TweenMax,
  TimelineMax,
  Power0,
} from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

const $ = window.$;

export default function mebelesBgMove() {
  const controller = new ScrollMagic.Controller();

  if ($('.mebeles-about').length > 0) {
    const anim = new TimelineMax()
      .add([
        TweenMax.fromTo('.mebeles-about__back-image', 1, {
          y: '-15%',
        }, {
          y: '0%',
          ease: Power0.easeNone,
        }),
      ]);

    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.mebeles-about',
        duration: $(window).height(),
      })
      .setTween(anim)
      .addTo(controller);
  }
}

/* eslint-enable */
