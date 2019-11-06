'use strict';

(function () {
  var TAGS_MAX = 5;
  var TAG_MAX_LENGTH = 20;
  var COMMENT_MAX_LENGTH = 140;

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
    hashtags = hashtags.filter(function (tag) {
      return tag !== '';
    });

    if (hashtags.length > TAGS_MAX) {
      hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      return;
    }

    hashtags.forEach(function (tag, i) {
      if (tag[0] !== '#') {
        hashtagsInput.setCustomValidity('Xэш-тег начинается с символа # (решётка)');
        return;
      }
      if (tag === '#') {
        hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      }
      if (tag.includes('#', 1)) {
        hashtagsInput.setCustomValidity('Xэш-теги разделяются пробелами');
        return;
      }
      if (tag.length > TAG_MAX_LENGTH) {
        hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        return;
      }
      if (i < hashtags.length - 1) {
        hashtags.slice(i + 1).forEach(function (anotherTag) {
          if (anotherTag.toLowerCase() === tag.toLowerCase()) {
            hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
            return;
          }
        });
      }
    });
  };

  var verifyComments = function () {
    commentsInput.setCustomValidity('');

    if (commentsInput.value.length > COMMENT_MAX_LENGTH) {
      commentsInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    }
  };

  imgUploadSubmitBtn.addEventListener('click', function () {
    verifyHashtags();
    verifyComments();
  });
})();
