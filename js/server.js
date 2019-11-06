'use strict';

(function () {
  var RECEIVE_URL = 'https://js.dump.academy/kekstagram/data';
  var TRANSMIT_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var OK = 200;

  window.server = {

    receive: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK) {
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

      xhr.timeout = TIMEOUT;

      xhr.open('GET', RECEIVE_URL);
      xhr.send();
    },

    transmit: function (data, successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK) {
          successHandler();
        } else {
          errorHandler();
        }
      });

      xhr.open('POST', TRANSMIT_URL);
      xhr.send(data);
    }
  };
})();
