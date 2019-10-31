'use strict';

(function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleSmallerBtn = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBiggerBtn = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value');
  scaleValue.value = '100%';

  var changeScaleValue = function (delta) {
    var scale = parseInt(scaleValue.value, 10) + delta;
    if (scale > 100) {
      scale = 100;
    }
    if (scale < 25) {
      scale = 25;
    }
    scaleValue.value = scale + '%';
    imgUploadPreview.style.transform = 'scale(' + (scale / 100.0) + ')';
  };

  scaleSmallerBtn.addEventListener('click', function () {
    changeScaleValue(-25);
  });

  scaleBiggerBtn.addEventListener('click', function () {
    changeScaleValue(25);
  });
})();
