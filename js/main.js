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

var AUTORS = [{
  name: 'Артем',
  avatar: 'img/avatar-1.svg'
},
{
  name: 'Антон',
  avatar: 'img/avatar-2.svg'
},
{
  name: 'Александр',
  avatar: 'img/avatar-3.svg'
},
{
  name: 'Ева',
  avatar: 'img/avatar-4.svg'
},
{
  name: 'Алиса',
  avatar: 'img/avatar-5.svg'
},
{
  name: 'Кира',
  avatar: 'img/avatar-6.svg'
}
];

var randomData = function (data) {
  var index = Math.floor(Math.random() * data.length);
  return data[index];
};

var createPhotoArray = function () {
  var arr = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание',
      likes: Math.floor(MIN_LIKES + Math.random() * (MAX_LIKES - MIN_LIKES)),
      comments: []
    };

    for (var j = 0; j < COMMENTS_NUMBER; j++) {
      var autor = randomData(AUTORS);
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

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }

  block.appendChild(fragment);
};

var picturesBlockElement = document.querySelector('.pictures');
fillBlockPhotos(picturesBlockElement);
