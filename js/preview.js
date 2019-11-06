'use strict';

(function () {
  var ADD = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');

  var bigPictureEscPressHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var showBigPicture = function (element) {

    if (element.className !== 'picture') {
      return;
    }

    bigPicture.classList.remove('hidden');
    var photo = window.photos[+element.id];

    bigPictureImg.lastElementChild.src = photo.url;
    bigPictureLikes.textContent = photo.likes + '';
    bigPictureCommentsCount.textContent = photo.comments.length;
    var bigPictureComments = bigPicture.querySelector('.social__comments');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var commentsClone = bigPictureComments.cloneNode();
    var visionComments = 0;

    var loadComments = function () {
      commentsLoader.classList.remove('visually-hidden');
      visionComments += ADD;

      var socialCommentCount = bigPicture.querySelector('.social__comment-count');
      socialCommentCount.textContent = Math.min(visionComments, photo.comments.length) +
      ' из ' + photo.comments.length + ' комментариев';

      for (var i = visionComments - ADD; i < visionComments && i < photo.comments.length; i++) {
        if (i === photo.comments.length - 1) {
          commentsLoader.classList.add('visually-hidden');
        }

        var commentElement = bigPictureComment.cloneNode(true);
        var socialPicture = commentElement.querySelector('.social__picture');
        var socialText = commentElement.querySelector('.social__text');

        socialPicture.src = photo.comments[i].avatar;
        socialPicture.alt = photo.comments[i].name;
        socialText.textContent = photo.comments[i].message;

        commentsClone.appendChild(commentElement);
      }
    };

    loadComments();
    commentsLoader.addEventListener('click', loadComments);

    bigPictureComments.replaceWith(commentsClone);
    bigPictureDescription.textContent = photo.description;

    // bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    // bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    document.addEventListener('keydown', bigPictureEscPressHandler);
  };

  var picturesBlockElement = document.querySelector('.pictures');

  picturesBlockElement.addEventListener('click', function (evt) {
    showBigPicture(evt.target.parentElement);
  });

  picturesBlockElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      evt.preventDefault();
      showBigPicture(evt.target);
    }
  });

  var bigPictureCancel = bigPicture.querySelector('#picture-cancel');

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.addEventListener('keydown', bigPictureEscPressHandler);
  };

  bigPictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

})();
