'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photo, index) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.id = index + '';
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__info').insertAdjacentText('afterbegin', photo.description);
    photoElement.querySelector('.picture__likes').textContent = photo.likes + '';
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length + '';

    return photoElement;
  };

  window.fillBlockPhotos = function (block) {
    var fragment = document.createDocumentFragment(true);

    for (var i = 0; i < window.photos.length; i++) {
      fragment.appendChild(renderPhoto(window.photos[i], i));
    }

    block.appendChild(fragment);
  };

})();

