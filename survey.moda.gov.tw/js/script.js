

// scolltop

$(document).ready(function () {

  var btn = $('.btn-top');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '10000');
  });
});






// reload
var isPad = (window.innerWidth <= 1025);
$(window).resize(function () {
  var w = window.innerWidth;
  if ((w <= 1025 && !isPad) || (w > 1025 && isPad)) {
    location.reload();
  }
});

// validation
if ($('.needs-validation').length) {
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
  $(document).ready(function () {
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
$(".submenu a").each(function () {
  var $anchor = $(this);
  var $option = $("<option></option>");
  if ($anchor.parent().hasClass("active")) {
    $option.prop("active", true);
  }

  $option.val($anchor.attr("href"));
  $option.text($anchor.text());
  $select.append($option);

});

$select.change(function () {
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
  var listTable = $('.listTable').DataTable({
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
  });

});

// sweetalert
$('.btn-del').on('click', function () {
  Swal.fire({
    title: '確認刪除此項目?',
    text: "一旦刪除無法復原!",
    type: 'warning',
    showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    cancelButtonText: '取消 ',
    confirmButtonText: '確認刪除',
    confirmButtonClass: 'btn btn-dark',
    cancelButtonClass: 'btn btn-light ml-1',
    buttonsStyling: false,
  }).then(function (result) {
    if (result.value) {
      Swal.fire({
        type: "success",
        title: '刪除成功!',
        text: '已刪除此項目',
        showConfirmButton: false,
        timer: 1500
        // confirmButtonClass: 'btn btn-success',
        // confirmButtonText: '關閉',
      })
    }
  })
});



// $('.btn-return').on('click', function () {
//   Swal.fire({
//     title: '確認退回此問卷?',
//     text: "退回問卷可編輯填答!",
//     type: 'info',
//     showCancelButton: true,
//     // confirmButtonColor: '#3085d6',
//     // cancelButtonColor: '#d33',
//     cancelButtonText: '取消 ',
//     confirmButtonText: '確認退回',
//     confirmButtonClass: 'btn btn-dark',
//     cancelButtonClass: 'btn btn-light ml-1',
//     buttonsStyling: false,
//   }).then(function (result) {
//     if (result.value) {
//       Swal.fire({
//         type: "success",
//         title: '退回成功!',
//         text: '已退回此問卷',
//         showConfirmButton: false,
//         timer: 1500
//         // confirmButtonClass: 'btn btn-success',
//         // confirmButtonText: '關閉',
//       })
//     }
//   })
// });


$('.btn-copylink').on('click', function () {
  Swal.fire({
    type: "success",
    title: "您已複製問卷連結",
    showConfirmButton: false,
    timer: 1000
  });
});

$('.btn-save').on('click', function () {
  Swal.fire({
    type: "success",
    title: "儲存成功",
    showConfirmButton: false,
    timer: 1000
  });
});

$('.btn-clone').on('click', function () {
  Swal.fire({
    type: "success",
    title: "您已複製問卷",
    confirmButtonClass: 'btn btn-success',
    confirmButtonText: '前往問卷',
  });
});

$('[class*="btn-add-"],.btn-addTopicInto').on('click', function () {
  Swal.fire({
    type: "success",
    title: "成功加入題目",
    showConfirmButton: false,
    timer: 1000
  });
});


$('.btn-stop').on('click', function () {
  Swal.fire({
    type: "info",
    title: "您已停用該使用者",
    showConfirmButton: false,
    timer: 1000
  });
});


$('.btn-enable').on('click', function () {
  Swal.fire({
    type: "success",
    title: "您已啟用該使用者",
    showConfirmButton: false,
    timer: 1000
  });
});




// bs-select
$('.bs-select').selectpicker();

// preview-zone
if ($('.preview-zone').length) {
  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var htmlPreview =
          '<img width="200" src="' + e.target.result + '" />' +
          '<p>' + input.files[0].name + '</p>';
        var wrapperZone = $(input).parent();
        var previewZone = $(input).parent().parent().find('.preview-zone');
        var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body');
  
        wrapperZone.removeClass('dragover');
        previewZone.removeClass('d-none');
        boxZone.empty();
        boxZone.append(htmlPreview);
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  function reset(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
  }
  
  $(".dropzone").change(function() {
    readFile(this);
  });
  
  $('.dropzone-wrapper').on('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragover');
  });
  
  $('.dropzone-wrapper').on('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('dragover');
  });
  
  $('.remove-preview').on('click', function() {
    var boxZone = $(this).parents('.preview-zone').find('.box-body');
    var previewZone = $(this).parents('.preview-zone');
    var dropzone = $(this).parents('.form-group').find('.dropzone');
    boxZone.empty();
    previewZone.addClass('hidden');
    reset(dropzone);
  });
}

