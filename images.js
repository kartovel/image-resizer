var baseConfig = {
    quality: 0.9,
    autoRotate: true,
    debug: true
  };

  function resizeImage() {
    var image = document.querySelector("#image").files[0];
    var download = document.querySelector("#download");

    var fReader = new FileReader();

    fReader.readAsDataURL(image);
    fReader.onloadend = function(event) {
      var img = new Image();
      img.onload = function() {
        console.log(img.width);
        if (img.width >= img.height) {
          var maxSize = {
            maxWidth: 300
          };
        } else {
          var maxSize = {
            maxWidth: 280
          };
        }
        var config = {
          ...baseConfig,
          ...maxSize
        };

        BrowserImageResizer.readAndCompressImage(image, config).then(
          function(resizedImage) {
            download.href = URL.createObjectURL(resizedImage);
          }
        );
      };
      img.src = fReader.result;
    };
  }