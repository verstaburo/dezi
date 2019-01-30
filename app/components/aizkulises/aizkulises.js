/* eslint-disable */
const $ = window.$;
const sr = window.sr;

import ScrollReveal from 'scrollreveal';

export default function aizkulises() {
  if ($('.aizkulises').length < 1) return;

  // Масштабирование сайта
  $(window).on('load resize', function () {
    let
      siteWidth,
      w = $(this),
      screenSize = w.width();

    if (screenSize < 768) siteWidth = 320;
    if (screenSize >= 768) siteWidth = 1024;
    if (screenSize >= 1024) siteWidth = 1366;
    if (screenSize >= 1366) siteWidth = 1920;

    let scale = screenSize / siteWidth;

    $('html').css({
      zoom: scale,
    });

    /* w.scroll(function () {
      const sT = $(this).scrollTop();

      $('.js-sr').each(function () {
        const el = $(this);
        const top = el.offset().top * zoom;

        if (sT > top + w.height()) {
          el.css({
            visibility: 'visible',
          });
        }
      });
    });*/

    // document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
  });


  // Скролл скриншотов в последней секции
  $(window).scroll(function () {
    const
      w = $(this),
      st = w.scrollTop(),
      block = $(document).find('.js-aizkulises-screenshots'),
      scrollBlock = block.find('img'),
      blockTop = block.position('html').top,
      scrollMoment = blockTop - w.height(),
      scrollHeight = block.outerHeight(),
      maxScroll = scrollMoment + scrollHeight,
      maxTranslate = 23;

    if (st < scrollMoment) {
      scrollBlock.attr('style', `transform: translate3d(0, 0, 0)`);
    } else if ((st >= scrollMoment) && (st < maxScroll)) {
      const scrollPercent = (st - scrollMoment) / scrollHeight * maxTranslate;
      console.log(scrollPercent);
      scrollBlock.attr('style', `transform: translate3d(-${scrollPercent}%, -${scrollPercent}%, 0)`);
    } else if (st > maxScroll) {
      scrollBlock.attr('style', `transform: translate3d(-${maxTranslate}%, -${maxTranslate}%, 0)`);
    }
  });
}
/* eslint-enable */
