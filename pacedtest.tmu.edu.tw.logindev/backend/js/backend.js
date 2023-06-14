
// subnav-wrap
if ($('.nav-slider').length) {

    // $(window).scroll(function () {
    //     var windowTop = $(window).scrollTop();
    //     if (windowTop > 200) {
    //         $('.nav-slider').addClass('fixed');
    //     } else {
    //         $('.nav-slider').removeClass('fixed');
    //     }
    // });

    // if (window.innerWidth < 960) {
    $('.section-nav').clone().appendTo("#navCollapse");
    var subnavslider = new Swiper('.swiper-container.subnav-nav', {
        slidesPerView: 'auto',
        paginationClickable: true,
        freeMode: true,

        breakpoints: {
            640: {
                centeredSlides: true,
            },

        },

        // },
    });

    subnavslider.slideTo($('.nav-slider .swiper-wrapper li.active').index());

    $(window).on('scroll', function () {
        subnavslider.slideTo($('.nav-slider .swiper-wrapper li.active').index());
    });
    // } 

};
