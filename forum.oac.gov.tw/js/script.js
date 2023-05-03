
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
$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});



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


// menu
$('.menu-toggle').on('click', function () {
  $('body').toggleClass('open');
});
$('.overlay-nav a').on('click', function () {
  $('body').removeClass('open');
});


// audio
var track = document.getElementById('track');
var controlBtn = document.getElementById('play-pause');
var controlBtn2 = document.getElementById('play-pause2');

function playPause() {
    if (track.paused) {
        track.play();
        $('.btn-audio').addClass('paused');
    } else { 
        track.pause();
        $('.btn-audio').removeClass('paused');
    }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn.className = "play";
});
controlBtn2.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn2.className = "play";
});


// feedback-group
$(function() {
  $('.feedback-group>[class*="col-"]:nth-of-type(1)').data('wow-delay','0.1s');
  $('.feedback-group>[class*="col-"]:nth-of-type(2)').data('wow-delay','0.3s');
  $('.feedback-group>[class*="col-"]:nth-of-type(3)').data('wow-delay','0.5s');
  $('.feedback-group>[class*="col-"]:nth-of-type(4)').data('wow-delay','0.7s');
  $('.feedback-group>[class*="col-"]:nth-of-type(5)').data('wow-delay','0.9s');
  $('.feedback-group>[class*="col-"]:nth-of-type(6)').data('wow-delay','1.1s');
  $('.feedback-group>[class*="col-"]:nth-of-type(7)').data('wow-delay','1.3s');
  $('.feedback-group>[class*="col-"]:nth-of-type(8)').data('wow-delay','1.5s');
});

$(function() {
  chooseRandom(messageList, 10).forEach((i) => {
    document.getElementById("messageListCont").innerHTML +=
        '<div class="col-lg-3 col-md-4 col-sm-6 col-12"><div class="card wow bounceInUp"><div class="card-cont"><div class="card-header"><div class="card-header-wrap"><div class="avatar"><img src="./images/avatar/' +
        i[0] +
        '.svg" onerror="imgError(this)"></div><h5 class="name">' +
        i[3] +
        '</h5><span class="school">' +
        i[1] +
        '</span></div></div><div class="card-body"><div class="card-body-wrap"><p>' +
        i[4] +
        "</p></div></div></div></div></div>";
  });
});

$('#getrandom').click(function() {
  $('#messageListCont').empty()
  chooseRandom(messageList, 10).forEach((i) => {
    document.getElementById("messageListCont").innerHTML +=
        '<div class="col-lg-3 col-md-4 col-sm-6 col-12"><div class="card wow bounceInUp"><div class="card-cont"><div class="card-header"><div class="card-header-wrap"><div class="avatar"><img src="./images/avatar/' +
        i[0] +
        '.svg" onerror="imgError(this)"></div><h5 class="name">' +
        i[3] +
        '</h5><span class="school">' +
        i[1] +
        '</span></div></div><div class="card-body"><div class="card-body-wrap"><p>' +
        i[4] +
        "</p></div></div></div></div></div>";
  });
});

// news-swiper
var news_swiper = new Swiper(".news-swiper", {
  loop: true,
  navigation: {
      nextEl: ".news-btn-next",
      prevEl: ".news-btn-prev",
  },
  breakpoints: {
      320: {
          slidesPerView: 1,
          spaceBetween: 25,

      },
      768: {
          slidesPerView: 1,
          spaceBetween: 25,

      },
      1366: {
          slidesPerView: 2,
          spaceBetween: 20,

      },
      1920: {
          slidesPerView: 3,
          spaceBetween: 30,

      },
  },
});

// column-swiper
var column_swiper = new Swiper(".column-swiper", {
  // loop: true,
  navigation: {
      nextEl: ".column-btn-next",
      prevEl: ".column-btn-prev",
  },
  spaceBetween: 0,
  breakpoints: {
      310: {
          slidesPerView: 1,
          spaceBetween: 100,

      },
      540: {
          slidesPerView: 2,
          spaceBetween: 0,

      },
      1280: {
          slidesPerView: 2,

      },
      1366: {
          slidesPerView: 3,

      },
  },
});



