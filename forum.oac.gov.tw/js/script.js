
// header 
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > navbarHeight){
        $('header').addClass('scrollUp');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('scrollUp');
        }
    }
    
    lastScrollTop = st;
}

$(window).scroll(function () {
  if ($(this).scrollTop() > 40) {
    $("header").addClass('affix');
  } else {
    $("header").removeClass('affix');
  }
});



// scolltop
var btn = $('.btn-top');
// $(window).scroll(function () {
//   if ($(window).scrollTop() > 300) {
//     btn.addClass('show');
//   } else {
//     btn.removeClass('show');
//   }
// });

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});


// menu 
$('document').ready(function() {

  var w = $(window).width();
  if (w < 992) {
    $('#mainNav .nav-link').click(function(){
      $('#mainNav').removeClass('show');
      $('.navbar-toggler').attr("aria-expanded","false");
    });
  }

})

// affix top
// $(window).scroll(function () {
//   if ($(this).scrollTop() > 40) {
//     $("header").addClass('affix');
//   } else {
//     $("header").removeClass('affix');
//   }

// });


// anchor
$(document).ready(function () {
  $('a[href*=#]').bind('click', function (e) {
    e.preventDefault(); // prevent hard jump, the default behavior

    var target = $(this).attr("href"); // Set the target as variable

    // perform animated scrolling by getting top-position of target-element and set it as scroll target
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top
    }, 600, function () {
      location.hash = target; //attach the hash (#jumptarget) to the pageurl
    });

    return false;
  });
});


// speaker-wrap
if ( $('.speaker-wrap').length ) {
  var swiper = new Swiper('.speaker-wrap .swiper-container', {    
    slidesPerView: 4,
    nextButton: '.speaker-wrap .swiper-button-next',
    prevButton: '.speaker-wrap .swiper-button-prev',
    spaceBetween: 30,
    breakpoints: { 
      768: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      1024: { 
        slidesPerView: 2,
        spaceBetween: 10
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
});
}

//device
var version = detectIE();
function detectIE() {
  var e = window.navigator.userAgent,
    t = e.indexOf("MSIE ");
  if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  if (e.indexOf("Trident/") > 0) {
    var o = e.indexOf("rv:");
    return parseInt(e.substring(o + 3, e.indexOf(".", o)), 10);
  }
  var i = e.indexOf("Edge/");
  return i > 0 && parseInt(e.substring(i + 5, e.indexOf(".", i)), 10);
}
(document.body.className += !1 === version ? "edge" : version >= 12 ? "edge" : "ie" + version),
  ($.browser.chrome = $.browser.webkit && !!window.chrome),
  ($.browser.safari = $.browser.webkit && !window.chrome),
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $("body").addClass("mobile"),
  $.browser.chrome && $("body").addClass("chrome").removeClass("edge"),
  $.browser.safari && $("body").addClass("safari"),
  -1 != navigator.appVersion.indexOf("Edge") && (document.body.className += " edge");

