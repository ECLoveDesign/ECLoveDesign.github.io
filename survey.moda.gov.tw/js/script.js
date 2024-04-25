
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



// affix top
$(window).scroll(function () {
  if ($(this).scrollTop() > 40) {
    $("header").addClass('affix');
  } else {
    $("header").removeClass('affix');
  }
});

// show 
$(window).scroll(function () {

  var top = $(document).scrollTop();
  // var $apply = $('.apply');

  // if (top > $apply.offset().top + 25 && top < $apply.position().top + $apply.outerHeight(true) + 200) {
  //   $(".apply img").addClass('affix');
  // } else {
  //   $(".apply img").removeClass('affix');
  // }

});


// popup-gallery
$('.popup-gallery').magnificPopup({
  type: 'image',
  removalDelay: 300,
  mainClass: 'mfp-fade',
  gallery: {
    enabled: true
  },
  image: {
    verticalFit: true,
    titleSrc: function(item) {
      return item.el.attr('title');
    }
  },
  zoom: {
    enabled: true,
    duration: 300,
    easing: 'ease-in-out',
    opener: function(openerElement) {
      return openerElement.is('img') ? openerElement : openerElement.find('img');
    }
  }
});

// popup-img
$('.popup-img').magnificPopup({
  type: 'image',  
  mainClass: 'mfp-fade mfp-tag',
  image: {
    verticalFit: true,
    titleSrc: function(item) {
      return item.el.attr('title');
    }
  },
// other options
});

// popup-youtube
$('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade mfp-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
});

// popup-cont
$('.popup-cont').magnificPopup({
  type:'iframe',
  // mainClass: 'mfp-fade mfp-cont',
});

// WOW
new WOW().init();
