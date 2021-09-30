/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as THREE from 'three';
import {
  TimelineMax,
} from 'gsap';
import { setInterval } from 'core-js';
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

// const vertex = `
//         uniform float time;
//         varying vec2 vUv;
//         varying vec2 vUv1;
//         varying vec4 vPosition;

//         uniform sampler2D texture1;
//         uniform sampler2D texture2;
//         uniform vec2 pixels;
//         uniform vec2 uvRate1;

//         void main() {
//           vUv = uv;
//           vec2 _uv = uv - 0.5;
//           vUv1 = _uv;
//           vUv1 *= uvRate1.xy;
//           vUv1 += 0.5;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }
//     `;

// const fragment = `
//         uniform float time;
//         uniform float progress;
//         uniform sampler2D texture1;
//         uniform sampler2D texture2;
//         uniform vec2 pixels;
//         uniform vec2 accel;

//         varying vec2 vUv;
//         varying vec2 vUv1;
//         varying vec4 vPosition;

//         vec2 mirrored(vec2 v){
//           vec2 m=mod(v,2.);
//           return mix(m,2.-m,step(1.,m));
//         }

//         float tri(float p){
//           return mix(p,1.-p,step(.5,p))*2.;
//         }

//         void main() {
//           vec2 uv = gl_FragCoord.xy / pixels.xy;

//           float delayValue = progress*7. - uv.y*2. + uv.x - 2.;

//           delayValue = clamp(delayValue,0.,1.);

//           vec2 translateValue = progress + delayValue * accel;
//           vec2 translateValue1 = vec2(-0.5, 1.) * translateValue;
//           vec2 translateValue2 = vec2(-0.5, 1.) * (translateValue - 1. - accel);

//           vec2 w=sin(sin(time)*vec2(0,.3)+vUv.yx*vec2(0,4.))*vec2(0,.5);

//           vec2 xy=w*(tri(progress)*.5+tri(delayValue)*.5);

//           vec2 uv1 = vUv1 + translateValue1 + xy;
//           vec2 uv2 = vUv1 + translateValue2 + xy;

//           vec4 rgba1 = texture2D(texture1, mirrored(uv1));
//           vec4 rgba2 = texture2D(texture2, mirrored(uv2));
//           vec4 rgba = mix(rgba1, rgba2, delayValue);
//           gl_FragColor = vec4(1.0, 1.0, 0., 1.0);
//           gl_FragColor = rgba;
//         }
//   `;

export default function CanvasSlider2(prnt, imgs, canvas) {
  const images = imgs; let image; const
    sliderImages = [];
  const parent = prnt;
  const renderWidth = Math.max(prnt.clientWidth || 0);
  const renderHeight = Math.max(prnt.clientHeight || 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x23272A, 1.0);
  renderer.setSize(renderWidth, renderHeight);
  // parent.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.crossOrigin = 'anonymous';

  images.forEach((img) => {
    image = loader.load(`${img.getAttribute('src')}?v=${Date.now()}`);
    sliderImages.push(image);
  });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x23272A);
  const camera = new THREE.OrthographicCamera(
    renderWidth / -2,
    renderWidth / 2,
    renderHeight / 2,
    renderHeight / -2,
    1,
    1000,
  );

  camera.position.z = 1;

  const mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: {
        type: 'f',
        value: 0,
      },
      progress: {
        type: 'f',
        value: 0,
      },
      pixels: { type: 'v2', value: new THREE.Vector2(parent.clientWidth, parent.clientHeight) },
      uvRate1: {
        value: new THREE.Vector2(1, 1),
      },
      accel: { type: 'v2', value: new THREE.Vector2(0.5, 2) },
      texture1: { type: 't', value: sliderImages[0] },
      texture2: { type: 't', value: sliderImages[1] },
    },
    // wireframe: true,
    depthWrite: false,
    needsUpdate: true,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    opacity: 1.0,
  });

  const geometry = new THREE.PlaneBufferGeometry(
    parent.offsetWidth,
    parent.offsetHeight,
    1,
  );
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(0, 0, 0);
  scene.add(object);

  let isAnimating = false;
  const delay = 4000;
  let currentSlide = 0;
  const totalSlide = sliderImages.length;
  let isPlay = false;
  let interval = null;

  function animation() {
    if (!isAnimating) {
      isAnimating = true;
      mat.uniforms.time.value = 0;

      const slideId = currentSlide + 1 === totalSlide ? 0 : currentSlide + 1;
      currentSlide = slideId;

      console.log(slideId);

      mat.uniforms.texture2.value = sliderImages[slideId];
      mat.uniforms.texture2.needsUpdate = true;

      TweenLite.to(mat.uniforms.progress, 1, {
        value: 1,
        ease: 'Expo.easeInOut',
        onComplete() {
          mat.uniforms.texture1.value = sliderImages[slideId];
          mat.uniforms.texture1.needsUpdate = true;
          mat.uniforms.progress.value = 0.0;
          isAnimating = false;
        },
      });
    }
  }

  function play() {
    isPlay = true;
    interval = setInterval(animation, delay);
  }

  function stop() {
    isPlay = false;
    clearInterval(interval);
  }

  function resize() {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h);
    mat.uniforms.pixels.value = new THREE.Vector2(w, h);

    if (w / h > 1) {
      mat.uniforms.uvRate1.value.y = h / w;
    } else {
      mat.uniforms.uvRate1.value.x = w / h;
    }

    camera.updateProjectionMatrix();
  }

  resize();

  const sliderSizesWatch = new ResizeObserver(resize);
  sliderSizesWatch.observe(parent);

  const animate = function () {
    requestAnimationFrame(animate);

    if (isPlay) {
      mat.uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    }
  };

  animate();

  window.globalFunctions.shaderSlider = {
    play,
    stop,
    resize,
  };
}

/* eslint-enable max-len */
