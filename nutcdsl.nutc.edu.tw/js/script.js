/* ==========================================================================
   跨領域數位自主學習平台 — 共用互動
   依賴：jQuery 3.7.1
   ========================================================================== */
(function ($) {
    'use strict';

    /* ----------------------------------------------------------------------
       側邊選單抽屜（<992px）
       無障礙需求：
       - 開啟時焦點移入抽屜，Esc 可關閉，關閉後焦點回到漢堡鈕（2.1.1 / 2.1.2）
       - 關閉時整個抽屜不可被 Tab 到（CSS visibility:hidden 處理，非 transform）
       - aria-expanded / aria-hidden 同步狀態
       ---------------------------------------------------------------------- */
    var $sidebar = $('#sidebar');
    var $toggle = $('#drawerToggle');
    var $close = $('#drawerClose');
    var $backdrop = $('#backdrop');
    var $body = $('body');

    // 登入頁等沒有側邊欄的版型，直接跳過抽屜模組
    var hasDrawer = $sidebar.length > 0 && $toggle.length > 0;

    if (hasDrawer) {

    var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]),' +
        'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // 是否處於抽屜模式（未達 lg 斷點）
    function isDrawerMode() {
        return window.matchMedia('(max-width: 991.98px)').matches;
    }

    function openDrawer() {
        $sidebar.addClass('is-open').attr('aria-hidden', 'false');
        $backdrop.addClass('is-open');
        $toggle.attr('aria-expanded', 'true');
        $body.addClass('drawer-open');

        // 焦點移入抽屜第一個可聚焦元素。
        // visibility:hidden 的元素無法被聚焦，先強制重排讓 .is-open 的
        // visibility:visible 立即生效（不用 rAF —— 背景分頁會被節流而延後執行）
        void $sidebar[0].offsetWidth;

        var $first = $sidebar.find(FOCUSABLE).filter(':visible').first();
        if ($first.length) {
            // 用原生 focus()，jQuery 的 trigger('focus') 在此情境可能不生效
            $first[0].focus();
        }
    }

    function closeDrawer(returnFocus) {
        $sidebar.removeClass('is-open').attr('aria-hidden', 'true');
        $backdrop.removeClass('is-open');
        $toggle.attr('aria-expanded', 'false');
        $body.removeClass('drawer-open');

        if (returnFocus !== false) {
            $toggle[0].focus();
        }
    }

    function isOpen() {
        return $sidebar.hasClass('is-open');
    }

    $toggle.on('click', function (e) {
        e.preventDefault();
        if (isOpen()) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    $close.on('click', function (e) {
        e.preventDefault();
        closeDrawer();
    });

    $backdrop.on('click', function () {
        closeDrawer();
    });

    // Esc 關閉 + 焦點鎖在抽屜內（Tab 循環）
    $(document).on('keydown', function (e) {
        if (!isOpen()) {
            return;
        }

        if (e.key === 'Escape' || e.keyCode === 27) {
            e.preventDefault();
            closeDrawer();
            return;
        }

        if (e.key === 'Tab' || e.keyCode === 9) {
            var $items = $sidebar.find(FOCUSABLE).filter(':visible');
            if (!$items.length) {
                return;
            }
            var first = $items.first()[0];
            var last = $items.last()[0];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // 視窗放大到桌機寬度時，復原成一般側邊欄
    function syncDrawerState() {
        if (isDrawerMode()) {
            if (!isOpen()) {
                $sidebar.attr('aria-hidden', 'true');
            }
        } else {
            // 桌機：側邊欄常駐，必須可被 Tab 到
            $sidebar.removeClass('is-open').removeAttr('aria-hidden');
            $backdrop.removeClass('is-open');
            $toggle.attr('aria-expanded', 'false');
            $body.removeClass('drawer-open');
        }
    }

    var resizeTimer = null;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncDrawerState, 150);
    });

    syncDrawerState();

    } /* end if (hasDrawer) */

    /* ----------------------------------------------------------------------
       bootstrap-select：搜尋／篩選下拉
       ---------------------------------------------------------------------- */
    if ($.fn.selectpicker) {
        $('.bs-select').selectpicker();
    }

    /* ----------------------------------------------------------------------
       勾選框的半選狀態（父項目只勾了部分子項）
       indeterminate 只能用 JS 設，HTML 屬性做不到，因此改由 data-indeterminate 標記
       ---------------------------------------------------------------------- */
    $('input[type="checkbox"][data-indeterminate="true"]').prop('indeterminate', true);

    /* ----------------------------------------------------------------------
       課程卡橫向捲動：手機版可用方向鍵捲動（2.1.1 鍵盤操作）
       ---------------------------------------------------------------------- */
    $('.course-grid').on('keydown', function (e) {
        var step = 242; // 卡片 230 + 間距 12
        if (e.key === 'ArrowRight' || e.keyCode === 39) {
            e.preventDefault();
            this.scrollLeft += step;
        } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
            e.preventDefault();
            this.scrollLeft -= step;
        }
    });

    /* ----------------------------------------------------------------------
       回到頁首
       捲過一個視窗高度才出現，免得一進站就擋在角落。
       用 scrollTo({behavior:'smooth'})，讀不懂的瀏覽器會直接跳回頂端（也可以接受）；
       使用者若設定了減少動態，就一律直接跳。
       ---------------------------------------------------------------------- */
    (function () {
        var $btn = $(
            '<button type="button" class="to-top" hidden>' +
            '  <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>' +
            '  <span class="a11y-hidden">回到頁首</span>' +
            '</button>'
        ).appendTo('body');

        var reduce = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function sync() {
            var show = (window.pageYOffset || document.documentElement.scrollTop) > 320;
            // 用 hidden 屬性而非 .toggle()：[hidden]{display:none} 會蓋掉 display:''
            $btn.prop('hidden', !show);
            $btn.toggleClass('is-on', show);
        }

        $btn.on('click', function () {
            if (!reduce) {
                try { window.scrollTo({ top: 0, behavior: 'smooth' }); return; } catch (e) { /* 舊瀏覽器往下走 */ }
            }
            window.scrollTo(0, 0);
        });

        $(window).on('scroll resize', sync);
        sync();
    }());

})(jQuery);
