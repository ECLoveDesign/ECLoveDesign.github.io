
// Show the first tab by default
$('.cont__item').hide();
$('.cont__item:first').show();
$('.icon__group li:nth-child(2)').addClass('tab-active');

// Change tab class and display content
$('.icon__group a').on('click', function (event) {
    event.preventDefault();
    $('.icon__group li').removeClass('tab-active');
    $(this).parent().addClass('tab-active');
    $('.cont__item').hide();
    $($(this).attr('href')).show();
});

// slick to icon__group
if (window.matchMedia("(max-width: 991px)").matches) {
    $('.icon__group').slick({
        // dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            //   dots: true
            }
          },
        ]
    });
} 