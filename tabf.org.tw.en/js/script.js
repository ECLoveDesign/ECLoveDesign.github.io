
new WOW().init();

if ($(document).width() > 900) {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

// scolltop
var btn = $('.btn-top');
$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '10000');
});


// WOW
new WOW().init();

// overlay
$('.btn-search,.search-wrap .btn-close').click(function() {
  $('.search-wrap').toggleClass('open');
});
// $('.overlay-menu a').click(function() {
//   $('.search-cont').toggleClass('open');
//   return false;
// });