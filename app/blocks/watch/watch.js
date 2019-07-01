import seeThru from 'seethru';

export default function watch() {
  seeThru.create('#watch', {
    alphaMask: true,
  });
}
