$(function () {
    courseType("");
    $("#kind>.container>blockquote>ul> li>a").click(function () {
        var href = $(this).attr("href").toLowerCase();
        if (href.indexOf("courseall") > -1)
            courseType(href.replace("courseall.htm#", ""));
    });
});

function courseType(str) {
    var url = window.location.href.toLowerCase();
    if ((url.substring(url.lastIndexOf("/"), url.length - 1).indexOf("courseall") > -1) && str != "") {
        $(".courseall >ul").hide();
        $(".courseall >ul#" + str).show();
    } else if ((url.substring(url.lastIndexOf("/"), url.length - 1).indexOf("courseall") > -1) && str == "") {
        if (url.lastIndexOf("#") > -1) {
            var href = url.substring(url.lastIndexOf("#") + 1, url.length);
            $(".courseall >ul").hide();
            $("#" + href).show();
        }
    }
    $("html,body").scrollTop(0);
}

$(function () {
    $("#kind>.container>blockquote>ul> li").click(function () {
        $(this).addClass("clickbtn").siblings().removeClass("clickbtn");
    })
})

$(function () {
    $('nav>ul>li>a').click(function () {
        var place = $(this).attr("href");
        $('html,body').animate({
            scrollTop: place.offset().top
        }, 800);
    });
})

//$(function () {
//    $(window).scroll(function () {
//        if ($(this).scrollTop() > 0) { /* 要滑動到選單的距離 */
//            $('nav').addClass('navFixed'); /* 幫選單加上固定效果 */
//            $('nav#sidr').removeClass('navFixed');
//            $('#rwdMenuBar').css('top', '20px');
//        } else {
//            $('nav').removeClass('navFixed');
//            $('#rwdMenuBar').css('top', '40px'); /* 移除選單固定效果 */
//        }
//    });
//});

$(function () {
    tableTh(".table_small");
})

function tableTh(selecter) {
    $(selecter).each(function () {
        var th = $(this).find("tr:first th");
        for (i = 0; th.length > i; i++) {
            $(this).find("tr td:nth-child(" + (i + 1) + ")").attr("data-th", th.eq(i).html() + " : ");
        }
    });
}


//$(function () {
//    $('nav ul li>a').click(function () {
//        var target = $(this).attr('href');
//        var position = $(target).offset().top,
//            duration = 1000,
//            navHeight = $('nav').outerHeight();
//        $('html,body').stop().animate({
//            scrollTop: position - navHeight
//        }, duration);
//    });
//});
