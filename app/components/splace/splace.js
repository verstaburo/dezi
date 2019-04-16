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

  const anim2 = new TimelineMax()
    .add([
      TweenMax.fromTo('.js-splace-1', 0.5, {
        opacity: 0,
        y: '10%',
      }, {
        opacity: 1,
        y: '0%',
        ease: Power1.easeIn,
      }),
    ])
    .add([
      TweenMax.fromTo('.js-splace-2', 0.6, {
        opacity: 0,
        y: '10%',
      }, {
        opacity: 1,
        y: '0%',
        ease: Power1.easeIn,
      }),
    ])
    .add([
      TweenMax.fromTo('.js-splace-3', 0.3, {
        opacity: 0,
        x: '-2%',
        y: '-10%',
      }, {
        opacity: 1,
        ease: Power1.easeIn,
      }),
    ])
    .add([
      TweenMax.to('.js-splace-3', 0.6, {
        x: '0%',
        y: '0%',
        ease: Power1.easeIn,
      }),
    ], '-=0.2')
    .add([
      TweenMax.fromTo('.js-splace-7', 0.3, {
        opacity: 0,
      }, {
        opacity: 1,
        ease: Power1.easeIn,
      }),
    ], '-=0.3')
    .add([
      TweenMax.fromTo('.js-splace-4', 0.3, {
        opacity: 0,
        x: '-2%',
        y: '-10%',
      }, {
        opacity: 1,
        ease: Power1.easeIn,
      }),
    ], '-=0.2')
    .add([
      TweenMax.to('.js-splace-4', 0.6, {
        x: '0%',
        y: '0%',
        ease: Power1.easeIn,
      }),
    ], '-=0.2')
    .add([
      TweenMax.fromTo('.js-splace-6', 0.3, {
        opacity: 0,
      }, {
        opacity: 1,
        ease: Power1.easeIn,
      }),
    ], '-=0.3');


  if ($('.splace').length > 0) {
    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.splace-lead__woman',
        duration: 0,
        triggerHook: 0,
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

    const scene3 = new ScrollMagic
      .Scene({
        triggerElement: '.splace-look__figure',
        duration: 0,
        reverse: false,
        triggerHook: .5,
      })
      .setTween(anim2)
      .addTo(controller);
  }
}
/* eslint-enable */
