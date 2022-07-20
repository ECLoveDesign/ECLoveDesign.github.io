
// news-slider
var swiper = new Swiper('.news-slider .swiper-container', {
    pagination: '.swiper-pagination',
    // paginationClickable: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,    
    slidesPerView: 3,
    loop: true,
    breakpoints: {
      375: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 40,
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1140: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }
});