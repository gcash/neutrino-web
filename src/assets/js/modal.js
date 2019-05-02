$(document).ready(function() {

  function showModal(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#modal').addClass('open');
  }
  
  function hideModal(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#modal').removeClass('open');
  }
  
  $('.modal-open').click(showModal);
  $('.modal-close').click(hideModal);
});
