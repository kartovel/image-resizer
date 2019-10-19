var baseConfig = {
  quality: 0.85,
  autoRotate: true,
  debug: false
};
function resizeImage() {
  var image = document.querySelector("#image").files[0];
  var download = document.querySelector("#download");

  var fReader = new FileReader();

  fReader.readAsDataURL(image);
  fReader.onloadend = function(event) {
    var img = new Image();
    img.onload = function() {
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

      BrowserImageResizer.readAndCompressImage(image, config).then(function(
        resizedImage
      ) {
        // Open resizedImage in new tab as blob
        // console.log(resizedImage);
        // window.open(URL.createObjectURL(resizedImage));

        // Download resizedImage as blob as file
        download.href = URL.createObjectURL(resizedImage);
        download.download = image.name;
      });
    };
    img.src = fReader.result;
  };
}
