/* eslint-disable */

import {
  TweenMax,
  TimelineMax,
  Power0,
} from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

const $ = window.$;

export default function venezia() {
  const controller = new ScrollMagic.Controller();

  const anim = new TimelineMax()
    .add([
      TweenMax.fromTo('.venezia-applique__mac', 1, {
        y: 50,
      }, {
        y: -50,
        ease: Power0.easeNone,
      }),
      TweenMax.fromTo('.venezia-applique__screen', 1, {
        y: 150,
      }, {
        y: -150,
        ease: Power0.easeNone,
      }),
    ]);

  const scene = new ScrollMagic
    .Scene({
      triggerElement: '.venezia-applique',
      duration: $('.venezia-applique').outerHeight(),
    })
    .setTween(anim)
    .addTo(controller);
}

/* eslint-enable */
