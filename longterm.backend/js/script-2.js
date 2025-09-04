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


  // datatableFixColumn
if ($('.datatableFixColumn').length) {
  $(document).ready(function () {
    const isMobile = window.innerWidth < 768;

    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const generateColumnDefs = () => {
      const defs = [];
      $('.datatableFixColumn thead th').each(function (index) {
        const width = $(this).data('width');
        if (width) {
          defs.push({
            width: `${width}px`,
            targets: index
          });
        }
      });
      return defs;
    };

    const destroyTable = (datatable) => {
      if (datatable.fixedHeader) datatable.fixedHeader.disable?.();
      datatable.destroy();
      $('.fixedHeader-floating, .fixedHeader-locked').remove();
      $('.DTFC_LeftWrapper, .DTFC_RightWrapper').remove();
    };

    const initDataTable = () => {
      // 👉 手機移除 data-width，避免 <thead> 撐開
      if (isMobile) {
        $('.datatableFixColumn thead th').removeAttr('data-width');
      }

      return $('.datatableFixColumn').DataTable({
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
        },
        order: [],
        searching: false,
        lengthChange: false,
        paging: false,
        autoWidth: false,
        scrollX: !isMobile,
        scrollY: isMobile ? false : 500,
        scrollCollapse: !isMobile,
        fixedHeader: isMobile ? false : {
          header: true,
          footer: false
        },
        fixedColumns: isMobile ? false : {
          leftColumns: 1
        },
        columnDefs: isMobile ? [] : generateColumnDefs()
      });
    };

    const initWithPlugins = async () => {
      if (!isMobile) {
        // 👉 僅在桌機動態載入 plugin
        await loadScript('https://cdn.datatables.net/fixedcolumns/3.2.0/js/dataTables.fixedColumns.js');
        await loadScript('https://cdn.datatables.net/fixedheader/3.1.0/js/dataTables.fixedHeader.min.js');
      }

      let datatable = initDataTable();

      if (!isMobile) {
        const observer = new ResizeObserver(() => {
          setTimeout(() => {
            destroyTable(datatable);
            datatable = initDataTable();
          }, 200);
        });
        observer.observe(document.querySelector('.dataTables_wrapper'));
      }
    };

    // 🚀 啟動流程
    initWithPlugins();
  });
}

  // datatableFix3col
if ($('.datatableFix3col').length) {
  $(document).ready(function () {
    const isMobile = window.innerWidth < 768;

    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const generateColumnDefs = () => {
      const defs = [];
      $('.datatableFix3col thead th').each(function (index) {
        const width = $(this).data('width');
        if (width) {
          defs.push({
            width: `${width}px`,
            targets: index
          });
        }
      });
      return defs;
    };

    const destroyTable = (datatable) => {
      if (datatable.fixedHeader) datatable.fixedHeader.disable?.();
      datatable.destroy();
      $('.fixedHeader-floating, .fixedHeader-locked').remove();
      $('.DTFC_LeftWrapper, .DTFC_RightWrapper').remove();
    };

    const initDataTable = () => {
      // 👉 手機移除 data-width，避免 <thead> 撐開
      if (isMobile) {
        $('.datatableFix3col thead th').removeAttr('data-width');
      }

      return $('.datatableFix3col').DataTable({
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
        },
        order: [],
        searching: false,
        lengthChange: false,
        paging: false,
        autoWidth: false,
        scrollX: !isMobile,
        scrollY: isMobile ? false : 500,
        scrollCollapse: !isMobile,
        fixedHeader: isMobile ? false : {
          header: true,
          footer: false
        },
        fixedColumns: isMobile ? false : {
          leftColumns: 3,
          rightColumns: 1
        },
        columnDefs: isMobile ? [] : generateColumnDefs()
      });
    };

    const initWithPlugins = async () => {
      if (!isMobile) {
        // 👉 僅在桌機動態載入 plugin
        await loadScript('https://cdn.datatables.net/fixedcolumns/3.2.0/js/dataTables.fixedColumns.js');
        await loadScript('https://cdn.datatables.net/fixedheader/3.1.0/js/dataTables.fixedHeader.min.js');
      }

      let datatable = initDataTable();

      if (!isMobile) {
        const observer = new ResizeObserver(() => {
          setTimeout(() => {
            destroyTable(datatable);
            datatable = initDataTable();
          }, 200);
        });
        observer.observe(document.querySelector('.dataTables_wrapper'));
      }
    };

    // 🚀 啟動流程
    initWithPlugins();
  });
}

  // datatableNopage
  if ($('.datatableNopage').length) {

  $(document).ready(function () {
    const targets = [];

    $('.datatableNopage thead th').each(function(index) {
      if ($(this).data('orderable') === false) {
        targets.push(index);
      }
    });

    $('.datatableNopage').DataTable({
      language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
      },   
      order: [],
      searching: false,
      lengthChange: false,
      paging: false, 
      columnDefs: [
        {
          targets: targets,
          orderable: false
        }
      ]
    });

    $('.datatableFix3col').DataTable({
      language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/zh-HANT.json',
      },   
      order: [],
      searching: false,
      lengthChange: false,
      paging: false,
      scrollCollapse: true,
      scrollX: true,
      scrollY: 300,
      fixedColumns: {
          start: 1,
          end: 1
      },
      // columnDefs: [
      //   {
      //     targets: targets,
      //     orderable: false
      //   }
      // ]
    });

  });


  }



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