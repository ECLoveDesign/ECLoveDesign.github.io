
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


//bs-select
if ( $('.bs-select').length ) {
  $('.bs-select').selectpicker(); 
}

// WOW
new WOW().init();

// ckeditor
if ( $('.ckeditor').length ) {
  var elements = CKEDITOR.document.find( '.ckeditor' ),
    i = 0,
    element;
    while (( element = elements.getItem( i++ ) )) {
        CKEDITOR.replace( element );
  }

}

