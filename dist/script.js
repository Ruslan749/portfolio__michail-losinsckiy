/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slader */ "./src/js/slader.js");
/* harmony import */ var _slader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slader__WEBPACK_IMPORTED_MODULE_0__);

window.addEventListener('DOMContentLoaded', () => {
  "use strict"; // promo

  const burger = document.querySelector('.burger'),
        menuClose = document.querySelector('.menu__close'),
        menuActive = document.querySelector('.menu__active');
  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');

    if (burger.classList.contains("burger_active")) {
      menuClose.style.display = "none";
      menuActive.style.display = "block";
    } else {
      menuClose.style.display = "block";
      menuActive.style.display = "none";
    }
  }); // модельное окно

  const modal = document.querySelector('.modal'); // объект

  const btn = document.querySelectorAll('.button__modal'); // масив

  const close = document.querySelector('.close');
  const windows = document.querySelectorAll('[data-modal]');
  btn.forEach(item => {
    item.addEventListener('click', e => {
      if (e.target) {
        e.preventDefault();
      }

      windows.forEach(item => {
        item.style.display = "none";
      });
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; //  для того чтобы при появлении мод окна страница замораживалась
    });
  });
  close.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = "";
  }); // post

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.appendChild(statusMessage);
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);
      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});

/***/ }),

/***/ "./src/js/slader.js":
/*!**************************!*\
  !*** ./src/js/slader.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * SimpleAdaptiveSlider by Itchief v2.0.0 (https://github.com/itchief/ui-components/tree/master/simple-adaptive-slider)
 * Copyright 2020 - 2021 Alexander Maltsev
 * Licensed under MIT (https://github.com/itchief/ui-components/blob/master/LICENSE)
 */
(function () {
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return e;
  }

  window.CustomEvent = CustomEvent;
})(); // базовые классы и селекторы


var WRAPPER_SELECTOR = '.slider__wrapper';
var ITEMS_SELECTOR = '.slider__items';
var ITEM_SELECTOR = '.slider__item';
var ITEM_CLASS_ACTIVE = 'slider__item_active';
var CONTROL_SELECTOR = '.slider__control';
var CONTROL_CLASS_SHOW = 'slider__control_show'; // индикаторы

var INDICATOR_WRAPPER_ELEMENT = 'ol';
var INDICATOR_WRAPPER_CLASS = 'slider__indicators';
var INDICATOR_ITEM_ELEMENT = 'li';
var INDICATOR_ITEM_CLASS = 'slider__indicator';
var INDICATOR_ITEM_CLASS_ACTIVE = 'slider__indicator_active'; // порог для переключения слайда (40%)

var SWIPE_THRESHOLD = 20; // класс для отключения transition

var TRANSITION_NONE = 'transition-none';

function SimpleAdaptiveSlider(selector, config) {
  // .slider
  this._$root = document.querySelector(selector); // .slider__wrapper

  this._$wrapper = this._$root.querySelector(WRAPPER_SELECTOR); // .slider__items

  this._$items = this._$root.querySelector(ITEMS_SELECTOR); // .slider__item

  this._$itemList = this._$root.querySelectorAll(ITEM_SELECTOR); // текущий индекс

  this._currentIndex = 0; // экстремальные значения слайдов

  this._minOrder = 0;
  this._maxOrder = 0;
  this._$itemWithMinOrder = null;
  this._$itemWithMaxOrder = null;
  this._minTranslate = 0;
  this._maxTranslate = 0; // направление смены слайдов (по умолчанию)

  this._direction = 'next'; // флаг, который показывает, что идёт процесс уравновешивания слайдов

  this._balancingItemsFlag = false; // текущее значение трансформации

  this._transform = 0; // swipe параметры

  this._hasSwipeState = false;
  this._swipeStartPosX = 0; // id таймера

  this._intervalId = null; // конфигурация слайдера (по умолчанию)

  this._config = {
    loop: true,
    autoplay: false,
    interval: 5000,
    swipe: true
  }; // изменяем конфигурацию слайдера в соответствии с переданными настройками

  for (var key in config) {
    if (this._config.hasOwnProperty(key)) {
      this._config[key] = config[key];
    }
  } // добавляем к слайдам data-атрибуты


  for (var i = 0, length = this._$itemList.length; i < length; i++) {
    this._$itemList[i].dataset.order = i;
    this._$itemList[i].dataset.index = i;
    this._$itemList[i].dataset.translate = 0;
  } // перемещаем последний слайд перед первым


  if (this._config.loop) {
    var count = this._$itemList.length - 1;
    var translate = -this._$itemList.length * 100;
    this._$itemList[count].dataset.order = -1;
    this._$itemList[count].dataset.translate = -this._$itemList.length * 100;
    var transformValue = 'translateX('.concat(translate, '%)');
    this._$itemList[count].style.transform = transformValue;
  } // добавляем индикаторы к слайдеру


  this._addIndicators(); // обновляем экстремальные значения переменных


  this._refreshExtremeValues(); // помечаем активные элементы


  this._setActiveClass(); // назначаем обработчики


  this._addEventListener(); // запускаем автоматическую смену слайдов


  this._autoplay();
} // set active class


