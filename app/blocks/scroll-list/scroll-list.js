const $ = window.$;

export default function scrollList() {
  const trig = $(document).find('[data-list-wrapper]');
  if (trig.length > 0) {
    $(window).on('load scroll', () => {
      const w = $(window);
      const st = w.scrollTop();
      const block = $(document).find('[data-list-wrapper]');
      const scrollBlock = block.find('[data-list-inner]');
      const wHeight = w.height();
      const wWidth = $(block).width();
      const blockWidth = (scrollBlock[0].scrollWidth - wWidth);
      const scrollHeight = block.outerHeight(true);
      const blockTop = block.offset().top;
      const scrollMoment = blockTop - wHeight;
      const fullHeight = scrollHeight + wHeight;
      const maxScroll = (blockTop + scrollHeight) - wHeight;
      const maxTranslate = blockWidth / fullHeight;

      if (st < scrollMoment) {
        scrollBlock.attr('style', 'transform: translate3d(0, 0, 0)');
      } else if ((st >= scrollMoment) && (st < maxScroll)) {
        const scrollPercent = (st - blockTop) * maxTranslate;
        scrollBlock.attr('style', `transform: translate3d(-${scrollPercent}px, 0, 0)`);
      } else if (st > maxScroll) {
        scrollBlock.attr('style', `transform: translate3d(-${blockWidth}px, 0, 0)`);
      }
    });
  }
}
