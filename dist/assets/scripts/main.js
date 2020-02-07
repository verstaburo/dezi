/* eslint-disable */

/**
 * REMOVE IT
 *
 * Скрипты можно писать тут, либо подключать с помощь https://github.com/coderhaoxin/gulp-file-include
 *
 * ВАЖНО: Файлы просто подключаются, без транспиляции (babel) минификации, поэтому нужно писать на ES5
 * Так же доступа к блокам, которые собираются с помощью вебпака не будет.
 */

// $(document).ready(function () {
//   if ($('.user-trap').length > 0) {
//     var textOption = {
//       family: '"ProximaNova", Arial, sans-serif',
//       size: '100',
//       weight: 700,
//       fill: '#000000',
//     };
//     var texts = [];

//     $('.user-trap__string').each(function (i, el) {
//       texts.push(new Blotter.Text($(el).text(), textOption));
//     });

//     var material = new Blotter.ChannelSplitMaterial();
//     material.uniforms.uOffset.value = 0.05;
//     material.uniforms.uRotation.value = 50;
//     material.uniforms.uApplyBlur.value = 1;
//     material.uniforms.uAnimateNoise.value = .3;

//     function moveIt(event) {
//       material.uniforms.uRotation.value = .05 * (event.clientX - ($(window).width() / 2)) + .05 * (event.clientY - ($(window).height() / 2));
//       material.uniforms.uOffset.value = .0005 * (event.clientX - ($(window).width() / 2)) + .0005 * (event.clientY - ($(window).height() / 2));
//     }

//     var blotter = new Blotter(material, {
//       texts: texts,
//     });
//     var elem = document.querySelector('.user-trap');

//     console.log(scope);

//     if (elem) {
//       for (var i = 0; i <= texts.length; i++) {
//         var scope = blotter.forText(texts[i]);
//         scope.appendTo(elem);
//         $(document).on('mousemove', '.user-trap', moveIt);
//       }
//     }
//   }
// });


/* eslint-enable */
