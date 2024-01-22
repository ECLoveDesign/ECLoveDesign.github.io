
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
$(document).ready(function () {
  var drugTable = $('.drugTable').DataTable( {
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

// mfp
$(document).ready(function() {

	$('.img-mfp').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'img-mfp mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

});