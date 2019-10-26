'use strict';

(function () {
  var RECEIVE_URL = 'https://js.dump.academy/kekstagram/data';

  window.server = {
    receive: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          successHandler(xhr.response);
        } else {
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', RECEIVE_URL);
      xhr.send();
    },
  };
})();
