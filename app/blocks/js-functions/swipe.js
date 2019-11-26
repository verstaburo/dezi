/* eslint-disable */
/**
 * Object.assign() polyfill
 */
Object.assign || Object.defineProperty(Object, 'assign', {
  enumerable: !1,
  configurable: !0,
  writable: !0,
  value: function (a, b) {
    'use strict';
    if (void 0 === a || null === a) error('Cannot convert first argument to object');
    for (var c = Object(a), d = 1; d < arguments.length; d++) {
      var e = arguments[d];
      if (void 0 !== e && null !== e)
        for (var f = Object.keys(Object(e)), g = 0, h = f.length; g < h; g++) {
          var i = f[g],
            j = Object.getOwnPropertyDescriptor(e, i);
          void 0 !== j && j.enumerable && (c[i] = e[i])
        }
    }
    return c
  }
});

/**
 * CustomEvent() polyfill
 */
! function () {
  if ('function' == typeof window.CustomEvent) return;

  function t(t, e) {
    e = e || {
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    };
    var n = document.createEvent('CustomEvent');
    return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
  }
  t.prototype = window.Event.prototype, window.CustomEvent = t
}();
/* eslint-enable */

/**
 * Функция определения события swipe на элементе.
 * @param {Object} el - элемент DOM.
 * @param {Object} options - объект с предварительными настройками.
 */
export default function swipe(el, options) {
  // настройки по умолчанию
  const settings = Object.assign({}, {
    minDist: 60, // минимальная дистанция, чтобы жест считался как свайп (px)
    maxDist: 120, // максимальная дистанция,  чтобы жест считался как свайп (px)
    maxTime: 300, // максимальное время, за которое должен быть совершен свайп (ms)
    minTime: 50, // минимальное время, за которое должен быть совершен свайп (ms)
  }, options);

  // коррекция времени при ошибочных значениях
  if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
  if (settings.maxTime < 100 || settings.minTime < 50) {
    settings.maxTime = 300;
    settings.minTime = 50;
  }

  let dir; // направление свайпа (horizontal, vertical)
  let swipeType; // тип свайпа (up, down, left, right)
  let dist; // дистанция, пройденная указателем
  let isMouse = false; // поддержка мыши (не используется для тач-событий)
  let isMouseDown = false; // указание на активное нажатие мыши (не используется для тач-событий)
  let startX = 0; // начало координат по оси X (pageX)
  let distX = 0; // дистанция, пройденная указателем по оси X
  let startY = 0; // начало координат по оси Y (pageY)
  let distY = 0; // дистанция, пройденная указателем по оси Y
  let startTime = 0; // время начала касания
  const support = { // поддерживаемые браузером типы событий
    pointer: !!('PointerEvent' in window || ('msPointerEnabled' in window.navigator)),
    touch: !!(typeof window.orientation !== 'undefined' || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window || navigator.msMaxTouchPoints || 'maxTouchPoints' in window.navigator > 1 || 'msMaxTouchPoints' in window.navigator > 1),
  };

  /**
   * Опредление доступных в браузере событий: pointer, touch и mouse.
   * @returns {Object} - возвращает объект с доступными событиями.
   */
  const getSupportedEvents = function () {
    let events = {};
    switch (true) {
      case support.pointer:
        events = {
          type: 'pointer',
          start: 'pointerdown',
          move: 'pointermove',
          end: 'pointerup',
          cancel: 'pointercancel',
          leave: 'pointerleave',
        };
        break;
      case support.touch:
        events = {
          type: 'touch',
          start: 'touchstart',
          move: 'touchmove',
          end: 'touchend',
          cancel: 'touchcancel',
        };
        break;
      default:
        events = {
          type: 'mouse',
          start: 'mousedown',
          move: 'mousemove',
          end: 'mouseup',
          leave: 'mouseleave',
        };
        break;
    }
    return events;
  };


  /**
   * Объединение событий mouse/pointer и touch.
   * @param e {Event} - принимает в качестве аргумента событие.
   * @returns {TouchList|Event} - возвращает либо TouchList, либо оставляет событие без изменения.
   */
  const eventsUnify = function (e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  };


  /**
   * Обрабочик начала касания указателем.
   * @param e {Event} - получает событие.
   */
  const checkStart = function (e) {
    const event = eventsUnify(e);
    if (support.touch && typeof e.touches !== 'undefined' && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
    dir = 'none';
    swipeType = 'none';
    dist = 0;
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    if (isMouse) isMouseDown = true; // поддержка мыши
    e.preventDefault();
  };

  /**
   * Обработчик движения указателя.
   * @param e {Event} - получает событие.
   */
  const checkMove = function (e) {
    if (isMouse && !isMouseDown) return; // выход из функции, если мышь перестала быть активна
    const event = eventsUnify(e);
    distX = event.pageX - startX;
    distY = event.pageY - startY;
    if (Math.abs(distX) > Math.abs(distY)) dir = (distX < 0) ? 'left' : 'right';
    else dir = (distY < 0) ? 'up' : 'down';
    e.preventDefault();
  };

  /**
   * Обработчик окончания касания указателем.
   * @param e {Event} - получает событие.
   */
  const checkEnd = function (e) {
    if (isMouse && !isMouseDown) { // выход из функции и сброс проверки нажатия мыши
      return;
    }
    const endTime = new Date().getTime();
    const time = endTime - startTime;
    if (time >= settings.minTime && time <= settings.maxTime) { // проверка времени жеста
      if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
        swipeType = dir; // опредление типа свайпа как 'left' или 'right'
      } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
        swipeType = dir; // опредление типа свайпа как 'top' или 'down'
      }
    }
    dist = (dir === 'left' || dir === 'right') ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

    // генерация кастомного события swipe
    if (swipeType !== 'none' && dist >= settings.minDist) {
      const swipeEvent = new CustomEvent('swipe', {
        bubbles: true,
        cancelable: true,
        detail: {
          full: e, // полное событие Event
          dir: swipeType, // направление свайпа
          dist, // дистанция свайпа
          time, // время, потраченное на свайп
        },
      });
      el.dispatchEvent(swipeEvent);
    }
    e.preventDefault();
  };

  // добавление поддерживаемых событий
  const events = getSupportedEvents();

  // проверка наличия мыши
  if ((support.pointer && !support.touch) || events.type === 'mouse') isMouse = true;

  // добавление обработчиков на элемент
  el.addEventListener(events.start, checkStart);
  el.addEventListener(events.move, checkMove);
  el.addEventListener(events.end, checkEnd);
}
