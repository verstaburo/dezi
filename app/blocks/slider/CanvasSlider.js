/* eslint-disable max-len */
import * as THREE from 'three';
import {
  TimelineMax,
} from 'gsap';
// import fragment from './fragment.glsl';
// import vertex from './vertex.glsl';

const { $ } = window;

const vertex = `uniform float time;
varying vec2 vUv;
varying vec2 vUv1;
varying vec4 vPosition;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;

void main(){
  vUv=uv;
  vec2 _uv=uv-.5;
  vUv1=_uv;
  vUv1*=uvRate1.xy;

  vUv1+=.5;

  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
`;
const fragment = `uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;
uniform vec2 accel;

varying vec2 vUv;
varying vec2 vUv1;
varying vec4 vPosition;

vec2 mirrored(vec2 v){
  vec2 m=mod(v,2.);
  return mix(m,2.-m,step(1.,m));
}

float tri(float p){
  return mix(p,1.-p,step(.5,p))*2.;
}

void main(){
  vec2 uv=gl_FragCoord.xy/pixels.xy;

  float p=progress;

  float delayValue=p*7.-uv.y*2.+uv.x-2.;

  delayValue=clamp(delayValue,0.,1.);

  vec2 translateValue=p+delayValue*accel;
  vec2 translateValue1=vec2(-.5,1.)*translateValue;
  vec2 translateValue2=vec2(-.5,1.)*(translateValue-1.-accel);

  vec2 w=sin(sin(time)*vec2(0,.3)+vUv.yx*vec2(0,4.))*vec2(0,.5);
  vec2 xy=w*(tri(p)*.5+tri(delayValue)*.5);

  vec2 uv1=vUv1+translateValue1+xy;
  vec2 uv2=vUv1+translateValue2+xy;

  vec4 rgba1=texture2D(texture1,mirrored(uv1));
  vec4 rgba2=texture2D(texture2,mirrored(uv2));

  vec4 rgba=mix(rgba1,rgba2,delayValue);
  gl_FragColor=rgba;
}
`;

export default class CanvasSlider {
  constructor(el) {
    const textLoader = new THREE.TextureLoader();
    textLoader.crossOrigin = 'Anonymous';
    this.el = $(el);
    this.imgEl = $(this.el).find('img').toArray();
    console.log(this.imgEl);
    this.images = [];
    this.imgEl.forEach((img) => {
      const image = textLoader.load(`${img.getAttribute('src')}?v=${Date.now()}`);
      this.images.push(image);
    });
    console.log(this.images);
    this.width = $(this.el).outerWidth();
    this.height = $(this.el).outerHeight();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(this.width, this.height);
    $(this.el).append(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001, 100,
    );
    // this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 1, 1000);
    this.camera.position.set(0, 0, 1);
    this.currIndex = 0;
    this.maxIndex = this.images.length - 1;
    this.currSlider = this.images[this.currIndex];
    this.nextSlider = this.images[this.currIndex + 1];
    this.material = new THREE.ShaderMaterial({
      // side: THREE.DoubleSide,
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        },
        pixels: {
          type: 'v2',
          value: new THREE.Vector2(this.width, this.height),
        },
        accel: {
          type: 'v2',
          value: new THREE.Vector2(0.5, 2),
        },
        progress: {
          type: 'f',
          value: 0,
        },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
        texture1: {
          value: this.currSlider,
        },
        texture2: {
          value: this.nextSlider,
        },
      },
      // wireframe: true,
      depthWrite: false,
      needsUpdate: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), this.material);
    this.scene.add(this.plane);
    this.time = 0;
    this.animate = this.animate.bind(this);
    this.animation = this.animation.bind(this);
    this.resize = this.resize.bind(this);
    this.isPlay = false;
    this.tl = new TimelineMax();
  }

  getSizes() {
    const that = this;
    return {
      w: that.width,
      h: that.height,
    };
  }

  updateSizes() {
    const that = this;
    that.width = $(that.el).outerWidth();
    that.height = $(that.el).outerHeight();
    return {
      w: that.width,
      h: that.height,
    };
  }

  resize() {
    const that = this;
    const sizes = this.updateSizes();
    const { w } = sizes;
    const { h } = sizes;
    that.renderer.setSize(w, h);
    that.camera.aspect = w / h;

    // that.material.uniforms.uvRate1.value.y = h / w;
    that.material.uniforms.pixels.value = new THREE.Vector2(w, h);
    // calculate scene
    const dist = that.camera.position.z - that.plane.position.z;
    const height = 1;
    that.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

    if (w / h > 1) {
      that.plane.scale.x = w / h; // w / h;
      // // that.material.uniforms.uvRate1.value.x = 1;
      // // that.material.uniforms.uvRate1.value.y = h / w;
      // // } else {
      // //   that.plane.scale.y = h / w;
      // //   that.plane.scale.x = 1;
      that.material.uniforms.uvRate1.value.y = h / w;
      // //   // that.material.uniforms.uvRate1.value.y = 1;
      // // }
    } else {
      that.plane.scale.y = h / w;
      that.material.uniforms.uvRate1.value.x = w / h;
    }
    that.camera.updateProjectionMatrix();
  }

  resizeObserver() {
    const that = this;
    const targets = that.el;
    const tarLen = targets.length;

    if (tarLen) {
      for (let i = 0; i < tarLen; i += 1) {
        const sliderSizesWatch = new ResizeObserver(() => {
          that.resize();
        });
        sliderSizesWatch.observe(targets[i]);
      }
    }
  }

  render() {
    const that = this;
    that.renderer.render(that.scene, that.camera);
  }

  animate() {
    requestAnimationFrame(this.animate);
    if (this.isPlay) {
      this.time += 0.05;
      this.speed += 1;
      this.material.uniforms.time.value = this.time;
      this.render();
    }
  }

  init() {
    const that = this;
    const { resize } = this;
    that.resize();
    that.resizeObserver();
    that.animate();
    $(window).on('resize', resize);
    setInterval(() => {
      that.animation();
    }, 4000);
    (that.el)[0].wglslider = that;
  }

  play() {
    const that = this;
    that.isPlay = true;
  }

  stop() {
    const that = this;
    that.isPlay = false;
  }

  animation() {
    const that = this;
    const { tl } = that;
    const index = that.currIndex;
    const { maxIndex } = that;
    const nextIndex = ((index + 1) > maxIndex) ? 0 : index + 1;
    const nextNextIndex = (nextIndex + 1 > maxIndex) ? 0 : nextIndex + 1;
    const start = that.material.uniforms.progress.value;
    const val = (start === 0) ? 1 : 0;
    if (that.isPlay) {
      that.currIndex = nextIndex;
      that.currSlider = that.images[nextIndex];
      that.nextSlider = that.images[nextNextIndex];
      // that.stop();
      tl.to(that.material.uniforms.progress, 1, {
        value: val,
        onComplete() {
          // that.play();
          if (val === 0) {
            that.material.uniforms.texture2.value = that.nextSlider;
          } else {
            that.material.uniforms.texture1.value = that.nextSlider;
          }
        },
      });
    }
  }
}
