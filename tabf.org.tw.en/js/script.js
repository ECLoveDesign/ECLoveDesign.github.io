
// page load
var onEnterViewPort = function(entries, observer) {
  entries.forEach(function(entry) {
    console.log(entry);
    // Fade in when we enter the viewport
    if (entry.intersectionRatio !== 0) {
      entry.target.classList.add('in');
    }
    // Fade back out when we leave the viewport
    else {
      entry.target.classList.remove('in');
    }
  })
}
var observer =  new IntersectionObserver(onEnterViewPort , {
});

var hidemes= document.querySelectorAll('.effect');
for(var i = 0; i < hidemes.length; ++i) {
  observer.observe(hidemes[i]);
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

// btn-social
var btnSocial = $('.btn-social');
$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btnSocial.addClass('show');
  } else {
    btnSocial.removeClass('show');
  }
});

// overlay
$('.btn-search,.search-wrap .btn-close').click(function () {

  $('.search-wrap').toggleClass('open');
  return false;

});
// $('.overlay-menu a').click(function() {
//   $('.search-cont').toggleClass('open');
//   return false;
// });


// twbsPagination
if ($('.twbsPagination').length) {
  $('.twbsPagination').twbsPagination({
    totalPages: 16,
    visiblePages: 6,
    first: '&laquo',
    last: '&raquo',
    prev: '&lt',
    next: '&gt',
    // totalPages: data.total_pages,
    visiblePages: 5,
    initiateStartPageClick: false,
    // onPageClick: function (event, page) {
    //     $('#page-content').text('Page ' + page) + ' content here';
    // }
  });
}



// submit
if ($('.needs-validation').length) {


  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict';
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

}