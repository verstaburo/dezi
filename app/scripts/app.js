import svg4everybody from 'svg4everybody';
import picturefill from 'picturefill';
import objectFitImages from 'object-fit-images';
import './modernizr';
import './globalOptions';
import anchor from '../blocks/js-functions/anchor';
import navigation from '../blocks/js-functions/navigation';
import {
  freezebuttons,
} from '../blocks/js-functions/freeze';
import {
  selects,
  sliders,
  datepicker,
  inputmask,
  numberinput,
} from '../blocks/form-elements/form-elements';
import popups from '../blocks/popups/popups';
import scrollbar from '../blocks/scrollbar/scrollbar';
import slider from '../blocks/slider/slider';
import tooltips from '../blocks/tooltip/tooltip';
import tabs from '../blocks/tabs/tabs';
import maps from '../blocks/map/map';
import '../blocks/rating/rating';
import '../blocks/accordion/accordion';
import '../blocks/dropdown/dropdown';
import '../blocks/put-block-into-slot/put-block-into-slot';
import aizkulises from '../components/aizkulises/aizkulises';
import venezia from '../components/venezia/venezia';
import header from '../components/header/header';
import splace from '../components/splace/splace';
import link from '../blocks/link/link';

const $ = window.$;

$(() => {
  if (!window.Modernizr.picture) {
    picturefill();
  }
  svg4everybody();
  objectFitImages();
  anchor();
  navigation();
  freezebuttons();
  selects();
  sliders();
  popups();
  scrollbar();
  slider();
  tooltips();
  tabs();
  datepicker();
  inputmask();
  numberinput();
  maps();
  aizkulises();
  header();
  venezia();
  splace();
  link();
});
