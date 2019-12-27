const $ = window.$;

export default function logoChangeWords() {
  let lastX = 0;
  // let isFree = true;
  let lastWord = 0;
  const words = $('.js-logo-slogan').length > 0 ? $('.js-logo-slogan [data-words]').attr('data-words').split(',') : [];

  function switchWord(evt) {
    const newX = evt.pageX;
    const wLen = words.length;
    const wordContainer = $('[data-words]');

    if (wLen > 1) {
      lastWord = (lastWord + 1 + wLen) % wLen;
      if (Math.abs(lastX - newX) > 50) {
        lastX = newX;
        // isFree = false;
        $(wordContainer).text(words[lastWord]);
        // setTimeout(() => {
        //   isFree = true;
        // }, 100);
      }
    }
  }

  if ($('.js-logo-slogan').length > 0) {
    $(document).on('mousemove', (evt) => {
      const bp = window.globalOptions.sizes;
      const sT = $(window).scrollTop();
      const wW = $(window).width();

      if (wW >= bp.lg && sT < 50) {
        switchWord(evt);
      }
    });
  }
}
