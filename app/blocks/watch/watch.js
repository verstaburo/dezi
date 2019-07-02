import seeThru from 'seethru';

const $ = window.$;

export default function watch() {
  if ($('#watch').length > 0) {
    seeThru.create('#watch', {
      alphaMask: true,
    });
  }
}
