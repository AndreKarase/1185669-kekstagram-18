'use strict';

(function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
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

  var verifyComments = function () {
    commentsInput.setCustomValidity('');

    if (commentsInput.value.length > 140) {
      commentsInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    }
  };

  imgUploadSubmitBtn.addEventListener('click', function () {
    verifyHashtags();
    verifyComments();
  });
})();
