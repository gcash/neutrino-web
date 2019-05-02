$(document).ready(function() {
  function initializeClipboard(selector) {
    var clipboard = new Clipboard(selector);
    var successClass = selector.replace(/^\./, "") + '-success';
    clipboard.on('success', function(e) {
      $(selector).addClass(successClass);
      setTimeout(function () {
        $(selector).removeClass(successClass);
      },1000);
    });
    clipboard.on('error', function(e) {
      console.log(e);
    });
  }
  initializeClipboard('.footerDonate-btn');
});
