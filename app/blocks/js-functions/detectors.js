import bowser from 'bowser';

const $ = window.$;

export default function browsersDetection() {
  const parser = bowser.getParser(window.navigator.userAgent);
  const browser = parser.getBrowserName();
  window.globalOptions.browserParser = parser;
  window.globalOptions.browser = browser;
  if (parser.isBrowser('ie', true)) {
    $('html').addClass('is-ie');
  }

  if (parser.isBrowser('edge', true)) {
    $('html').addClass('is-edge');
  }

  if (parser.isBrowser('firefox', true)) {
    $('html').addClass('is-firefox');
  }
}
