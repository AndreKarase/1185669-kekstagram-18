'use strict';

(function () {

  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var effectlevelBar = imgUploadOverlay.querySelector('.img-upload__effect-level');

  var escPressHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
    }
  };

  var showPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    effectlevelBar.classList.add('hidden');
    document.addEventListener('keydown', escPressHandler);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
    uploadFileInput.value = '';
    imgUploadPreview.style.transform = 'scale(1)';
    effectsList.querySelector('#effect-none').checked = true;
    effectLevelValue.value = '100';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.classList.remove('effects__preview--' + window.currentEffect);
    imgUploadPreview.classList.add('effects__preview--none');
    effectLevelPin.style.left = effectLevelPin.parentElement.offsetWidth + 'px';
    hashtagsInput.value = '';
    commentsInput.value = '';
  };

  uploadFileInput.addEventListener('change', function () {
    showPopup();
  });

  imgUploadCancel.addEventListener('click', function () {
    closePopup();
  });

  imgUploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup();
    }
  });

  var imgUploadForm = document.querySelector('.img-upload__form');
  var effectsList = imgUploadOverlay.querySelector('.effects__list');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value');
  var hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
  var commentsInput = imgUploadOverlay.querySelector('.text__description');

  scaleValue.defaultValue = '100%';

  var showMessage = function (messageElement) {
    closePopup();
    document.querySelector('main').appendChild(messageElement);

    var messageEscPressHandler = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeMessage();
      }
    };

    var outOfClickHandler = function (evt) {
      if (evt.target === messageElement) {
        closeMessage();
      }
    };

    var closeMessage = function () {
      messageElement.remove();
      document.removeEventListener('keydown', messageEscPressHandler);
    };

    var buttons = messageElement.querySelectorAll('button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        closeMessage();
      });
    });

    document.addEventListener('keydown', messageEscPressHandler);
    messageElement.addEventListener('click', outOfClickHandler);

  };

  var successHandler = function () {
    showMessage(successMessage);
  };

  var errorHandler = function () {
    showMessage(errorMessage);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.server.transmit(new FormData(imgUploadForm), successHandler, errorHandler);
    evt.preventDefault();
  });

  var errorMessage = document.querySelector('#error')
    .content.querySelector('.error');

  var successMessage = document.querySelector('#success')
    .content.querySelector('.success');

})();