// support-swiper
var support_swiper = new Swiper(".support-swiper", {
  // slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
      320: {
          slidesPerView: 1,
          spaceBetween: 25,

      },
      500: {
          slidesPerView: 2,
          spaceBetween: 25,

      },
      768: {
          slidesPerView: 3,
          spaceBetween: 20,

      },
      // 1000: {
      //     slidesPerView: 3,
      //     spaceBetween: 20,

      // },
      1100: {
          slidesPerView: 4,
          spaceBetween: 30,

      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      // 1800: {
      //     slidesPerView: "auto",
      //     spaceBetween: 260,

      // }
  },
});

// student-swiper 
$('document').ready(function() {
    
  var w = $(window).width();
  // var h = $(window).height();
  // var $window = $(window);
  
  if (w >= 1100) {
      var gallery_swiper = new Swiper(".gallery-swiper", {
          slidesPerView: 1,
          loop: true,
          loopedSlides: 3,
          pagination: {
              el: ".student-pagination",
              type: 'fraction',
              formatFractionCurrent: function(number) {
                  if (number < 10) {
                      number = '0' + number;
                  }
                  return number;
              },
              formatFractionTotal: function(number) {
                  if (number < 10) {
                      number = '0' + number;
                  }
                  return number;
              }
          },
          navigation: {
              nextEl: ".student-btn-next",
              prevEl: ".student-btn-prev",
          },
          thumbs: {
              swiper: {
                  el: '.caption-swiper',
                  slidesPerView: 1,
                  watchSlidesVisibility: true,
                  loop: true,
                  loopedSlides: 3,
                  effect: "fade",
                  noSwiping: true,
                  pagination: {
                      el: ".student-pagination",
                      clickable: true,

                  }
              }
          },
          autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
          },
          speed: 1000,
          breakpoints: {
              500: {
                  slidesPerView: 1,
                  spaceBetween: 50,

              },
              1000: {
                  slidesPerView: "auto",
                  spaceBetween: 100,

              },
              1100: {
                  slidesPerView: "auto",
                  spaceBetween: 150,

              },
              // 1370: {
              //     slidesPerView: "auto",
              //     spaceBetween: 200
              // },
              // 1800: {
              //     slidesPerView: "auto",
              //     spaceBetween: 260,

              // }
          },
      });
  }
  if (w < 1100) {
      var gallery_swiper = new Swiper(".gallery-swiper", {
          slidesPerView: 1,
          loop: true,
          loopedSlides: 3,
          pagination: {
              el: ".student-pagination",
              clickable: true,
          },
          navigation: {
              nextEl: ".student-btn-next",
              prevEl: ".student-btn-prev",
          },
          thumbs: {
              swiper: {
                  el: '.caption-swiper',
                  slidesPerView: 1,
                  watchSlidesVisibility: true,
                  loop: true,
                  loopedSlides: 3,
                  effect: "fade",
                  noSwiping: true,
                  pagination: {
                      el: ".student-pagination",
                      clickable: true,

                  }
              }
          },
          autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
          },
          speed: 1000,
          breakpoints: {
              500: {
                  slidesPerView: 1,
                  spaceBetween: 50,

              },
              1000: {
                  slidesPerView: "auto",
                  spaceBetween: 100,

              },
              1100: {
                  slidesPerView: "auto",
                  spaceBetween: 150,

              },
              1370: {
                  slidesPerView: "auto",
                  spaceBetween: 200
              },
              1800: {
                  slidesPerView: "auto",
                  spaceBetween: 260,

              }
          },
      });
  }

})





