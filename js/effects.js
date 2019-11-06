'use strict';

(function () {
  var GRAYSCALE_MIN = 0.0;
  var GRAYSCALE_MAX = 1.0;
  var SEPIA_MIN = 0.0;
  var SEPIA_MAX = 1.0;
  var INVERT_MIN = 0.0;
  var INVERT_MAX = 100.0;
  var BLUR_MIN = 0.0;
  var BLUR_MAX = 3.0;
  var BRIGHTNESS_MIN = 1.0;
  var BRIGHTNESS_MAX = 3.0;
  var PIN_OFFSET_MIN = 0;
  var EFFECT_VALUE_MIN = 0.0;
  var EFFECT_VALUE_MAX = 100.0;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectsList = imgUploadOverlay.querySelector('.effects__list');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectlevelBar = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectlevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');

  var changeEffect = function (evt) {
    if (evt.target.value === 'none') {
      effectlevelBar.classList.add('hidden');
    } else {
      effectlevelBar.classList.remove('hidden');
    }
    imgUploadPreview.style.filter = '';
    imgUploadPreview.classList.remove('effects__preview--' + window.currentEffect);

    window.currentEffect = evt.target.value;
    imgUploadPreview.classList.add('effects__preview--' + window.currentEffect);
    effectLevelPin.style.left = effectLevelPin.parentElement.offsetWidth + 'px';
    effectLevelValue.value = '100';
    effectlevelDepth.style.width = effectLevelValue.value + '%';
  };

  var calculateLevel = function (min, max) {
    var widthLevelLine = effectLevelPin.parentElement.offsetWidth;
    return effectLevelPin.offsetLeft / widthLevelLine * (max - min) + min;
  };

  var changeEffectLevel = function () {
    if (window.currentEffect === 'chrome') {
      imgUploadPreview.style.filter = 'grayscale(' + calculateLevel(GRAYSCALE_MIN, GRAYSCALE_MAX) + ')';
    } else
    if (window.currentEffect === 'sepia') {
      imgUploadPreview.style.filter = 'sepia(' + calculateLevel(SEPIA_MIN, SEPIA_MAX) + ')';
    } else
    if (window.currentEffect === 'marvin') {
      imgUploadPreview.style.filter = 'invert(' + calculateLevel(INVERT_MIN, INVERT_MAX) + '%)';
    } else
    if (window.currentEffect === 'phobos') {
      imgUploadPreview.style.filter = 'blur(' + calculateLevel(BLUR_MIN, BLUR_MAX) + 'px)';
    } else
    if (window.currentEffect === 'heat') {
      imgUploadPreview.style.filter = 'brightness(' + calculateLevel(BRIGHTNESS_MIN, BRIGHTNESS_MAX) + ')';
    }
  };

  effectsList.addEventListener('change', function (evt) {
    changeEffect(evt);
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPos = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var min = PIN_OFFSET_MIN;
      var max = effectLevelPin.parentElement.offsetWidth;

      var shift = moveEvt.clientX - startPos;
      startPos = moveEvt.clientX;

      if (effectLevelPin.offsetLeft + shift > min &&
        effectLevelPin.offsetLeft + shift < max) {

        effectLevelPin.style.left = (effectLevelPin.offsetLeft + shift) + 'px';
        effectLevelValue.value = Math.round(calculateLevel(EFFECT_VALUE_MIN, EFFECT_VALUE_MAX));
        effectlevelDepth.style.width = effectLevelValue.value + '%';
        changeEffectLevel();
      }
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });
})();
