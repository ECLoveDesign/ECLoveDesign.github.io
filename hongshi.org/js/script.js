/*==================================================================
| Author Email: elaine.love.design@gmail.com                       |
| Front-end design: Elaine Chu                                             |
==================================================================*/
// include
$(function(){
  $('header').load('../header.html'); 
  $('footer').load('../footer.html'); 
});


// kv-slider
var swiper = new Swiper('.kv-slider .swiper-container', {
  pagination: '.kv-slider .swiper-pagination',
  paginationClickable: '.kv-slider .swiper-pagination',
  nextButton: '.kv-slider .swiper-button-next',
  prevButton: '.kv-slider .swiper-button-prev',
  spaceBetween: 0,    
  slidesPerView: 1,
  loop: true,
});

// news-slider
var swiper = new Swiper('.news-slider .swiper-container', {
    nextButton: '.news-slider .swiper-button-next',
    prevButton: '.news-slider .swiper-button-prev',
    spaceBetween: 30,    
    slidesPerView: 3,
    loop: true,
    breakpoints: {
      375: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 20,
      },
      435: {
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