SimpleAdaptiveSlider.prototype._setActiveClass = function () {
  // slides
  var i;
  var length;
  var $item;
  var index;

  for (i = 0, length = this._$itemList.length; i < length; i++) {
    $item = this._$itemList[i];
    index = parseInt($item.dataset.index);

    if (this._currentIndex === index) {
      $item.classList.add(ITEM_CLASS_ACTIVE);
    } else {
      $item.classList.remove(ITEM_CLASS_ACTIVE);
    }
  } // indicators


  var $indicators = this._$root.querySelectorAll('.' + INDICATOR_ITEM_CLASS);

  if ($indicators.length) {
    for (i = 0, length = $indicators.length; i < length; i++) {
      $item = $indicators[i];
      index = parseInt($item.dataset.slideTo);

      if (this._currentIndex === index) {
        $item.classList.add(INDICATOR_ITEM_CLASS_ACTIVE);
      } else {
        $item.classList.remove(INDICATOR_ITEM_CLASS_ACTIVE);
      }
    }
  } // controls


  var $controls = this._$root.querySelectorAll(CONTROL_SELECTOR);

  if (!$controls.length) {
    return;
  }

  if (this._config.loop) {
    for (i = 0, length = $controls.length; i < length; i++) {
      $controls[i].classList.add(CONTROL_CLASS_SHOW);
    }
  } else {
    if (this._currentIndex === 0) {
      $controls[0].classList.remove(CONTROL_CLASS_SHOW);
      $controls[1].classList.add(CONTROL_CLASS_SHOW);
    } else if (this._currentIndex === this._$itemList.length - 1) {
      $controls[0].classList.add(CONTROL_CLASS_SHOW);
      $controls[1].classList.remove(CONTROL_CLASS_SHOW);
    } else {
      $controls[0].classList.add(CONTROL_CLASS_SHOW);
      $controls[1].classList.add(CONTROL_CLASS_SHOW);
    }
  }
}; // смена слайдов


SimpleAdaptiveSlider.prototype._move = function () {
  if (this._direction === 'none') {
    this._$items.classList.remove(TRANSITION_NONE);

    this._$items.style.transform = 'translateX('.concat(this._transform, '%)');
    return;
  }

  if (!this._config.loop) {
    var condition = this._currentIndex + 1 >= this._$itemList.length;

    if (condition && this._direction === 'next') {
      this._autoplay('stop');

      return;
    }

    if (this._currentIndex <= 0 && this._direction === 'prev') {
      return;
    }
  }

  var step = this._direction === 'next' ? -100 : 100;
  var transform = this._transform + step;

  if (this._direction === 'next') {
    if (++this._currentIndex > this._$itemList.length - 1) {
      this._currentIndex -= this._$itemList.length;
    }
  } else {
    if (--this._currentIndex < 0) {
      this._currentIndex += this._$itemList.length;
    }
  }

  this._transform = transform;
  this._$items.style.transform = 'translateX('.concat(transform, '%)');

  this._setActiveClass();
}; // функция для перемещения к слайду по индексу


SimpleAdaptiveSlider.prototype._moveTo = function (index) {
  var currentIndex = this._currentIndex;
  this._direction = index > currentIndex ? 'next' : 'prev';

  for (var i = 0; i < Math.abs(index - currentIndex); i++) {
    this._move();
  }
}; // метод для автоматической смены слайдов


SimpleAdaptiveSlider.prototype._autoplay = function (action) {
  if (!this._config.autoplay) {
    return;
  }

  if (action === 'stop') {
    clearInterval(this._intervalId);
    this._intervalId = null;
    return;
  }

  if (this._intervalId === null) {
    this._intervalId = setInterval(function () {
      this._direction = 'next';

      this._move();
    }.bind(this), this._config.interval);
  }
}; // добавление индикаторов


