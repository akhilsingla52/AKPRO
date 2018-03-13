$(document).ready(function() {
    function setHeight() {
      windowHeight = $(window).innerHeight() - 50;
      $('body').css('height', windowHeight);
    };
    setHeight();
    
    $(window).resize(function() {
      setHeight();
    });
});