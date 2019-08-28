import * as THREE from 'three';
import {
  TimelineMax,
} from 'gsap';
import ResizeObserver from 'resize-observer-polyfill';
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

const $ = window.$;

export default class CanvasSlider {
  constructor(el) {
    this.el = $(el);
    this.imgEl = $(this.el).find('img');
    this.images = $(this.imgEl).map((ix, img) => $(img).attr('src')).get();
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
    this.camera.position.set(0, 0, 1);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
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
          value: THREE.ImageUtils.loadTexture(this.images[0]),
        },
        texture2: {
          value: THREE.ImageUtils.loadTexture(this.images[1]),
        },
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), this.material);
    this.scene.add(this.plane);
    this.time = 0;
    this.animate = this.animate.bind(this);
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
    const sizes = that.updateSizes();
    const w = sizes.w;
    const h = sizes.h;
    that.renderer.setSize(w, h);
    that.camera.aspect = w / h;
    that.material.uniforms.uvRate1.value.y = h / w;
    // calculate scene
    const dist = that.camera.position.z - that.plane.position.z;
    const height = 1;
    that.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

    // if(w/h>1) {
    that.plane.scale.x = w / h;
    // }
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
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.animate);
    this.render();
  }
  init() {
    const that = this;
    that.resize();
    that.resizeObserver();
    that.animate();
    // setInterval(() => {
    //   that.animation();
    // }, 3000);
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
    const tl = that.tl;
    console.log('play');
    if (that.isPlay) {
      tl.to(that.material.uniforms.progress, 1, {
        value: 0,
      });
      that.stop();
    } else {
      tl.to(that.material.uniforms.progress, 1, {
        value: 1,
      });
      that.play();
    }
  }
}
