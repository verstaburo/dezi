/* eslint-disable */

import {
  TweenMax,
  TimelineMax,
  Power0,
} from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const $ = window.$;

export default function mebelesBgMove() {
  const controller = new ScrollMagic.Controller();

  if ($('.mebeles-about').length > 0) {
    const anim = new TimelineMax()
      .add([
        TweenMax.fromTo('.mebeles-about__front-image', 1, {
          y: '20%',
        }, {
          y: '-20%',
          ease: Power0.easeNone,
        }),
        TweenMax.fromTo('.mebeles-about__back-image', 1, {
          y: '5%',
        }, {
          y: '-5%',
          ease: Power0.easeNone,
        }),
      ]);

    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.mebeles-about',
        duration: $('.mebeles-about').height(),
      })
      .setTween(anim)
      .addTo(controller);
  }
}
