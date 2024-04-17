
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


// twbsPagination
if ( $('.twbsPagination').length ) {
  $('.twbsPagination').twbsPagination({
    totalPages: 16,
    visiblePages: 6,
    first:'&laquo',
    last:'&raquo',
    prev: '&lt',
    next: '&gt',
    // totalPages: data.total_pages,
    visiblePages:5,
    initiateStartPageClick: false,
    // onPageClick: function (event, page) {
    //     $('#page-content').text('Page ' + page) + ' content here';
    // }
  });
}
