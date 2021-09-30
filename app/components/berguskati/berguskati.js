/* eslint-disable no-unused-vars */
import {
  TweenMax,
  TimelineMax,
  Power0,
} from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const { $ } = window;

export default function berguskati() {
  const controller = new ScrollMagic.Controller();
  const bgskTop = document.querySelector('.berguskati-lead');
  const bgskBottom = document.querySelector('.berguskati-app__description');

  if (bgskTop) {
    const anim = new TimelineMax()
      .add([
        TweenMax.fromTo('.js-berguskati-paralax1', 1, {
          y: '15%',
        }, {
          y: '-15%',
          ease: Power0.easeNone,
        }),
      ]);

    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.berguskati-lead',
        duration: $(window).height(),
      })
      .setTween(anim)
      .addTo(controller);
  }

  if (bgskBottom) {
    const anim = new TimelineMax()
      .add([
        TweenMax.fromTo('.js-berguskati-paralax2', 1, {
          y: '10%',
        }, {
          y: '-10%',
          ease: Power0.easeNone,
        }),
      ]);

    const scene = new ScrollMagic
      .Scene({
        triggerElement: '.berguskati-app__description',
        duration: $(window).height(),
      })
      .setTween(anim)
      .addTo(controller);
  }
}
