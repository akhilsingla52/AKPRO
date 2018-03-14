$(document).ready(function() {
    function setHeight() {
      windowHeight = $(window).innerHeight();
      $('body').css('height', windowHeight);
    };
    setHeight();
    
    $(window).resize(function() {
      setHeight();
    });
});