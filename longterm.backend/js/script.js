// selectpicker
$('.selectpicker').on('hide.bs.select', function () {
  $(this).trigger("focusout");
});


// aside
$('.sidebar-toggle-box').on('click', function (e) {
  e.preventDefault();
  $(this).toggleClass('open');
  $('body').toggleClass('hidden-left');
  $('#navbar-mobile').removeClass('show');
})
$('.toggle-right-box').on('click', function (e) {
  e.preventDefault();
  $('body').toggleClass('show-right');
})


if (768 >= $(window).width()) {
  $('body').addClass('mb');
}

if (768 < $(window).width()) {
  $('body').removeClass('show-right hidden-left').removeClass('mb');
} else {
  $('body').addClass('mb');
}

// $('.nav-item .menu-item').click(function (e) {

//   if ($(this).attr("aria-expanded") === "true") {
//     $(this).parent().addClass('active');
//   } else if ($(this).attr("aria-expanded") === "false") {
//     $(this).parent().removeClass('active');
//   }

// });


// btn-collapse
if ($('.btn-collapse').length) {

  $('.btn-collapse').click(function (e) {

    if ($(this).attr("aria-expanded") === "true") {
      $(this).parent().removeClass('active');
    } else if ($(this).attr("aria-expanded") === "false") {
      $(this).parent().addClass('active');
    }

  });

};


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
  $('html, body').animate({
    scrollTop: 0
  }, '10000');
});


if ($(document).width() > 900) {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
}

// dataTable
$(document).ready(function () {

  // datatable
  var datatable = $('.datatable').DataTable( {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
    },          
    searching: false,
    lengthChange: false,
} );



  // selectTable
  let myTable = $('.selectTable').DataTable({
    columnDefs: [{
      orderable: false,
      className: 'select-checkbox',
      targets: 0,
    }],
    select: {
      style: 'os', // 'single', 'multi', 'os', 'multi+shift'
      selector: 'td:first-child',
    },
    order: [
      [1, 'asc'],
    ],
    dom: '<"top"if>rt<"bottom"lp>',
    searching: false,
    language: {
      url: 'https://cdn.datatables.net/plug-ins/2.0.3/i18n/zh-HANT.json'
    },
    select: {
      info: false
    },
    dom: '<"top"f>rt<"bottom"ilp>',
    pageLength: 20,
    lengthChange: false,
  });

  $('#MyTableCheckAllButton').click(function () {
    if (myTable.rows({
      selected: true
    }).count() > 0) {
      myTable.rows().deselect();
      return;
    }

    myTable.rows().select();
  });

  myTable.on('select deselect', function (e, dt, type, indexes) {
    if (type === 'row') {
      // We may use dt instead of myTable to have the freshest data.
      if (dt.rows().count() === dt.rows({
        selected: true
      }).count()) {
        // Deselect all items button.
        $('#MyTableCheckAllButton i').attr('class', 'far fa-check-square');
        return;
      }

      if (dt.rows({
        selected: true
      }).count() === 0) {
        // Select all items button.
        $('#MyTableCheckAllButton i').attr('class', 'far fa-square');
        return;
      }

      // Deselect some items button.
      $('#MyTableCheckAllButton i').attr('class', 'far fa-minus-square');
    }
  });
});

// datepicker
$(function () {
  $('.datepicker').datetimepicker();
});

// validation
if ($('#needs-validation, #cancel-validation').length) {
  (function () {
    "use strict";
    window.addEventListener("load", function () {
      var form = document.getElementById("needs-validation");
      form.addEventListener("submit", function (event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      }, false);
    }, false);
  }());


  (function () {
    "use strict";
    window.addEventListener("load", function () {
      var form = document.getElementById("cancel-validation");
      form.addEventListener("submit", function (event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      }, false);
    }, false);
  }());

  // $('.selectpicker').on('hide.bs.select', function () {
  //   $(this).trigger("focusout");

  // });

};

$(document).ready(function () { 
  $('.selectpicker').selectpicker({ 
    language: 'zh_TW' 
  }); 
});


// birthToggle
$('.birthToggle .text-primary').click(function (e) {
  $('.birth').toggleClass('d-none');
  $('.birth2').toggleClass('d-none');
});