// affix top
$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $(".functionmenu").addClass('affix-top');
        $(".sidebar-offcanvas").addClass('affix-top');
        $(".btn-offcanvas").addClass('affix-top');
    } else {
      $(".functionmenu").removeClass('affix-top');
        $(".sidebar-offcanvas").removeClass('affix-top');
        $(".btn-offcanvas").removeClass('affix-top');
    }

    if ($(document).width() > 900) {
        if ($(this).scrollTop() > 135) {
            $(".functionmenu").addClass('affix-top');
            $(".sidebar-offcanvas").addClass('affix-top');
            $(".btn-offcanvas").addClass('affix-top');

        } else {
            $(".functionmenu").removeClass('affix-top');
            $(".sidebar-offcanvas").removeClass('affix-top');
            $(".btn-offcanvas").removeClass('affix-top');
        }
    }

});

// offcanvas
$(document).ready(function () {
	$('[data-toggle="offcanvas"]').click(function () {
		$('.row-offcanvas').toggleClass('active')
	});
});



// affix top
$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $(".sidebar-offcanvas").addClass('affix-top');
    } else {
        $(".sidebar-offcanvas").removeClass('affix-top');
    }

    if ($(document).width() > 900) {

        if ($(this).scrollTop() > 135) {
            $(".sidebar-offcanvas").addClass('affix-top');

        } else {
            $(".sidebar-offcanvas").removeClass('affix-top');
        }
    }

});

// drag
if ($('.surveyedit-wrap').length) {
  const dragArea = document.querySelector(".surveyedit-wrap");
  new Sortable(dragArea, {
    animation: 350
  });
}

//collapse
$(document).ready(function () {

    // $("#btn-collapseTopic").hide();
    $("#btn-expandTopic").hide();

    $("#btn-collapseTopic").click(function () {
        $('.topicCont').removeClass('show');
        $("#btn-expandTopic").show();
        $("#btn-collapseTopic").hide();
        $(".section-header .topic-toggle").attr("aria-expanded", "false");
    });


    $("#btn-expandTopic").click(function () {
        $('.topicCont').addClass('show').css("height", "");
        $("#btn-expandTopic").hide();
        $("#btn-collapseTopic").show();
        $(".section-header .topic-toggle").attr("aria-expanded", "true");
    });

    // $(".topic-toggle").click(function () {
    //     $('.topicCont').each(function (index) {
    //         if ($(this).hasClass('show')) {
    //             $("#btn-expandTopic").show();
    //             $("#btn-collapseTopic").hide();
    //             // $(this).parent().find('.topic-toggle').attr("aria-expanded","true");
    //         }
    //     });
    // });

});

// demo
$(".btn-indent").click(function () {
  $(this).toggleClass('active');
  $(this).closest('section').toggleClass('indent');
});

$(".functions .btn-required").click(function () {
  $(this).toggleClass('active');
  $(this).parent().parent().find('.required').toggleClass('d-none');
});
$(".functions .btn-view").click(function () {
  $(this).toggleClass('active');
  $(this).parent().parent().find('.view').toggleClass('d-none');
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
    titleSrc: function (item) {
      return item.el.attr('title');
    }
  },
  zoom: {
    enabled: true,
    duration: 300,
    easing: 'ease-in-out',
    opener: function (openerElement) {
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
    titleSrc: function (item) {
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
  type: 'iframe',
  // mainClass: 'mfp-fade mfp-cont',
});

// WOW
new WOW().init();
