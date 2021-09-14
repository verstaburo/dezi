function setDevice() {
  let
    scale = 1;
  let siteWidth;
  const screenSize = $(window).width();

  if (screenSize < 768) {
    siteWidth = 320;
  } else if (screenSize >= 768 && screenSize < 1025) {
    siteWidth = 1024;
  } else if (screenSize >= 1025 && screenSize < 1367) {
    siteWidth = 1366;
  } else {
    siteWidth = 1920;
  }
  scale = screenSize / siteWidth;
  $('html').css({
    zoom: scale,
  });
  window.globalOptions = window.globalOptions || {};
  window.globalOptions.scale = scale;
}
setDevice();
$(window).on('load resize', setDevice);
