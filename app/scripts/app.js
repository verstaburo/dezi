import 'core-js';
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
import popups from '../blocks/popups/popups';
import scrollbar from '../blocks/scrollbar/scrollbar';
import slider from '../blocks/slider/slider';
import tooltips from '../blocks/tooltip/tooltip';
import tabs from '../blocks/tabs/tabs';
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
import watchAnimation from '../pages/services/services';
import iniLabels from '../blocks/form-elements/labels';
import scrollList from '../blocks/scroll-list/scroll-list';
import sliderBg from '../blocks/slider/slider-bg';
import textareaAutosize from '../blocks/form-elements/form-elements';
import bgvideo from '../blocks/project/project';
import mebelesSlider from '../components/mebeles/mebeles-slider';
import mebelesBgMove from '../components/mebeles/mebeles-bgtransit';
import logoChangeWords from '../blocks/logo/logo';
import UserTrap from '../blocks/user-trap/user-trap';
import berguskati from '../components/berguskati/berguskati';

const { $ } = window;

$(() => {
  if (!window.Modernizr.picture) {
    picturefill();
  }
  svg4everybody();
  objectFitImages();
  browserDetection();
  anchor();
  navigation();
  freezebuttons();
  popups();
  scrollbar();
  slider();
  tooltips();
  tabs();
  aizkulises();
  header();
  venezia();
  splace();
  link();
  contacts();
  anchors();
  iniLabels();
  textareaAutosize();
  scrollList();
  watchAnimation();
  pageSwitcher();
  sliderBg();
  bgvideo();
  mebelesSlider();
  mebelesBgMove();
  logoChangeWords();
  berguskati();
  UserTrap();
});
