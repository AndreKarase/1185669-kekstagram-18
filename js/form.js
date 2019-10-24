'use strict';

(function () {

  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

  var escPressHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
    }
  };

  window.showPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    effectlevelBar.classList.add('hidden');
    document.addEventListener('keydown', escPressHandler);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
    uploadFileInput.value = '';
  };

  uploadFileInput.addEventListener('change', function () {
    window.showPopup();
  });

  imgUploadCancel.addEventListener('click', function () {
    closePopup();
  });

  imgUploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup();
    }
  });

  var effectsList = imgUploadOverlay.querySelector('.effects__list');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectlevelBar = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectlevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
  var currentEffect;

  var changeEffect = function (evt) {
    if (evt.target.value === 'none') {
      effectlevelBar.classList.add('hidden');
    } else {
      effectlevelBar.classList.remove('hidden');
    }
    imgUploadPreview.style.filter = '';
    imgUploadPreview.classList.remove('effects__preview--' + currentEffect);

    currentEffect = evt.target.value;
    imgUploadPreview.classList.add('effects__preview--' + currentEffect);
    effectLevelPin.style.left = effectLevelPin.parentElement.offsetWidth + 'px';
    effectLevelValue.value = '100';
    effectlevelDepth.style.width = effectLevelValue.value + '%';
  };

  var calculateLevel = function (min, max) {
    var widthLevelLine = effectLevelPin.parentElement.offsetWidth;
    return effectLevelPin.offsetLeft / widthLevelLine * (max - min) + min;
  };

  var changeEffectLevel = function () {
    if (currentEffect === 'chrome') {
      imgUploadPreview.style.filter = 'grayscale(' + calculateLevel(0.0, 1.0) + ')';
    } else
    if (currentEffect === 'sepia') {
      imgUploadPreview.style.filter = 'sepia(' + calculateLevel(0.0, 1.0) + ')';
    } else
    if (currentEffect === 'marvin') {
      imgUploadPreview.style.filter = 'invert(' + calculateLevel(0.0, 100.0) + '%)';
    } else
    if (currentEffect === 'phobos') {
      imgUploadPreview.style.filter = 'blur(' + calculateLevel(0.0, 3.0) + 'px)';
    } else
    if (currentEffect === 'heat') {
      imgUploadPreview.style.filter = 'brightness(' + calculateLevel(1.0, 3.0) + ')';
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
      var min = 0;
      var max = effectLevelPin.parentElement.offsetWidth;

      var shift = moveEvt.clientX - startPos;
      startPos = moveEvt.clientX;

      if (effectLevelPin.offsetLeft + shift > min &&
        effectLevelPin.offsetLeft + shift < max) {

        effectLevelPin.style.left = (effectLevelPin.offsetLeft + shift) + 'px';
        effectLevelValue.value = Math.round(calculateLevel(0.0, 100.0));
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

  var scaleSmallerBtn = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBiggerBtn = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value');
  scaleValue.value = '100%';

  var changeScaleValue = function (delta) {
    var scale = parseInt(scaleValue.value, 10) + delta;
    if (scale > 100) {
      scale = 100;
    }
    if (scale < 25) {
      scale = 25;
    }
    scaleValue.value = scale + '%';
    imgUploadPreview.style.transform = 'scale(' + (scale / 100.0) + ')';
  };

  scaleSmallerBtn.addEventListener('click', function () {
    changeScaleValue(-25);
  });

  scaleBiggerBtn.addEventListener('click', function () {
    changeScaleValue(25);
  });

  var hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
  var commentsInput = imgUploadOverlay.querySelector('.text__description');
  var imgUploadSubmitBtn = imgUploadOverlay.querySelector('.img-upload__submit');

  hashtagsInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  commentsInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  var verifyHashtags = function () {
    if (hashtagsInput.value === '') {
      return;
    }

    hashtagsInput.setCustomValidity('');
    var hashtags = hashtagsInput.value.split(' ');

    if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      return;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] + '' !== '#') {
        hashtagsInput.setCustomValidity('Xэш-тег начинается с символа # (решётка)');
        return;
      }
      if (hashtags[i] === '#') {
        hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      }
      if (hashtags[i].includes('#', 1)) {
        hashtagsInput.setCustomValidity('Xэш-теги разделяются пробелами');
        return;
      }
      if (hashtags[i].length > 20) {
        hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        return;
      }
      if (i < hashtags.length - 1) {
        for (var j = i + 1; j < hashtags.length; j++) {
          if (hashtags[j].toLowerCase() === hashtags[i].toLowerCase()) {
            hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
            return;
          }
        }
      }
    }
  };

  imgUploadSubmitBtn.addEventListener('click', function () {
    verifyHashtags();
  });

  commentsInput.maxLength = '140';
  var y = document.querySelector('#upload-select-image');
  y.action = 'https://js.dump.academy/kekstagram';

  var errorMessage = document.querySelector('#error')
    .content.querySelector('.error');

  var successMessage = document.querySelector('#success')
    .content.querySelector('.success');

  imgUploadSubmitBtn.addEventListener('click', function (evt) {

    if (commentsInput.validity.valid) {
      imgUploadSubmitBtn.after(successMessage);
    } else {
      evt.preventDefault();
      imgUploadSubmitBtn.after(errorMessage);
    }
  });

})();
