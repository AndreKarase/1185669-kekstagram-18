'use strict';

(function () {
  var BASE = 10;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var STEP = 25;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleSmallerBtn = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBiggerBtn = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value');
  scaleValue.value = '100%';

  var changeScaleValue = function (delta) {
    var scale = parseInt(scaleValue.value, BASE) + delta;
    if (scale > SCALE_MAX) {
      scale = SCALE_MAX;
    }
    if (scale < SCALE_MIN) {
      scale = SCALE_MIN;
    }
    scaleValue.value = scale + '%';
    imgUploadPreview.style.transform = 'scale(' + (scale / 100.0) + ')';
  };

  scaleSmallerBtn.addEventListener('click', function () {
    changeScaleValue(-STEP);
  });

  scaleBiggerBtn.addEventListener('click', function () {
    changeScaleValue(STEP);
  });
})();
