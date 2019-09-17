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

  if ($('.venezia-applique').length > 0) {
    const anim = new TimelineMax()
      .add([
        TweenMax.fromTo('.venezia-applique__mac', 1, {
          y: 50,
        }, {
          y: -50,
          ease: Power0.easeNone,
        }),
        TweenMax.fromTo('.venezia-applique__describe', 1, {
          y: 50,
        }, {
          y: -50,
          ease: Power0.easeNone,
        }),
        TweenMax.fromTo('.venezia-applique__screen', 1, {
          y: '15%',
        }, {
          y: '-15%',
          ease: Power0.easeNone,
        }),
      ]);

    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.venezia-applique',
        duration: $(window).height(),
      })
      .setTween(anim)
      .addTo(controller);
  }

  if ($('.js-venezia-catalog').length > 0) {
    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.venezia-package__media',
        duration: 0,
        triggerHook: 50,
      })
      .setClassToggle('.js-venezia-catalog',
        'is-animate')
      .addTo(controller);
  }
}

/* eslint-enable */