// count 
var a = 0;
$(window).scroll(function () {
  var oTop = $(".counter-box").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-number");
      $({
        countNum: $this.text()
      }).animate(
        {
          countNum: countTo
        },

        {
          duration: 3000,
          easing: "swing",
          step: function () {
            //$this.text(Math.ceil(this.countNum));
            $this.text(
              Math.ceil(this.countNum).toLocaleString("en")
            );
          },
          complete: function () {
            $this.text(
              Math.ceil(this.countNum).toLocaleString("en")
            );
            //alert('finished');
          }
        }
      );
    });
    a = 1;
  }
});

// fixedBG test
$(window).scroll(function () {

  var top = $(document).scrollTop();
  var $sdgs = $('#sdgs');
  var $things = $('#things');
  var $future = $('#future');
  var $intro = $('.bg-intro');
  var $message = $('#message');
  var $end = $('#end');

  

  if (top > $sdgs.offset().top && top < $sdgs.position().top + $sdgs.outerHeight(true) && $(document).width() > 768) {
    $sdgs.addClass('active');
  } else {
    $sdgs.removeClass('active');
  }


  if (top > $things.offset().top - 50 && top < $things.position().top + $things.outerHeight(true)) {
  // if (top < $things.position().top + $things.outerHeight(true)) {
    $things.addClass('active');
  } else {
    $things.removeClass('active');
  }


  if (top > $things.offset().top - $(window).height() && top < $things.position().top + $things.outerHeight(true)) {
    $things.css('opacity', '1');
  } else {
    $things.css('opacity', '0');
  }


  if (top > $future.offset().top - 50 && top < $future.position().top + $future.outerHeight(true)) {
      $future.addClass('active');
    } else {
      $future.removeClass('active');
  }

  if (top > $intro.offset().top - $(window).height() && top < $sdgs.position().top + $sdgs.outerHeight(true)) {
    $intro.css('opacity', '1');
  } else {
    $intro.css('opacity', '0');
  }

  
  if (top < $message.position().top + $message.outerHeight(true)) {
    $message.addClass('active');
  } else {
    $message.removeClass('active');
  }


  if (top < $end.position().top + $end.outerHeight(true)) {
      $end.addClass('active');
    } else {
      $end.removeClass('active');
  }

});

//fancybox
$('.fancybox').fancybox({
  toolbar: false,
  smallBtn: true,
  iframe: {
    preload: false
  },
  helpers: {
    overlay: {
      locked: false
    }
  }  
})

// anchor cooperate
jQuery(document).ready(function($) {
  $('a[href^="#cooperate"]').click(function() {
      $("html, body").animate({
          scrollTop: $("#cooperate").offset().top - 545
      }, 600 );
      return false;
  });
});

// things
$(window).scroll(function () {
  var scrollDistance = $(window).scrollTop();

  // Show/hide menu on scroll
  if (scrollDistance >= $('#things').offset().top - 350) {
    $('#thingsNav').addClass("affix");
  } else {
    $('#thingsNav').removeClass("affix");
  }
  // if (scrollDistance >= $('#support').offset().top - 200) {
  //   $('#supportNav').fadeIn("fast");
  //   // $('#support .section-header').addClass("affix");
  // } else {
  //   $('#supportNav').fadeOut("fast");
  //   $('#support .section-header').removeClass("affix");
  // }

  // Assign active class to nav links while scolling
  $('.page-section').each(function (i) {
    if ($(this).offset().top - 200 <= scrollDistance) {
      $('.navigation a.active').removeClass('active');
      $('.navigation a').eq(i).addClass('active');
    }
  });
}).scroll();


// preface show
// $(window).scroll(function () {
//   if ($(this).scrollTop() > 300) {
//     $this.addClass('active');
//   } else {
//     $('.section').removeClass('active');
//   }
// });

//fixedBG
// if ($(document).width() > 768) {
//   $(function ($) {
//     $("#things").fixedBG();
//     $("#future").fixedBG();
//   });

// }




// function imgError(i) {
//   i.src = "./images/avatar/default.png";
// }

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

