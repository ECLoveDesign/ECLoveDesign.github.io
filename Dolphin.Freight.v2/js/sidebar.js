;(function ($) {
  $.canboo = {
    init: function () {
      $('.sidebar-toggle-box').on('click', function (e) {
        e.preventDefault()
        $('body').toggleClass('hidden-left')
        $('#navbar-mobile').removeClass('show')
      })
      $('.toggle-right-box').on('click', function (e) {
        e.preventDefault()
        $('body').toggleClass('show-right')
      })
      $('.cover').on('click', function () {
        $('body').removeClass('show-right hidden-left')
      })
      if (768 >= $(window).width()) {
        $('body').addClass('mb')
      }
    },
    setSize: function () {
      if (768 < $(window).width()) {
        $('body').removeClass('show-right hidden-left').removeClass('mb')
      }else {
        $('body').addClass('mb')
      }
    }
  }

  $(function () {
    $.canboo.init()
    $(window).resize(function () {
      $.canboo.setSize()
    })
  })
})(jQuery)
