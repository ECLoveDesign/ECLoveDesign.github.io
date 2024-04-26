
// reload
var isPad = (window.innerWidth<=1025);
$(window).resize(function(){
    var w = window.innerWidth;
    if ((w <= 1025 && !isPad) || (w > 1025 && isPad)){
        location.reload();
    }
});

// validation
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

// profile show
if ($(document).width() > 1024) {
  $(document).ready(function(){
    var firstName = $('.firstName').text();
    var lastName = $('.lastName').text();
    var intials = firstName.charAt(0) + lastName.charAt(0);
    var profile = $('.profile').text(intials);
  });
}

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

//submenu
var $select = $('<select class="bs-select" data-width="100%"></select>');
$(".submenu").append($select);
$(".submenu a").each(function(){
  var $anchor = $(this);
  var $option = $("<option></option>");
  if ($anchor.parent().hasClass("selected")) {
    $option.prop("selected", true);
  }
  
  $option.val($anchor.attr("href"));
    $option.text($anchor.text());
  $select.append($option);
  
});

$select.change(function(){
     window.location = $select.val();
});

// tooltip
if ($(document).width() > 900) {
  $(function () {
      $('[data-toggle="tooltip"]').tooltip()
  })
}

// dataTable
$(document).ready(function () {
  var listTable = $('.listTable').DataTable( {
      language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
          // url: 'assets/datatables/i18n/zh-HANT.json',
          search: "搜尋",
          paginate: {
            first: "<<",
            previous: "<",
            next: ">",
            last: ">>"
        },      
          
      },    
      // responsive: {
      //     details: {
      //         display: $.fn.dataTable.Responsive.display.childRowImmediate,
      //         type: 'none',
      //         target: ''
      //     }
      // },
      // columnDefs: [
      //   { targets: [0,5], orderable: false },
      //   { width: 180, targets: [1,2,4] },
      //   { width: 110, targets: [0] },
      //   { width: 500, targets: [5] },
      // ],
      // pageLength : 15,
  } );

  
  var downloadTable = $('.downloadTable').DataTable( {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
    },          
    autoWidth: false,
    searching: false,
    dom: '<"top"li>rt<"bottom"fp>',
    // responsive: {
    //     details: {
    //         display: $.fn.dataTable.Responsive.display.childRowImmediate,
    //         type: 'none',
    //         target: ''
    //     }
    // },
    // columnDefs: [
    //   { targets: [0,5], orderable: false },
    //   { width: 180, targets: [1,2,4] },
    //   { width: 110, targets: [0] },
    //   { width: 500, targets: [5] },
    // ],
    // pageLength : 15,
} );
  
});

// bs-select
$('.bs-select').selectpicker();
  
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
