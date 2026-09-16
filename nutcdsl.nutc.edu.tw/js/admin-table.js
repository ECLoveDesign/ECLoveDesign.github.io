/* --------------------------------------------------------------------------
   後臺列表：DataTables 接管排序 / 分頁 / 搜尋 / 全選

   刻意只載 jquery.dataTables.min.js，不載 dataTables.bootstrap4：
   分頁與筆數改由這支自己畫成設計稿的 .table-foot / .pager 標記，
   才不用去蓋 DataTables 內建那一套 .dataTables_* 樣式。

   <table> 上的設定（都可省略）
     data-unit="個帳號"      筆數文案的單位，預設「筆」
     data-page-length="10"   每頁筆數；0 = 不分頁（通知樣板、角色清單）
     data-search="#aq"       外部搜尋框；表單送出或輸入時套到 DataTables
     data-status-col="8"     頁籤篩選要比對的欄位索引
     data-filter="#stateFilter" data-filter-col="6"
                             下拉篩選：選單的值要比對的欄位索引
     data-select-count=".js-sel-count"  「已選 N 筆」的顯示位置
     data-responsive="false" 不要 DataTables Responsive 的展開鈕
                             （學習歷程的表格在窄螢幕本來就會整列變成小卡，
                               設計稿已經有自己的做法，不必再收欄位）

   只有標了 .th-sort 的欄位可排序，其餘（勾選欄、操作欄）一律關掉，
   維持設計稿上只有部分欄位有排序箭頭的樣子。
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    if (!$.fn.DataTable) return;

    function pageItems(page, pages) {
        // 設計稿的樣式： ‹ 1 2 3 … 27 ›
        var out = [], i;
        if (pages <= 7) {
            for (i = 0; i < pages; i++) out.push(i);
            return out;
        }
        out.push(0);
        var from = Math.max(1, page - 1), to = Math.min(pages - 2, page + 1);
        if (from > 1) out.push('…');
        for (i = from; i <= to; i++) out.push(i);
        if (to < pages - 2) out.push('…');
        out.push(pages - 1);
        return out;
    }

    function renderFoot($foot, dt, cfg) {
        if (!$foot.length) return;
        var info = dt.page.info();
        var unit = cfg.unit || '筆';
        var pages = Math.max(info.pages, 1);

        var countText = cfg.paging
            ? '共 ' + info.recordsDisplay.toLocaleString() + ' ' + unit + '，第 ' + (info.page + 1) + ' / ' + pages + ' 頁'
            : '共 ' + info.recordsDisplay.toLocaleString() + ' ' + unit;

        var $count = $foot.find('.table-foot__count');
        if (!$count.length) $count = $('<p class="table-foot__count"></p>').prependTo($foot);
        $count.text(countText);

        var $nav = $foot.find('nav');
        if (!cfg.paging) { $nav.remove(); return; }
        if (!$nav.length) {
            $nav = $('<nav></nav>').attr('aria-label', cfg.pagerLabel || '列表分頁').appendTo($foot);
        }

        var $ul = $('<ul class="pager"></ul>');
        $('<li></li>').append(
            $('<a class="pager__link pager__link--prev" href="#" aria-label="上一頁"></a>')
                .toggleClass('is-disabled', info.page === 0)
                .attr('data-page', info.page - 1)
        ).appendTo($ul);

        $.each(pageItems(info.page, pages), function (i, p) {
            if (p === '…') {
                $('<li><span class="pager__ellipsis" aria-hidden="true">…</span></li>').appendTo($ul);
                return;
            }
            var $a = $('<a class="pager__link" href="#"></a>').text(p + 1).attr('data-page', p);
            if (p === info.page) $a.attr('aria-current', 'page');
            $('<li></li>').append($a).appendTo($ul);
        });

        $('<li></li>').append(
            $('<a class="pager__link pager__link--next" href="#" aria-label="下一頁"></a>')
                .toggleClass('is-disabled', info.page >= pages - 1)
                .attr('data-page', info.page + 1)
        ).appendTo($ul);

        $nav.empty().append($ul);
    }

    function setupSelectAll($table, dt, cfg) {
        var $all = $table.find('thead input[type="checkbox"]');
        if (!$all.length) return;

        function rowBoxes() {
            // 只作用在「當前這一頁」看得到的列
            return $(dt.rows({ page: 'current' }).nodes()).find('td input[type="checkbox"]');
        }

        function sync() {
            // 表頭那顆是「全選本頁」，所以它的勾/半勾只看當前頁
            var $boxes = rowBoxes();
            var total = $boxes.length;
            var on = $boxes.filter(':checked').length;
            $all.prop('checked', total > 0 && on === total);
            $all.prop('indeterminate', on > 0 && on < total);

            if (cfg.selectCount) {
                var $badge = $(cfg.selectCount);
                if ($badge.length) {
                    // 但「已選 N 筆」要算全部頁次；換頁時未顯示的列仍保有勾選狀態，
                    // 只數當前頁會讓數字在翻頁時莫名歸零。
                    var all = $(dt.rows().nodes()).find('td input[type="checkbox"]:checked').length;
                    // 用 hidden 屬性而非 .toggle()：[hidden]{display:none} 會蓋掉 display:''
                    $badge.text('已選 ' + all + ' 筆').prop('hidden', all === 0);
                }
            }
        }

        $all.on('change', function () {
            rowBoxes().prop('checked', $all.prop('checked'));
            sync();
        });
        $table.on('change', 'tbody input[type="checkbox"]', sync);
        dt.on('draw', sync);
        sync();
    }

    /* 欄寬有限、內容放不下的欄位：CSS 截斷成「…」，滑鼠移上去補一個
       顯示完整文字的 tooltip。哪些欄要截斷由 thead 的 .is-clip 決定，
       實際掛不掛 tooltip 則看那一格真的有沒有溢出（scrollWidth > clientWidth），
       同一欄短的內容不會多出一個沒意義的提示。

       tooltip 用 delegated 的方式掛在 table 上：DataTables 每次排序 / 換頁
       都會重建 tbody，逐格 init 的實例會跟著失效。 */
    function setupClip($table, dt, cols) {
        if (!cols.length) return;

        if ($.fn.tooltip) {
            $table.tooltip({
                selector: 'tbody .is-clip[title]',
                container: 'body',
                boundary: 'viewport',
                placement: 'top',
                template: '<div class="tooltip tooltip-cell" role="tooltip">' +
                    '<div class="arrow"></div><div class="tooltip-inner"></div></div>'
            });
        }

        function mark() {
            $(dt.rows({ page: 'current' }).nodes()).each(function () {
                var $cells = $(this).children('td, th');
                $.each(cols, function (k, idx) {
                    var el = $cells.get(idx);
                    if (!el) return;
                    var $c = $(el).addClass('is-clip');
                    // +1 容忍次像素；展開列（.dtr-details）不在這裡，不受影響
                    if (el.scrollWidth > el.clientWidth + 1) {
                        $c.attr('title', $.trim($c.text()));
                    } else {
                        $c.removeAttr('title');
                    }
                });
            });
        }

        dt.on('draw', mark);
        $(window).on('resize', mark);
        mark();
    }

    /* 最右邊的操作欄：照「這張表實際有多少按鈕」決定寬度

       原本這一欄沒寫寬度，等於把其他欄沒用掉的空間全吃下去（量下來佔 28%～35%，
       但按鈕其實只需要 124～304px）；反過來，有些表（課程審核一列四顆鈕）又因為
       別欄的內容把它擠窄，按鈕被迫折行。所以寬度要照這張表自己的內容算，
       每張表的結果本來就不一樣。

       只設 width 不夠 —— 在 table-layout: auto 底下那只是建議值，別欄內容一長就被
       壓過去。要連 min-width 一起給，而且 th 與 td 都要，欄位才真的固定得住。
       用 CSS 變數掛在 table 上，換頁重畫 tbody 之後也不必重設。

       省下來的寬度要明確還給某一個內容欄：其他欄都寫死百分比、操作欄改成 px
       之後，各欄總和會小於表格寬度，瀏覽器不會自己補滿，表格右側就空出一塊。

       手機版（.collapsed）只留一顆按鈕的寬度，其餘讓它們往下折。 */
    function fitActionCol($table, clipCols) {
        var $ths = $table.find('thead th');
        var $last = $ths.last();

        // 量測對象：優先是 .row-actions（後臺列表），沒有的話就看最後一欄裡的按鈕
        function cells() {
            var $c = $table.find('tbody tr:not(.child) .row-actions');
            if ($c.length) return $c;
            return $table.find('tbody tr:not(.child)').map(function () {
                var el = $(this).children().last()[0];
                return el && $(el).find('.btn').length ? el : null;
            });
        }
        if (!cells().length) return;

        // 原始的寬度宣告要留著：每次重算前先還原，否則補過的值會越疊越大
        var orig = $ths.map(function () { return this.style.width || ''; }).get();

        // 缺口補給誰：優先給會被截斷的文字欄（標題／內容），否則給最寬的資料欄
        var growIdx = clipCols && clipCols.length ? clipCols[0] : -1;
        if (growIdx < 0) {
            var widest = -1;
            $ths.each(function (i) {
                if (i === $ths.length - 1) return;               // 操作欄本身不算
                if (this.offsetWidth > widest) { widest = this.offsetWidth; growIdx = i; }
            });
        }

        function apply() {
            $ths.each(function (i) { this.style.width = orig[i]; });
            $table.removeClass('has-act-w');

            // 前臺的表格在窄螢幕會整列變成小卡、表頭整個隱藏（見 history.css /
            // completion.css）。那時候沒有「欄」可言，鎖欄寬只會擋到小卡的版面。
            if ($table.find('thead').css('display') === 'none') return;

            var $c = cells();
            if (!$c.length) return;

            var $cell = $($c[0]).closest('td, th');
            var pad = parseFloat($cell.css('padding-left')) + parseFloat($cell.css('padding-right'));
            var gap = parseFloat($($c[0]).css('column-gap')) || 0;

            var w = 0;
            var mobile = $table.hasClass('collapsed');
            $c.each(function () {
                var kids = this.children, i, sum = 0;
                for (i = 0; i < kids.length; i++) {
                    if (mobile) sum = Math.max(sum, kids[i].offsetWidth);   // 只要最寬的一顆
                    else sum += kids[i].offsetWidth;
                }
                if (!mobile) sum += Math.max(0, kids.length - 1) * gap;
                if (sum > w) w = sum;
            });
            if (!w) return;

            // 再保險一次：不管量出來多少，都不讓它超過整張表的一半
            w = Math.ceil(Math.min(w + pad, $table.width() * 0.5));
            $table[0].style.setProperty('--act-w', w + 'px');
            $table.addClass('has-act-w');

            // 量缺口：表格寬度減掉各欄實際寬度（桌機時 .dt-ctrl 是 display:none，不計）
            // 手機版一樣要補 —— 操作欄縮成一顆按鈕寬之後空出來的更多。
            var used = 0;
            $ths.each(function () { used += this.offsetWidth; });
            var left = $table[0].offsetWidth - used;
            if (left > 1 && growIdx >= 0) {
                var $grow = $ths.eq(growIdx);
                $grow.css('width', Math.round($grow[0].offsetWidth + left) + 'px');
            }
        }

        apply();
        $(window).on('resize', apply);
    }

    function setupSearch(dt, cfg) {
        if (!cfg.search) return;
        var $input = $(cfg.search);
        if (!$input.length) return;

        $input.on('input search', function () { dt.search(this.value).draw(); });
        $input.closest('form').on('submit', function (e) {
            e.preventDefault();
            dt.search($input.val()).draw();
        });
    }

    /* 下拉篩選：選單的值直接拿去比對指定欄位的文字。
       跟頁籤篩選（setupTabs）走同一套 ext.search，差別只在觸發的控制項。
       空值（例如「全部」）代表不過濾。 */
    function setupFilter($table, dt, cfg) {
        if (!cfg.filter || cfg.filterCol == null) return;
        var $sel = $(cfg.filter);
        if (!$sel.length) return;

        $.fn.dataTable.ext.search.push(function (settings, data) {
            if (settings.nTable !== $table[0]) return true;
            var v = $sel.val();
            if (!v) return true;
            return (data[cfg.filterCol] || '').indexOf(v) >= 0;
        });

        $sel.on('change', function () { dt.draw(); });
    }

    function tabLabel($a) {
        return $a.clone().find('.a11y-hidden, .badge').remove().end().text().trim();
    }

    function setupTabs($table, dt, cfg) {
        var $tabs = $table.closest('.data-panel').find('.tabs-inline .nav-link');
        if (!$tabs.length || cfg.statusCol == null) return;

        // 頁籤上的件數改成照實際資料算，不再是寫死的數字
        var col = dt.column(cfg.statusCol).data().toArray().map(function (v) {
            return $('<div/>').html(v).text();
        });
        $tabs.each(function () {
            var $a = $(this), label = tabLabel($a);
            var n = col.filter(function (v) { return v.indexOf(label) >= 0; }).length;
            $a.find('.badge').text(n);
        });

        var filter = null;
        $.fn.dataTable.ext.search.push(function (settings, data) {
            if (settings.nTable !== $table[0] || !filter) return true;
            return (data[cfg.statusCol] || '').indexOf(filter) >= 0;
        });

        $tabs.on('click', function (e) {
            e.preventDefault();
            var $a = $(this);
            $tabs.removeClass('active').attr('aria-selected', 'false');
            $a.addClass('active').attr('aria-selected', 'true');
            var label = tabLabel($a);
            filter = (label === '全部' || !label) ? null : label;
            dt.draw();
        });
    }

    $(function () {
        // .data-table 是後臺列表；.js-datatable 讓前臺（學習歷程）的表格也能接管
        $('table.data-table, table.js-datatable').each(function () {
            var $table = $(this);
            // 附加元件的樣式（分頁列、展開鈕、截斷…）統一掛在 .dt-table 上，
            // 前後臺各自的表格外觀就不必互相遷就。見 css/datatable.css。
            $table.addClass('dt-table');
            var $panel = $table.closest('.data-panel, section');
            var $foot = $panel.find('.table-foot').first();

            // 沒有頁尾也沒有排序欄的（報表的各領域統計）本來就不是可操作列表，跳過
            if (!$foot.length && !$table.find('.th-sort').length) return;

            var pageLength = $table.data('page-length');
            if (pageLength === undefined) pageLength = 10;
            var cfg = {
                unit: $table.data('unit') || '筆',
                paging: pageLength !== 0 && $foot.find('nav').length > 0,
                pagerLabel: $foot.find('nav').attr('aria-label'),
                search: $table.data('search'),
                statusCol: $table.data('status-col'),
                filter: $table.data('filter'),
                filterCol: $table.data('filter-col'),
                selectCount: $table.data('select-count')
            };

            // 排序標題在設計稿是 <a href="#">，但它不是連結，
            // 交給 DataTables 前先換成 span，免得點下去跳到 #。
            $table.find('a.th-sort').each(function () {
                $(this).replaceWith($('<span class="th-sort"></span>').text($(this).text()));
            });

            // 手機版展開鈕要獨立一欄：直接讓現有的第一欄當控制欄的話，
            // 那欄多半是勾選框，點一下會同時勾選與展開。所以在最前面補一欄空的。
            var useResponsive = $table.data('responsive') !== false;
            if (useResponsive) {
                $table.find('thead tr').prepend('<th scope="col" class="dt-ctrl">' +
                    '<span class="a11y-hidden">展開詳細資料</span></th>');
                $table.find('tbody tr').prepend('<td class="dt-ctrl"></td>');
                if (cfg.statusCol != null) cfg.statusCol += 1;   // 欄位索引整個右移一格
                if (cfg.filterCol != null) cfg.filterCol += 1;
            }

            // 逐欄指定 orderable。用 columnDefs 的 _all + targets 兩段寫法時，
            // DataTables 會讓 _all 蓋掉個別設定，結果是整張表都不能排序。
            //
            // responsivePriority 數字越小越晚被收起來：
            //   1 展開鈕、2 最右邊的操作欄、3 勾選欄、4 第一個資料欄，
            //   其餘留預設的 10000 —— 也就是先從中間的欄位開始收。
            var columns = [], orderable = [];
            var $ths = $table.find('thead th');
            var lastIdx = $ths.length - 1;
            var firstDataIdx = $table.find('thead th').index($ths.filter(':has(.th-sort)').first());
            $ths.each(function (i) {
                var can = $(this).find('.th-sort').length > 0;
                var prio = 10000;
                if (useResponsive && i === 0) prio = 1;                  // 展開鈕
                else if (i === lastIdx) prio = 2;                        // 操作欄
                else if ($(this).find('input[type="checkbox"]').length) prio = 3;
                else if (i === firstDataIdx) prio = 4;
                columns.push({ orderable: can, responsivePriority: prio });
                if (can) orderable.push(i);
            });

            // 設計稿預設的排序欄（th 上原本就寫了 aria-sort）
            var order = [];
            $table.find('thead th').each(function (i) {
                var s = $(this).attr('aria-sort');
                if (s === 'ascending') order.push([i, 'asc']);
                else if (s === 'descending') order.push([i, 'desc']);
            });

            // 讓 CSS 知道這張表由 Responsive 接手，可以關掉橫向捲動
            if (useResponsive) $table.closest('.table-responsive').addClass('is-responsive-dt');

            // 會被 CSS 截斷的欄位（thead 標了 .is-clip）。索引是補上展開鈕那一欄之後的。
            var clipCols = [];
            $table.find('thead th').each(function (i) {
                if ($(this).hasClass('is-clip')) clipCols.push(i);
            });

            // 展開內容自己畫：Responsive 預設只列「被收起來的欄位」，
            // 但標題這種欄位在手機版仍然看得見、卻被截成「…」，展開了還是讀不到全文。
            // 所以把「仍然可見但有截斷」的欄位也一起列進去（值取 title，也就是完整文字）。
            function renderDetails(api, rowIdx, columns) {
                var html = $.map(columns, function (col) {
                    var full = null;
                    if (!col.hidden) {
                        if ($.inArray(col.columnIndex, clipCols) < 0) return null;
                        var node = api.cell(rowIdx, col.columnIndex).node();
                        full = node && $(node).attr('title');
                        if (!full) return null;
                    }
                    var $li = $('<li></li>')
                        .attr('data-dtr-index', col.columnIndex)
                        .append($('<span class="dtr-title"></span>').html(col.title));
                    if (full != null) {
                        $li.addClass('dtr-clip').append($('<span class="dtr-data"></span>').text(full));
                    } else {
                        $li.append($('<span class="dtr-data"></span>').html(col.data));
                    }
                    return $li[0].outerHTML;
                }).join('');
                return html ? $('<ul class="dtr-details"/>').append(html) : false;
            }

            var dt = $table.DataTable({
                dom: 't',
                responsive: useResponsive ? {
                    // 展開鈕固定放在第 0 欄（上面補的那一欄）
                    details: {
                        type: 'column',
                        target: 0,
                        renderer: renderDetails
                    }
                } : false,
                paging: cfg.paging,
                pageLength: cfg.paging ? (pageLength || 10) : 100000,
                ordering: orderable.length > 0,
                order: order,
                searching: true,
                info: false,
                autoWidth: false,
                columns: columns,
                language: { zeroRecords: '查無符合條件的資料', emptyTable: '目前沒有資料' }
            });

            renderFoot($foot, dt, cfg);
            dt.on('draw', function () { renderFoot($foot, dt, cfg); });

            $foot.on('click', '.pager__link', function (e) {
                e.preventDefault();
                var $a = $(this);
                if ($a.hasClass('is-disabled')) return;
                dt.page(parseInt($a.attr('data-page'), 10)).draw('page');
            });

            fitActionCol($table, clipCols);
            setupClip($table, dt, clipCols);
            setupSelectAll($table, dt, cfg);
            setupSearch(dt, cfg);
            setupTabs($table, dt, cfg);
            setupFilter($table, dt, cfg);
        });
    });
}(jQuery));
