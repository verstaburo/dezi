/* eslint-disable */
const $ = window.$;

export default function aizkulises() {
  let isMobile = false;

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
  }

  /*
   Масштабирование сайта
    */
  let scale = 1;
  const w = $(window);

  $(window).on('load resize', function () {
    let
      siteWidth,
      screenSize = w.width();

    if (screenSize < 768) siteWidth = 320;
    if (screenSize >= 768) siteWidth = 1024;
    if (screenSize >= 1024) siteWidth = 1366;
    if (screenSize >= 1366) siteWidth = 1920;

    scale = screenSize / siteWidth;

    $('html').css({
      zoom: scale,
    });

    // Если вернемся к стандартному зуму
    // document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
  });

  /*
  Анимации
   */
  w.on('load scroll resize', function () {
    const
      sT = $(this).scrollTop(),
      baseClass = 'js-sr',
      duration = 1000,
      maxDelay = 400,
      animClasses = [
        'animation_fadeIn',
        'animation_fadeInRight',
        'animation_scaleIn',
        'animation_fadeInLeft'
      ];

    if (isMobile) $('.js-sr').removeClass('js-sr');
    if (isMobile) return;

    function makeDelay(el) {
      let delay = 0;

      $(el).each(function () {
        $(this).css({ animationDelay: `${delay}ms` });
        delay += 50;
      });
    }

    makeDelay('.js-sr_7');
    makeDelay('.js-sr_8');
    makeDelay('.js-sr_9');

    // Общий список классов анимаций
    let classes = '';
    for (let i = 0; i < 10; i++) { classes += `${baseClass}_${i} ` }
    for (let i = 0; i < animClasses.length; i++) { classes += `${animClasses[i]} ` }

    $('.js-sr').each(function () {
      const
        el = $(this),
        top = el.offset().top * scale,
        wH = w.height(),
        momentOffset = wH * 0.1,
        scrollMoment = top - wH + momentOffset;

      if (sT * scale > scrollMoment && el.hasClass('js-sr')) {
        if (el.hasClass('js-sr_1') || el.hasClass('js-sr_8')) el.addClass(`${animClasses[0]}`);
        if (el.hasClass('js-sr_2')) el.addClass(`${animClasses[0]}`).css({ animationDelay: '100ms' });
        if (el.hasClass('js-sr_3')) el.addClass(`${animClasses[0]}`).css({ animationDelay: '200ms' });
        if (el.hasClass('js-sr_4')) el.addClass(`${animClasses[0]}`).css({ animationDelay: '300ms' });
        if (el.hasClass('js-sr_5')) el.addClass(`${animClasses[0]}`).css({ animationDelay: '400ms' });
        if (el.hasClass('js-sr_6')) el.addClass(`${animClasses[1]}`);
        if (el.hasClass('js-sr_7') || el.hasClass('js-sr_9')) el.addClass(`${animClasses[2]}`);
        if (el.hasClass('js-sr_10')) el.addClass(`${animClasses[3]}`);

        setTimeout(() => {
          el.removeClass(`${classes}${baseClass}`).attr('style', '');
        }, duration + maxDelay);
      }
    });
  });


  /*
  Не использовать эти скрипты на других страницах
   */
  if ($('.aizkulises').length < 1) return;

  /*
  Скролл скриншотов в последней секции
   */
  $(window).on('load scroll', function () {
    const
      w = $(this),
      st = w.scrollTop() * scale,
      block = $(document).find('.js-aizkulises-screenshots'),
      scrollBlock = block.find('img'),
      blockTop = block.position('html').top * scale,
      scrollMoment = blockTop - w.height(),
      scrollHeight = block.outerHeight(),
      maxScroll = scrollMoment + scrollHeight,
      maxTranslate = 23;

    if (st < scrollMoment) {
      scrollBlock.attr('style', `transform: translate3d(0, 0, 0)`);
    } else if ((st >= scrollMoment) && (st < maxScroll)) {
      const scrollPercent = (st - scrollMoment) / scrollHeight * maxTranslate;
      scrollBlock.attr('style', `transform: translate3d(-${scrollPercent}%, -${scrollPercent}%, 0)`);
    } else if (st > maxScroll) {
      scrollBlock.attr('style', `transform: translate3d(-${maxTranslate}%, -${maxTranslate}%, 0)`);
    }
  });
}
/* eslint-enable */
