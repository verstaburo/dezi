const { $ } = window;

window.globalOptions.headerLight = $('.header').is('.header_light');

// фиксируем высоту страницы на мобильных для обходв vh
function setVH() {
  const wH = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  const el = document.createElement('div');
  el.setAttribute('style', 'display: block; position: absolute;pointer - events: none; width: 100vw; height: 100vh; z - index: -1; ');
  el.classList.add('js-vh-test');
  $('body').append(el);
  const elH = $(el).height();
  let vh;
  if (elH > wH) {
    vh = wH * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  } else {
    document.documentElement.style.setProperty('--vh', '1vh');
  }
  $(el).remove();
}

setVH();
$(window).on('resize', setVH);