SimpleAdaptiveSlider.prototype._addIndicators = function () {
  if (this._$root.querySelector('.' + INDICATOR_WRAPPER_CLASS)) {
    return;
  }

  var $wrapper = document.createElement(INDICATOR_WRAPPER_ELEMENT);
  $wrapper.className = INDICATOR_WRAPPER_CLASS;

  for (var i = 0, length = this._$itemList.length; i < length; i++) {
    var $item = document.createElement(INDICATOR_ITEM_ELEMENT);
    $item.className = INDICATOR_ITEM_CLASS;
    $item.dataset.slideTo = i;
    $wrapper.appendChild($item);
  }

  this._$root.appendChild($wrapper);
}; // refresh extreme values


SimpleAdaptiveSlider.prototype._refreshExtremeValues = function () {
  var $itemList = this._$itemList;
  this._minOrder = parseInt($itemList[0].dataset.order);
  this._maxOrder = this._minOrder;
  this._$itemWithMinOrder = $itemList[0];
  this._$itemWithMaxOrder = this._$itemWithMinOrder;
  this._minTranslate = parseInt($itemList[0].dataset.translate);
  this._maxTranslate = this._minTranslate;

  for (var i = 0, length = $itemList.length; i < length; i++) {
    var $item = $itemList[i];
    var order = parseInt($item.dataset.order);

    if (order < this._minOrder) {
      this._minOrder = order;
      this._$itemWithMinOrder = $item;
      this._minTranslate = parseInt($item.dataset.translate);
    } else if (order > this._maxOrder) {
      this._maxOrder = order;
      this._$itemWithMaxOrder = $item;
      this._minTranslate = parseInt($item.dataset.translate);
    }
  }
}; // balancing items


SimpleAdaptiveSlider.prototype._balancingItems = function () {
  if (!this._balancingItemsFlag) {
    return;
  }

  var $wrapper = this._$wrapper;
  var wrapperRect = $wrapper.getBoundingClientRect();
  var halfWidthItem = wrapperRect.width / 2;
  var count = this._$itemList.length;
  var translate;
  var clientRect;

  if (this._direction === 'next') {
    var wrapperLeft = wrapperRect.left;
    var $min = this._$itemWithMinOrder;
    translate = this._minTranslate;
    clientRect = $min.getBoundingClientRect();

    if (clientRect.right < wrapperLeft - halfWidthItem) {
      $min.dataset.order = this._minOrder + count;
      translate += count * 100;
      $min.dataset.translate = translate;
      $min.style.transform = 'translateX('.concat(translate, '%)');

      this._refreshExtremeValues();
    }
  } else if (this._direction === 'prev') {
    var wrapperRight = wrapperRect.right;
    var $max = this._$itemWithMaxOrder;
    translate = this._maxTranslate;
    clientRect = $max.getBoundingClientRect();

    if (clientRect.left > wrapperRight + halfWidthItem) {
      $max.dataset.order = this._maxOrder - count;
      translate -= count * 100;
      $max.dataset.translate = translate;
      $max.style.transform = 'translateX('.concat(translate, '%)');

      this._refreshExtremeValues();
    }
  }

  requestAnimationFrame(this._balancingItems.bind(this));
}; // adding listeners


