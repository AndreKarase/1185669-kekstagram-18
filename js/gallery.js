'use strict';

(function () {
  var picturesBlockElement = document.querySelector('.pictures');
  var initialElements = [].slice.call(picturesBlockElement.children);
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photo, index) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.id = index + '';
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes + '';
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length + '';

    return photoElement;
  };

  window.fillBlockPhotos = function () {
    picturesBlockElement.innerHTML = '';
    var fragment = document.createDocumentFragment();

    initialElements.forEach(function (element) {
      fragment.appendChild(element);
    });

    window.photos.forEach(function (photo, index) {
      fragment.appendChild(renderPhoto(photo, index));
    });

    picturesBlockElement.appendChild(fragment);
  };

})();
