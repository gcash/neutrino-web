$().ready(function () {
  $('.faqs-q').each(function () {
    var $this = $(this),
        state = false,
        answer = $this.next('.faqs-a').slideUp(150);
    $this.click(function () {
      state = !state;
      answer.slideToggle(state);
      $this.toggleClass('active', state);
    });
  });
});