SimpleAdaptiveSlider.prototype._addEventListener = function () {
  var $items = this._$items;

  function onClick(e) {
    var $target = e.target;

    this._autoplay('stop');

    if ($target.classList.contains('slider__control')) {
      e.preventDefault();
      this._direction = $target.dataset.slide;

      this._move();
    } else if ($target.dataset.slideTo) {
      e.preventDefault();
      var index = parseInt($target.dataset.slideTo);

      this._moveTo(index);
    }

    if (this._config.loop) {
      this._autoplay();
    }
  }

  function onTransitionStart() {
    this._balancingItemsFlag = true;
    window.requestAnimationFrame(this._balancingItems.bind(this));
  }

  function onTransitionEnd() {
    this._balancingItemsFlag = false;

    this._$root.dispatchEvent(new CustomEvent('slider.transition.end', {
      bubbles: true
    }));
  }

  function onMouseEnter() {
    this._autoplay('stop');
  }

  function onMouseLeave() {
    if (this._config.loop) {
      this._autoplay();
    }
  }

  function onSwipeStart(e) {
    this._autoplay('stop');

    var event = e.type.search('touch') === 0 ? e.touches[0] : e;
    this._swipeStartPosX = event.clientX;
    this._swipeStartPosY = event.clientY;
    this._hasSwipeState = true;
    this._hasSwiping = false;
  }

  function onSwipeMove(e) {
    if (!this._hasSwipeState) {
      return;
    }

    var event = e.type.search('touch') === 0 ? e.touches[0] : e;
    var diffPosX = this._swipeStartPosX - event.clientX;
    var diffPosY = this._swipeStartPosY - event.clientY;

    if (!this._hasSwiping) {
      if (Math.abs(diffPosY) > Math.abs(diffPosX)) {
        this._hasSwipeState = false;
        return;
      }

      this._hasSwiping = true;
    }

    e.preventDefault();

    if (!this._config.loop) {
      if (this._currentIndex + 1 >= this._$itemList.length && diffPosX >= 0) {
        diffPosX = diffPosX / 4;
      }

      if (this._currentIndex <= 0 && diffPosX <= 0) {
        diffPosX = diffPosX / 4;
      }
    }

    var value = diffPosX / this._$wrapper.getBoundingClientRect().width * 100;
    var translateX = this._transform - value;

    this._$items.classList.add(TRANSITION_NONE);

    this._$items.style.transform = 'translateX('.concat(translateX, '%)');
  }

  function onSwipeEnd(e) {
    if (!this._hasSwipeState) {
      return;
    }

    var event = e.type.search('touch') === 0 ? e.changedTouches[0] : e;
    var diffPosX = this._swipeStartPosX - event.clientX;

    if (!this._config.loop) {
      if (this._currentIndex + 1 >= this._$itemList.length && diffPosX >= 0) {
        diffPosX = diffPosX / 4;
      }

      if (this._currentIndex <= 0 && diffPosX <= 0) {
        diffPosX = diffPosX / 4;
      }
    }

    var value = diffPosX / this._$wrapper.getBoundingClientRect().width * 100;

    this._$items.classList.remove(TRANSITION_NONE);

    if (value > SWIPE_THRESHOLD) {
      this._direction = 'next';

      this._move();
    } else if (value < -SWIPE_THRESHOLD) {
      this._direction = 'prev';

      this._move();
    } else {
      this._direction = 'none';

      this._move();
    }

    this._hasSwipeState = false;

    if (this._config.loop) {
      this._autoplay();
    }
  }

  function onDragStart(e) {
    e.preventDefault();
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this._autoplay('stop');
    } else if (document.visibilityState === 'visible') {
      if (this._config.loop) {
        this._autoplay();
      }
    }
  } // click


  this._$root.addEventListener('click', onClick.bind(this)); // transitionstart and transitionend


  if (this._config.loop) {
    $items.addEventListener('transitionstart', onTransitionStart.bind(this));
    $items.addEventListener('transitionend', onTransitionEnd.bind(this));
  } // mouseenter and mouseleave


  if (this._config.autoplay) {
    this._$root.addEventListener('mouseenter', onMouseEnter.bind(this));

    this._$root.addEventListener('mouseleave', onMouseLeave.bind(this));
  } // swipe


  if (this._config.swipe) {
    var supportsPassive = false;

    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        }
      });
      window.addEventListener('testPassiveListener', null, opts);
    } catch (err) {}

    this._$root.addEventListener('touchstart', onSwipeStart.bind(this), supportsPassive ? {
      passive: false
    } : false);

    this._$root.addEventListener('touchmove', onSwipeMove.bind(this), supportsPassive ? {
      passive: false
    } : false);

    this._$root.addEventListener('mousedown', onSwipeStart.bind(this));

    this._$root.addEventListener('mousemove', onSwipeMove.bind(this));

    document.addEventListener('touchend', onSwipeEnd.bind(this));
    document.addEventListener('mouseup', onSwipeEnd.bind(this));
  }

  this._$root.addEventListener('dragstart', onDragStart.bind(this)); // при изменении активности вкладки


  document.addEventListener('visibilitychange', onVisibilityChange.bind(this));
}; // перейти к следующему слайду


SimpleAdaptiveSlider.prototype.next = function () {
  this._direction = 'next';

  this._move();
}; // перейти к предыдущему слайду


SimpleAdaptiveSlider.prototype.prev = function () {
  this._direction = 'prev';

  this._move();
}; // управление автоматической сменой слайдов


SimpleAdaptiveSlider.prototype.autoplay = function (action) {
  this._autoplay('stop');
}; // настройка слайдера


new SimpleAdaptiveSlider('.slider', {
  loop: true,
  autoplay: true,
  interval: 5000,
  swipe: true
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map