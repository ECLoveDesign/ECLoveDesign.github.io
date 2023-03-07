window.onpageshow = function (event) {
  if (event.persisted) {
    
    //如果重整前需要先顯示loading畫面,請使用以下註解的語法
    //if ($('.loading').length) {
    //    $('.loading').show();
    //}
    window.location.href = window.location.pathname + window.location.search;
  }
};
$(document).ready(function () {
  //Card Option
  $('[data-component="cardoption"]')
    .find('.open-opt')
    .on('click', function () {
      var $list_width = $(this)
          .parents('[data-component="cardoption"]')
          .find('li')
          .width(),
        $list_length =
          $(this).parents('[data-component="cardoption"]').find('li').length -
          1,
        $open_width = ($list_width + 12.6666) * $list_length;
      $(this).parents('[data-component="cardoption"]').animate(
        {
          width: $open_width,
        },
        100
      );
      $(this).animate(
        {
          opacity: '0',
        },
        100
      );
    });
  $('[data-component="cardoption"]')
    .find('.close-opt')
    .on('click', function () {
      $(this).parents('[data-component="cardoption"]').animate(
        {
          width: '24px',
        },
        100
      );
      $(this).siblings('.open-opt').animate(
        {
          opacity: '1',
        },
        100
      );
    });

  //Table - Basic - bsTable - clickableRow
  $('.clickable-row').click(function () {
    window.location = $(this).data('href');
  });

  //Tables - Advanced - Tables dropdown
  // function isReady(sts) {
  //   $('.fa-angle-up').attr('class', 'fa-lg fa-angle-down fas');
  //   $('tr.collapse').collapse('hide');

  //   if ($('#' + sts).hasClass('action')) {
  //     $('#' + sts + ' i').attr('class', 'fa-lg fa-angle-down fas');
  //     $('#' + sts).removeClass('action');
  //     //$("tr.collapse").slideToggle();
  //   } else {
  //     $('#' + sts + ' i').attr('class', 'fa-lg fa-angle-up fas');
  //     $('.btn-dropdown').removeClass('action');
  //     $('#' + sts).addClass('action');
  //   }
  // }
  //post-content-remark
  if ($('.remark').length) {
    $('.remark').on('click', function () {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open').next('.remark-content').slideUp();
        return false;
      } else {
        $(this)
          .addClass('open')
          .next('.remark-content')
          .slideDown('medium', function () {
            if ($(this).is(':visible')) {
              $(this).css('display', 'block');
            }
          });
        return false;
      }
    });
  }
  // loading
  if ($('.loading').length) {
    var loading = $('.loading');
    $(document).ajaxStart(function () {
      loading.show();
    });
    $(document).ajaxComplete(function () {
      loading.hide();
    });
    $('.btn-showloading').click(function () {
      loading.show();
    });

    setTimeout(function () {
      loading.hide();
    }, 100);
  }
  //counter 數字跳動
  if ($('.counter').length) {
    $('.counter').each(function () {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 800,
          easing: 'linear',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
  }
}); //document end
