
// font size
$(document).ready(function () {
    $('.font-m').addClass('active');
    
    $('.font-s').click(function (event) {
        event.preventDefault();
        $("[class*='font-']").removeClass('active');
        $(this).addClass('active');
        $('html').css('font-size', '90%');
    });

    $('.font-m').click(function (event) {
        event.preventDefault();
        $("[class*='font-']").removeClass('active');
        $(this).addClass('active');
        $('html').css('font-size', '100%');
    });

    $('.font-l').click(function (event) {
        event.preventDefault();
        $("[class*='font-']").removeClass('active');
        $(this).addClass('active');
        $('html').css('font-size', '120%');
    });
});

// anchor
$('.btn-anchor').click(function(e){
    e.preventDefault();
    var target = $($(this).attr('href'));
    if(target.length){
      var scrollTo = target.offset().top;
      $('body, html').animate({scrollTop: scrollTo-140+'px'}, 800);
    }
  });

  
// affix top
if ($(document).width() < 992) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
          $("header").addClass('affix');
        } else {
          $("header").removeClass('affix');
        }
    });
      
  }



// show 
if ($(document).width() > 991) {
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        var $main = $('main');
      
        if (top > $main.offset().top - 200) {
          $(".searchArea").addClass('affix');
        } else {
          $(".searchArea").removeClass('affix');
        }
      
      });
      
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


if ($(document).width() > 900) {
  $(function () {
      $('[data-toggle="tooltip"]').tooltip()
  })
}

// dataTable
if ($(document).width() > 767) {

  $('.registerTable').DataTable({
    autoWidth: false,
    searching: false,
    bInfo: false,
    columnDefs: [
        { targets: [1,2,3], orderable: false },
    ],
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.childRowImmediate,
            type: 'none',
            target: ''
        }
    },
    pageLength : 20,
    lengthChange: false,
    language: {
        url: 'assets/datatables/i18n/zh-HANT.json'
    },
    scrollY:        "550px",
    scrollX:        true,
    scrollCollapse: true,
    paging:         false,
  })  
  
  $('.doctorTable').DataTable({
    autoWidth: false,
    searching: false,
    bInfo: false,
    columnDefs: [
        { targets: [2], orderable: false },
    ],
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.childRowImmediate,
            type: 'none',
            target: ''
        }
    },
    pageLength : 20,
    lengthChange: false,
    language: {
        url: 'assets/datatables/i18n/zh-HANT.json'
    },
    scrollY:        "550px",
    scrollX:        true,
    scrollCollapse: true,
    paging:         false,
  })  
  
  $('.restTable').DataTable({
    autoWidth: false,
    searching: false,
    bInfo: false,
    columnDefs: [
        { targets: [4,6,7], orderable: false },
    ],
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.childRowImmediate,
            type: 'none',
            target: ''
        }
    },
    pageLength : 20,
    lengthChange: false,
    language: {
        url: 'assets/datatables/i18n/zh-HANT.json'
    },
    scrollY:        "550px",
    scrollX:        true,
    scrollCollapse: true,
    paging:         false,
  })  

  
  $('.linkTable').DataTable({
    autoWidth: false,
    searching: false,
    bInfo: false,
    columnDefs: [
        { targets: [1,2], orderable: false },
        // { width: 20, targets: [1,2,3] },
        // { width: 40, targets: [0] },
    ],
    responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.childRowImmediate,
            type: 'none',
            target: ''
        }
    },
    pageLength : 20,
    lengthChange: false,
    language: {
        url: 'assets/datatables/i18n/zh-HANT.json'
    },
    scrollY:        "550px",
    scrollX:        true,
    scrollCollapse: true,
    paging:         false,
  })  


} 

// datepicker
$(function () {
  $('.datepicker').datetimepicker();
});

// validation
if ($('#needs-validation, #cancel-validation').length) {
  (function() {
    "use strict";
    window.addEventListener("load", function() {
      var form = document.getElementById("needs-validation");
      form.addEventListener("submit", function(event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      }, false);
    }, false);
  }());

  
  (function() {
    "use strict";
    window.addEventListener("load", function() {
      var form = document.getElementById("cancel-validation");
      form.addEventListener("submit", function(event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      }, false);
    }, false);
  }());

  $('.selectpicker').on( 'hide.bs.select', function ( ) {
      $(this).trigger("focusout");
  });

};


// birthToggle
$('.birthToggle .text-primary').click(function(e){          
  $('.birth').toggleClass('d-none');     
  $('.birth2').toggleClass('d-none');
});