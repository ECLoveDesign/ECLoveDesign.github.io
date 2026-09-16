/* --------------------------------------------------------------------------
   純 CSS 畫的長條：進場動畫與數值提示
   （報表管理的各種統計長條、課程內頁同儕評價的星等分布）

   Chart.js 畫的那張（各月選課人次）本來就有 tooltip 與進場動畫，不在這裡處理。

   兩件事
     1. 進場動畫：從 0 長到該有的寬度，同一組依序錯開 60ms。
        觸發時機是「捲到看得見的時候」而不是載入當下 —— 報表頁的排行長條在
        一千多像素以下，載入就跑的話，等使用者捲到那裡動畫早就結束了，
        看起來就只有第一區塊有動效。
     2. hover tooltip：內容從同一列既有的文字組出來，不另外寫一份數字在
        data-* 裡（避免兩邊對不起來）。

   tooltip 掛在 track（整條底槽）而不是 fill，滑鼠在整條上任何位置都吃得到。
   container: 'body' 是必要的：.data-panel / .card 都有 overflow 與 z-index，
   預設插在觸發點旁邊會被裁掉或壓在 sticky 表頭底下。
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    var STEP = 60;          // 同一組相鄰長條的錯開時間
    var reduce = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var FILLS = '.rank-item__fill, .rate-trend__fill, .rate-split__done, ' +
        '.rate-split__rest, .rate-bar__fill, .rating-bar__fill';

    // 一組＝一次一起跑動畫、彼此錯開的單位
    var GROUPS = '.rank-list, .rate-trend, .rate-split, .data-table, .review-bars';

    function txt($el) {
        return $.trim($el.first().text());
    }

    /* 每一種長條怎麼組出提示文字 —— 都從畫面上既有的文字讀，不另外寫死數字 */
    var SPECS = [
        {
            // 熱門課程排行：課名 · 438 人
            sel: '.rank-item__track',
            title: function ($t) {
                var $li = $t.closest('.rank-item');
                var unit = txt($li.closest('.card').find('.panel-head__unit')).replace(/^單位：/, '') || '人';
                return txt($li.find('.rank-item__name')) + ' · ' +
                    txt($li.find('.rank-item__value')) + ' ' + unit;
            }
        },
        {
            // 各領域統計：資訊科技 完課率 74.3%（全校平均 68.5%）
            sel: '.rate-bar',
            title: function ($t) {
                var $tr = $t.closest('tr');
                var avg = txt($('.rate-bar__avg-label'));
                var s = txt($tr.find('th')) + ' 完課率 ' + txt($tr.find('.is-rate'));
                return avg ? s + '（' + avg + '）' : s;
            }
        },
        {
            // 完課率逐年：111 學年度 · 61.8%
            sel: '.rate-trend__track',
            title: function ($t) {
                var $item = $t.closest('.rate-trend__item');
                return txt($item.find('.rate-trend__year')) + ' · ' + txt($item.find('.rate-trend__num'));
            }
        },
        {
            // 完課率占比：兩段各自對應圖例的一句
            sel: '.rate-split__done',
            title: function ($t) { return txt($t.closest('.panel-body').find('.rate-legend span').eq(0)); }
        },
        {
            sel: '.rate-split__rest',
            title: function ($t) { return txt($t.closest('.panel-body').find('.rate-legend__rest')); }
        },
        {
            // 同儕評價星等分布：5 顆星 · 58%（約 106 則）
            sel: '.rating-bar__track',
            title: function ($t) {
                var $p = $t.closest('.rating-bar');
                var pct = parseFloat(txt($p.find('.rating-bar__pct')));
                var total = parseInt(txt($('.review-summary__count')).replace(/[^0-9]/g, ''), 10);
                var s = txt($p.find('.rating-bar__label')) + ' · ' + txt($p.find('.rating-bar__pct'));
                if (!isNaN(pct) && !isNaN(total)) s += '（約 ' + Math.round(total * pct / 100) + ' 則）';
                return s;
            }
        }
    ];

    /* 捲到看得見才觸發。用 getBoundingClientRect 而不是 IntersectionObserver：
       行為一樣，但 IO 一旦因為環境沒回呼（內嵌 iframe、預覽工具）就會讓元素
       永遠停在初始狀態，比沒有動畫更糟；用捲動事件最差也只是立刻跑完。 */
    function watch(items, run) {
        var MARGIN = 60;    // 下緣內縮，進畫面一點點才開始跑
        var ns = '.watch' + (++watchId);

        function check() {
            var vh = window.innerHeight || document.documentElement.clientHeight;
            var left = 0;
            $.each(items, function (i, it) {
                if (it.done) return;
                var r = it.el.getBoundingClientRect();
                if (r.top < vh - MARGIN && r.bottom > 0) run(it);
                else left++;
            });
            if (!left) $(window).off(ns);
        }

        $(window).on('scroll' + ns + ' resize' + ns, check);
        check();
        // 版面（字型、圖片）安頓後再確認一次，免得初次量到的位置是舊的
        window.setTimeout(check, 300);
    }

    var watchId = 0;

    /* 進場淡入：標了 data-reveal 的容器，底下每個直接子元素依序浮上來。
       用在沒有長條可以長、但還是希望有載入感的區塊（學習歷程的統計磚等）。 */
    function setupReveal() {
        var items = [];
        $('[data-reveal]').each(function () {
            var $kids = $(this).children();
            if (!$kids.length) return;
            $kids.addClass('is-reveal').each(function (i) {
                this.style.transitionDelay = (i * STEP) + 'ms';
            });
            items.push({ el: this, $kids: $kids, done: false });
        });
        if (!items.length) return;

        if (reduce) {
            $.each(items, function (i, it) { it.$kids.addClass('is-in'); });
            return;
        }
        watch(items, function (it) {
            it.done = true;
            it.$kids.addClass('is-in');
        });
    }

    $(function () {
        setupReveal();

        var $fills = $(FILLS);
        if (!$fills.length && !$('.mini-rank__name').length) return;   // reveal 已在上面處理

        /* ------------------------------------------------------------ tooltip */
        $.each(SPECS, function (i, spec) {
            $(spec.sel).each(function () {
                var $t = $(this);
                var title = spec.title($t);
                if (!title) return;
                $t.attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', title: title });
            });
        });

        // 各領域排行的課名本來就是 CSS 截斷的，溢出的才補完整文字
        $('.mini-rank__name').each(function () {
            if (this.scrollWidth > this.clientWidth + 1) {
                $(this).attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', title: $.trim($(this).text()) });
            }
        });

        if ($.fn.tooltip) {
            $('[data-toggle="tooltip"]').tooltip({
                container: 'body',
                boundary: 'viewport',
                trigger: 'hover focus',
                // Bootstrap 4 沒有 customClass（那是 5 的選項），要換樣式得自己給 template
                template: '<div class="tooltip tooltip-report" role="tooltip">' +
                    '<div class="arrow"></div><div class="tooltip-inner"></div></div>'
            });
        }

        /* -------------------------------------------------------- 載入動畫 */
        if (reduce) {
            $fills.addClass('is-bar-anim');
            return;
        }

        // 目標寬度就寫在 inline style 上；先歸零，等捲到看得見再放回去。
        var groups = [];
        $(GROUPS).each(function () {
            var $g = $(this);
            var $gf = $g.find(FILLS);
            if (!$gf.length) return;
            $gf.each(function (i) {
                var target = this.style.width;
                if (!target) return;
                $(this).data('bar-target', target)
                    .css({ width: 0, 'transition-delay': (i * STEP) + 'ms' });
            });
            groups.push({ el: this, $fills: $gf, done: false });
        });

        function grow(g) {
            if (g.done) return;
            g.done = true;
            g.$fills.each(function () {
                var $f = $(this);
                var target = $f.data('bar-target');
                if (!target) return;
                // 類別與寬度是同一次樣式計算變更的，瀏覽器以變更後的 transition
                // 判斷要不要過渡，所以第一次長出來就有動畫。
                $f.addClass('is-bar-anim').css('width', target);
            });
        }

        watch(groups, grow);
    });
}(jQuery));
