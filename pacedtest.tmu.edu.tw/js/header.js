const navOuterLinks = document.querySelectorAll('.nav-outer__link')
const navOuterLinksArr = Array.prototype.slice.call(navOuterLinks)

const navInnerNavs = document.querySelectorAll('.nav-inner')
const navInnerNavsArr = Array.prototype.slice.call(navInnerNavs)

const navInnerLinks = document.querySelectorAll('.nav-inner__link')
const navInnerLinksArr = Array.prototype.slice.call(navInnerLinks)

const navOuter = document.querySelector('.nav-outer')
const burgerMenu = document.getElementById('burger')



navOuterLinks.forEach(item => {
    item.addEventListener('click', e => {

        // switch  --active
        navOuterLinksArr.map(el => el.classList.remove('nav-outer__link--active'))
        e.target.classList.add('nav-outer__link--active')

        // switch  nav-inner
        navInnerNavsArr.map(el => el.classList.remove('nav-inner--active'))
        navInnerNavsArr.find(el => el.getAttribute("data-tab") === e.target.getAttribute("data-tab"))
        .classList.add('nav-inner--active')

    })
})


navInnerLinks.forEach(item => {
    item.addEventListener('click', e => {

        // switch nav-inner-link
        navInnerNavsArr
        .find(el => el.getAttribute("data-tab") === e.target.closest('.nav-inner').getAttribute("data-tab"))
        .querySelectorAll('.nav-inner__link')
        .forEach(el => el.classList.remove('nav-inner__link--active'))
        
        e.target.classList.add('nav-inner__link--active')

        if( document.body.clientWidth < 1023 ) {
          setTimeout(()=>{ burgerMenu.click() }, 150)
        }
    })
})

// switch burger
burgerMenu.addEventListener('click', e => {
    burgerMenu.classList.toggle('burger--active')
    if( ! burgerMenu.classList.contains('burger--active') ) {
        //alert('aaa')
        navInnerNavsArr.map(el => el.classList.remove('nav-inner--active'))
    } else {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    navOuter.classList.toggle('nav-outer--active')
    setTimeout(()=>{
        document.querySelector('body').classList.toggle('body__full')
    },500)
})


const splideArr = [];

if (document.querySelectorAll(".slider--frugal-style").length) {
  document.addEventListener("DOMContentLoaded", function () {
    for (
      let i = 0;
      i < document.querySelectorAll(".slider--frugal-style").length;
      i++
    ) {
      splideArr.push(
        new Splide(document.querySelectorAll(".slider--frugal-style")[i], {
          type: "slide",
          //direction: "ttb",
          //autoplay: "true",
          pagination: false,
          arrows: false,
          resetProgress: true,
          drag: "free",
          //focus: 0,
          interval: 2000,
          autoWidth: true,
          autoHeight: true,
          height: 63,

          breakpoints: {
            1024: {
              direction: "ttb",
              height: 63 * navInnerNavs[i].querySelectorAll('.nav-inner__link').length

            },
          },
        })
      );
     
      splideArr[i].mount();
    }

    //console.log(splideArr);
  });
}
