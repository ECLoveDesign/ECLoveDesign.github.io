
new WOW().init();

if ($(document).width() > 900) {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

// needs-validation
if ( $('.needs-validation').length ) {
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
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



// index swiper
if ( $('.gallery-top').length ) {
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
      loop: true,
      loopedSlides: 4
  });

  var galleryThumbs = new Swiper('.gallery-thumbs', {
    // spaceBetween: 10,
    navigation: {
      nextEl: '.thumbs-wrap .swiper-button-next',
      prevEl: '.thumbs-wrap .swiper-button-prev',
    },
    // centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 4,
    breakpoints: {
        500: {
            slidesPerView: 2,
            spaceBetween: 0,

        },
        991: {
            slidesPerView: 3,
            spaceBetween: 0,

        },
    },
  });
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;
  
}


// teacher-wrap
if ( $('.teacher-wrap').length ) {
  $(".teacher-wrap").each(function(index, element){
      var $this = $(this);
      $this.find(".swiper-container").addClass("instance-" + index);
      $this.find(".swiper-button-prev").addClass("btn-prev-" + index);
      $this.find(".swiper-button-next").addClass("btn-next-" + index);

      var swiper = new Swiper(".instance-" + index, {
          slidesPerView: 4,
          spaceBetween: 0,
          navigation: {
            nextEl: ".btn-next-" + index,
            prevEl: ".btn-prev-" + index,
          },
          breakpoints: {
            500: {
                slidesPerView: 1,
                spaceBetween: 0,

            },
            1100: {
                slidesPerView: 2,
                spaceBetween: 0,

            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 30,

            },
        },
      });
  });

}


// video-wrap
if ( $('.video-wrap').length ) {
  var videoswiper = new Swiper('.video-swiper', {
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.video-swiper .swiper-button-next',
      prevEl: '.video-swiper .swiper-button-prev',
    },
    breakpoints: {
      600: {
          slidesPerView: 1,
          spaceBetween: 25,

      },
    },
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    var paneTarget = $(e.target).attr('href');
    var $thePane = $('.tab-pane' + paneTarget);
    var paneIndex = $thePane.index();
    if ($thePane.find('.video-swiper').length > 0 && 0 === $thePane.find('.swiper-slide-active').length) {
      videoswiper[paneIndex].update();
    }
  });
}


// feedback-wrap
if ( $('.feedback-wrap').length ) {
  var feedbackswiper = new Swiper(".feedback-swiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: '.feedback-wrap .swiper-button-next',
      prevEl: '.feedback-wrap .swiper-button-prev',
    },
    breakpoints: {
        500: {
            slidesPerView: 1,
            spaceBetween: 0,

        },
        1100: {
            slidesPerView: 2,
            spaceBetween: 0,

        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 0,

        },
    },
  });
}

// cooperation-wrap
if ( $('.cooperation-wrap').length ) {
  var articleswiper = new Swiper(".cooperation-swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.cooperation-wrap .swiper-button-next',
      prevEl: '.cooperation-wrap .swiper-button-prev',
    },
    breakpoints: {
        500: {
            slidesPerView: 1,
            spaceBetween: 25,

        },
        1100: {
            slidesPerView: 2,
            spaceBetween: 30,

        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 30,

        },
    },
  });
}

// subnav-wrap
if ( $('.nav-slider').length ) {

  // $(window).scroll(function() {    
  //     var windowTop = $(window).scrollTop();
  //     if (windowTop > 200) {
  //         $('.nav-slider').addClass('fixed');
  //     } else {
  //         $('.nav-slider').removeClass('fixed');
  //     }
  // }); 

  if (window.innerWidth < 960) {
      var subnavslider = new Swiper('.swiper-container.subnav-nav', {
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          // spaceBetween: 30,
          freeMode: true
      });
      
      subnavslider.slideTo($('.nav-slider .swiper-wrapper li.active').index());

      $(window).on('scroll', function () {
          subnavslider.slideTo($('.nav-slider .swiper-wrapper li.active').index());
      });
  } 

};


// pagenav
var $select = $('<select class="form-control bs-select"></select>');
$(".pagenav").append($select);

$(".pagenav a").each(function(){
  var $anchor = $(this);
  var $option = $("<option></option>");
  if ($anchor.parent().hasClass("active")) {
    $option.prop("selected", true);
  }
  
  $option.val($anchor.attr("href"));
    $option.text($anchor.text());
  $select.append($option);
  
});

$select.change(function(){
    window.location = $select.val();
});

// form 
if ( $('.form').length ) {
  $('input.form-control').on('focusin', function() {
    $(this).parent().find('label').addClass('active');
  });
  
  $('input.form-control').on('focusout', function() {
    if (!this.value) {
      $(this).parent().find('label').removeClass('active');
    }
  });
  
}

//fancybox
if ( $('[data-fancybox]').length ) {

  $("[data-fancybox]").fancybox({		
    buttons: ["close"],
  });

  //fileview
  $('.file-group [data-fancybox]').fancybox({
    baseClass: "fancybox-fileview",
    type:'iframe',
  });

  //ytview
  $('.video-group [data-fancybox]').fancybox({
    baseClass: "fancybox-ytview",
    type:'iframe',
  });

}


//bs-select
if ( $('.bs-select').length ) {
  $('.bs-select').selectpicker(); 
}

//lightGallery
if ( $('.lightGallery').length ) {

  $('.lightGallery').lightGallery({
    loop:false,
    download:false,
  })  
}

// avatar upload
if ( $('.avatar-edit').length ) {
  var input = $('.avatar-edit input');
  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
              $('#imagePreview').css('background-image', 'url('+e.target.result +')');
              $('#imagePreview').hide();
              $('#imagePreview').fadeIn(650);
          }
          reader.readAsDataURL(input.files[0]);
      }
  }
  $("#imageUpload").change(function() {
      readURL(this);
  });

}



// popup login signup 
$(function() {
  $(".btn-register").click(function() {
      $(".login_box").hide();
      $(".sign_box").show();
  });

  $(".btn-member").click(function() {
      $(".sign_box").hide();
      $(".login_box").show();
  });

});


// sortbox nav-link click 
$(function() {
  $(".sortbox .nav-link").click(function() {
      $(".sortbox .nav-link").removeClass('active');
      $(this).addClass('active');
  });

});

// multiselect
if ( $('.multiselect').length ) {
  
  $(document).ready(function() {
    $('.multiselect').multiselect({
      nonSelectedText: '選擇類別',
      filterPlaceholder: '類別關鍵字..',
      includeSelectAllOption: true,
      enableFiltering: true,
    });

  });
  
}

// tablesorter
if ( $('.tablesorter').length ) {
  
    $('.tablesorter.sticky').tablesorter({
      widgets: ['stickyHeaders']
    });
  
}


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


// affix top
$(window).scroll(function () {
  if ($(this).scrollTop() > 40) {
    $("header").addClass('affix');
  } else {
    $("header").removeClass('affix');
  }

  
  if ($(this).scrollTop() > 120) {
    $(".search_box").addClass('affix');
    // $(".cont .container>*").addClass('mt-0');
  } else {
    $(".search_box").removeClass('affix');
    // $(".cont .container>*").removeClass('mt-0');
  }


  // if ($(this).scrollTop() > 200) {
  //   $(".nav-slider").addClass('affix');
  // } else {
  //   $(".nav-slider").removeClass('affix');
  // }
});



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

