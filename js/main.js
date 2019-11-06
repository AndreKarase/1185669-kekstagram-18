'use strict';

(function () {
  var RANDOM_PHOTOS_NUMBER = 10;

  var imgFilters = document.querySelector('.img-filters');

  var getRandomData = function (array, number) {
    var arrayCopy = array.slice();
    var randomItems = [];

    for (var i = 0; i < number; i++) {
      var index = Math.floor(Math.random() * arrayCopy.length);
      randomItems.push(arrayCopy[index]);
      arrayCopy.splice(index, 1);
    }

    return randomItems;
  };

  var popularPhotos;

  var updateGalery = function (evt) {
    switch (evt.target.id) {
      case 'filter-popular':
        window.photos = popularPhotos.slice();
        window.fillBlockPhotos();
        break;

      case 'filter-random':
        window.photos = getRandomData(popularPhotos, RANDOM_PHOTOS_NUMBER);
        window.fillBlockPhotos();
        break;

      case 'filter-discussed':
        window.photos = popularPhotos
          .slice()
          .sort(function (left, right) {
            var commentsDiff = right.comments.length - left.comments.length;

            if (commentsDiff === 0) {
              commentsDiff = right.id - left.id;
            }

            return commentsDiff;
          });
        window.fillBlockPhotos();
        break;
    }
  };

  var activeButton = imgFilters.querySelector('#filter-popular');

  imgFilters.addEventListener('click', function (evt) {
    activeButton.classList.remove('img-filters__button--active');
    activeButton = evt.target;
    activeButton.classList.add('img-filters__button--active');
  });

  imgFilters.addEventListener('click', window.debounce(function (evt) {
    updateGalery(evt);
  }));

  var successHandler = function (photos) {
    window.photos = photos;
    popularPhotos = photos.slice();
    window.fillBlockPhotos(window.photos);
    imgFilters.classList.remove('img-filters--inactive');
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
