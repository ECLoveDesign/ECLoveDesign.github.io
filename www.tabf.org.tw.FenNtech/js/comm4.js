var body;

/* GA */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-29584117-1']);
_gaq.push(['_setDomainName', 'tabf.org.tw']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

$(function () {
    body = $('body');
    autoTextAlign("table");
    tableTh(".rwd-table");
    navRWD();
    topScroll();
    if ($("nav").length > 0) {
        goScroll("nav a", $("nav:last").height(), 0);
    }
});

/*
RWD選單
*/
function navRWD() {
    var wrap = $('body');
    var navClone = $('body > #wrap > nav').clone();
    $('body').append('<div id="rwdMenuBar">&#9776;</div>');
    var sidrClick = $('#rwdMenuBar');
    navClone.attr('id', 'sidr');
    body.append(navClone);
    sidr('left', sidrClick, $('#sidr'), wrap, 750);
}

/*sidr*/
function sidr(direction, sidrClick, menu, wrap, maxWidth) {

    direction = direction.toLowerCase();
    if (direction == 'left' || direction == 'right')
        direction = direction;
    else
        direction = '';

    if (direction != '') {
        body.append('<div id="sidrMask" />');
        var sidrMask = $('#sidrMask');
        var defaultScale = getDeviceScale();
        var menuWidth = menu.css('width');
        menu.css(direction, '-' + menuWidth);
        sidrClick.click(sidrToggle);
        sidrMask.click(sidrClose);

        $(window).on('resize', function () {
            sidrClose();
        });
    } else {
        console.log('sidr direction error');
    }

    function sidrToggle() {
        if (menu.css('margin-' + direction) == menuWidth) {
            sidrClose();
        } else {
            sidrOpen();
        }
    }

    function sidrOpen() {
        if (menu.css('margin-' + direction) != menuWidth && body.width() <= maxWidth) {
            menu.addClass('open');
            if (direction == 'left') {
                sidrClick.animate({
                    marginLeft: menuWidth
                }, 300, function () {});
                menu.animate({
                    marginLeft: menuWidth
                }, 300, function () {
                    sidrMask.show();
                });
            } else {
                sidrClick.animate({
                    marginRight: menuWidth
                }, 300, function () {});
                menu.animate({
                    marginRight: menuWidth
                }, 300, function () {
                    sidrMask.show();
                });
            }
        }
    }

    function sidrClose() {
        if (menu.css('margin-' + direction) == menuWidth) {
            menu.removeClass('open');
            if (direction == 'left') {
                sidrClick.animate({
                    marginLeft: '0px'
                }, 300, function () {});
                menu.animate({
                    marginLeft: '0px'
                }, 300, function () {
                    sidrMask.hide();
                });
            } else {
                sidrClick.animate({
                    marginRight: '0px'
                }, 300, function () {});
                menu.animate({
                    marginRight: '0px'
                }, 300, function () {
                    sidrMask.hide();
                });
            }
        }
    }
}

/*
    載具縮放比例
*/
function getDeviceScale() {
    var deviceWidth, landscape = Math.abs(window.orientation) == 90;
    if (landscape) {
        // iPhone OS < 3.2 reports a screen height of 396px
        deviceWidth = Math.max(480, screen.height);
    } else {
        deviceWidth = screen.width;
    }
    return window.innerWidth / deviceWidth;
}

/*
	表格加附標題屬性
*/
function tableTh(selecter) {
    $(selecter).each(function () {
        var th = $(this).find("tr:first th");
        for (i = 0; th.length > i; i++) {
            $(this).find("tr td:nth-child(" + (i + 1) + ")").attr("data-th", th.eq(i).html() + " : ");
        }
    });
}

/*
	回到Top
*/
function topScroll() {
    $("body").append('<div id="gotop"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></div>');
    goScroll("#gotop", 0, 1000);
    var gotop = $("#gotop");
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            gotop.fadeIn("fast");
        } else {
            gotop.stop().fadeOut("fast");
        }
    });

    deviceScale("#gotop");
}

/*
	平滑書籤捲動
*/
function goScroll(selecter, toppadding, smooth) {
    $(selecter).click(function () {
        try {
            var href = $(this).attr("href");
            href = href.substring(href.lastIndexOf("#") + 1, href.length);
            var pos = $("a[name=" + href + "]").offset().top - toppadding;

            var url = window.location.pathname;
            if ((url.substring(url.lastIndexOf("/"), url.length - 1).toLowerCase().indexOf("default") > -1) || (url.lastIndexOf("/") == url.length - 1)) {
                if (smooth > 0)
                    $("html,body").animate({
                        scrollTop: pos
                    }, smooth);
                else {
                    $("html,body").scrollTop(pos);
                }

                return false;
            } else {
                return true;
            }
        } catch (err) {
            var pos = 0;
            if (smooth > 0) {
                $("html,body").animate({
                    scrollTop: pos
                }, smooth);
            } else {
                $("html,body").scrollTop(pos);
            }
        }
    });
}

/*
	指定文字靠右
*/
function autoTextAlign(selecter) {
    textAlign(".tdl", "l");
    textAlign(".tdr", "r");
    textAlign(".tdc", "c");

    function textAlign(x, y) {
        $(selecter + " > tbody > tr > " + x).each(function () {
            var i = $(this).index();
            var j = 0;

            if (typeof ($(this).attr("rc")) != "undefined") {
                j = $(this).attr("rc");
            }
            $(this).parent().parent().children("tr").children("td:nth-child(" + (i + 1 + parseInt(j, 10)) + ")").addClass(y);
        });
    }
}

/*
	當載具放大時隱藏 縮回時顯示
*/
function deviceScale(selecter) {

    // mobile only - keep the position:fixed header at constant size when page is zoomed
    if (navigator.userAgent.match(/Mobi/)) {
        $(window).on('load scroll', function () {
            if (getDeviceScale() < 1)
                $(selecter).hide();
            else
                $(selecter).show();
        })
    }

    function getDeviceScale() {
        var deviceWidth, landscape = Math.abs(window.orientation) == 90;
        if (landscape) {
            // iPhone OS < 3.2 reports a screen height of 396px
            deviceWidth = Math.max(480, screen.height);
        } else {
            deviceWidth = screen.width;
        }
        return window.innerWidth / deviceWidth;
    }
}
