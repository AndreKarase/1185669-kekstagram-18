'use strict';

var PHOTOS_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTS_NUMBER = 2;

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var AUTORS_NAMES = [
  'Артем',
  'Антон',
  'Александр',
  'Алиса',
  'Кира',
  'Ева',
];

var autors = [];
for (var i = 0; i < AUTORS_NAMES.length; i++) {
  autors[i] = {
    name: AUTORS_NAMES[i],
    avatar: 'img/avatar-' + (i + 1) + '.svg'
  };
}

var randomData = function (data) {
  var index = Math.floor(Math.random() * data.length);
  return data[index];
};

var createPhotoArray = function () {
  var arr = [];
  for (i = 0; i < PHOTOS_NUMBER; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание',
      likes: Math.floor(MIN_LIKES + Math.random() * (MAX_LIKES - MIN_LIKES)),
      comments: []
    };

    for (var j = 0; j < COMMENTS_NUMBER; j++) {
      var autor = randomData(autors);
      arr[i].comments[j] = {
        message: randomData(MESSAGES),
        name: autor.name,
        avatar: autor.avatar
      };
    }
  }

  return arr;
};

var photos = createPhotoArray();

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__info').insertAdjacentText('afterbegin', photo.description);
  photoElement.querySelector('.picture__likes').textContent = photo.likes + '';
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length + '';

  return photoElement;
};

var fillBlockPhotos = function (block) {
  var fragment = document.createDocumentFragment(true);

  for (i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }

  block.appendChild(fragment);
};

var picturesBlockElement = document.querySelector('.pictures');
fillBlockPhotos(picturesBlockElement);

// -------------------------------------------------------------

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var uploadFileInput = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
};

uploadFileInput.addEventListener('change', function () {
  showPopup();
});

imgUploadCancel.addEventListener('click', function () {
  closePopup();
});

imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var effectsList = imgUploadOverlay.querySelector('.effects__list');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectlevelBar = imgUploadOverlay.querySelector('.img-upload__effect-level');
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
};

var calculateLevel = function (evt, min, max) {
  var widthLevelLine = effectLevelPin.parentElement.offsetWidth;
  return min + (max - min) / widthLevelLine * evt.offsetX;
};

var changeEffectLevel = function (evt) {
  if (currentEffect === 'chrome') {
    imgUploadPreview.style.filter = 'grayscale(' + calculateLevel(evt, 0.0, 1.0) + ')';
  } else
  if (currentEffect === 'sepia') {
    imgUploadPreview.style.filter = 'sepia(' + calculateLevel(evt, 0.0, 1.0) + ')';
  } else
  if (currentEffect === 'marvin') {
    imgUploadPreview.style.filter = 'invert(' + calculateLevel(evt, 0.0, 100.0) + '%)';
  } else
  if (currentEffect === 'phobos') {
    imgUploadPreview.style.filter = 'blur(' + calculateLevel(evt, 0.0, 3.0) + 'px)';
  } else
  if (currentEffect === 'heat') {
    imgUploadPreview.style.filter = 'brightness(' + calculateLevel(evt, 1.0, 3.0) + ')';
  }
};

effectsList.addEventListener('change', function (evt) {
  changeEffect(evt);
});

effectLevelPin.addEventListener('mousedown', function () {
  effectLevelPin.parentElement.addEventListener('mouseup', function (evt) {
    changeEffectLevel(evt);
  });
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
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

commentsInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
  for (i = 0; i < hashtags.length; i++) {
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
