import find from 'array.prototype.find';
import svg4everybody from 'svg4everybody';
import picturefill from 'picturefill';
import objectFitImages from 'object-fit-images';
import './modernizr';
import './globalOptions';
import '../blocks/js-functions/initParams';
import browserDetection from '../blocks/js-functions/detectors';
import anchor from '../blocks/js-functions/anchor';
import navigation from '../blocks/js-functions/navigation';
import {
  freezebuttons,
} from '../blocks/js-functions/freeze';
// import {
//   selects,
//   sliders,
//   datepicker,
//   inputmask,
//   numberinput,
// } from '../blocks/form-elements/form-elements';
import popups from '../blocks/popups/popups';
import scrollbar from '../blocks/scrollbar/scrollbar';
import slider from '../blocks/slider/slider';
import tooltips from '../blocks/tooltip/tooltip';
import tabs from '../blocks/tabs/tabs';
// import maps from '../blocks/map/map';
// import '../blocks/rating/rating';
// import '../blocks/accordion/accordion';
// import '../blocks/dropdown/dropdown';
import '../blocks/put-block-into-slot/put-block-into-slot';
import '../blocks/form/form';
import aizkulises from '../components/aizkulises/aizkulises';
import venezia from '../components/venezia/venezia';
import header from '../components/header/header';
import splace from '../components/splace/splace';
import link from '../blocks/link/link';
import contacts from '../components/contacts/contacts';
import anchors from '../blocks/anchors/anchors';
import pageSwitcher from '../blocks/page-switcher/page-switcher';
// import watch from '../blocks/watch/watch';
import watchAnimation from '../pages/services/services';
import iniLabels from '../blocks/form-elements/labels';
import scrollList from '../blocks/scroll-list/scroll-list';
import sliderBg from '../blocks/slider/slider-bg';
import textareaAutosize from '../blocks/form-elements/form-elements';
import bgvideo from '../blocks/project/project';
import mebelesSlider from '../components/mebeles/mebeles-slider';
import mebelesBgMove from '../components/mebeles/mebeles-bgtransit';

const $ = window.$;

$(() => {
  find.shim();
  if (!window.Modernizr.picture) {
    picturefill();
  }
  svg4everybody();
  objectFitImages();
  browserDetection();
  anchor();
  navigation();
  freezebuttons();
  // selects();
  // sliders();
  popups();
  scrollbar();
  slider();
  tooltips();
  tabs();
  // datepicker();
  // inputmask();
  // numberinput();
  // maps();
  aizkulises();
  header();
  venezia();
  splace();
  link();
  contacts();
  anchors();
  iniLabels();
  // watch();
  textareaAutosize();
  scrollList();
  watchAnimation();
  pageSwitcher();
  sliderBg();
  bgvideo();
  mebelesSlider();
  mebelesBgMove();
});
