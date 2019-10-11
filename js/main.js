'use strict';

(function () {
  var picturesBlockElement = document.querySelector('.pictures');

  var successHandler = function (photos) {
    window.photos = photos;
    window.fillBlockPhotos(picturesBlockElement);
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content.querySelector('.error');

    errorTemplate.querySelector('.error__title').textContent = errorMessage;
    errorTemplate.querySelector('.error__buttons').classList.add('hidden');

    document.body.insertAdjacentElement('afterbegin', errorTemplate);
  };

  window.server.receive(successHandler, errorHandler);
})();
