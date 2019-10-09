'use strict';

(function () {

  window.data = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

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

  window.data.photos = createPhotoArray();
})();
