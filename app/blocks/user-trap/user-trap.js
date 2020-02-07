/* eslint-disable */
import BlotterString from './blotterString';

const $ = window.$;

export default function UserTrap() {
  $('.user-trap').each((i, el) => {
    new BlotterString(el, $(el).find('.user-trap__wrapper')[0]);
  });
  // const textOption = {
  //   family: '"ProximaNova", Arial, sans-serif',
  //   size: '100',
  //   weight: 700,
  //   fill: '#000000',
  //   paddingLeft: 50,
  //   paddingRight: 50,
  //   paddingTop: 20,
  //   paddingBottom: 20,
  // };
  // const texts = [];

  // $('.user-trap__string').each((i, el) => {
  //   texts.push(new Blotter.Text($(el).text(), textOption));
  // });

  // const material = new Blotter.ChannelSplitMaterial();
  // material.uniforms.uOffset.value = 0.05;
  // material.uniforms.uRotation.value = 50;
  // material.uniforms.uApplyBlur.value = 1;
  // material.uniforms.uAnimateNoise.value = 0.3;

  // function moveIt(event) {
  //   material.uniforms.uRotation.value = (0.05 * (event.clientX - ($(window).width() / 2))) + (0.05 * (event.clientY - ($(window).height() / 2)));
  //   material.uniforms.uOffset.value = (0.0005 * (event.clientX - ($(window).width() / 2))) + (0.0005 * (event.clientY - ($(window).height() / 2)));
  // }

  // const blotter = new Blotter(material, {
  //   texts,
  // });
  // const elem = document.querySelector('.user-trap');

  // if (elem) {
  //   for (let i = 0; i <= texts.length; i += 1) {
  //     const scope = blotter.forText(texts[i]);
  //     scope.appendTo(elem);
  //     $(document).on('mousemove', '.user-trap', moveIt);
  //   }
  // }
}
/* eslint-enable */
