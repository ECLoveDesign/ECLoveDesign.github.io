/* --------------------------------------------------------------------------
   匯入課程：檔案上傳區

   靜態稿裡的「已選擇的檔案」那一列是寫死的範例，點「移除」沒有反應，
   選了檔案也還是顯示原本那個檔名。這支把它接成真的：

     - 選擇檔案 / 拖曳進虛線框 → 讀出真正的檔名與大小填進那一列
     - 移除                    → 整列收掉、input 清空、回到空狀態
     - 副檔名或大小不符        → 那一列轉成紅色錯誤狀態，不讓它往下走
     - 沒有檔案就按「開始匯入」→ 先擋下來提醒，不跳成功視窗

   沒有後端，所以「格式檢核」是本機能判斷的那部分（副檔名、大小），
   筆數則照檔案大小估一個值，讓提示文案跟著檔案走而不是永遠 42 筆。

   標記約定（見 admin-courses.html）
     .file-panel[data-file-input="#impFile"]
       └ .file-row（範例列，選檔後就地改寫）
       └ .file-panel__empty（移除後顯示）
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    var MAX_BYTES = 5 * 1024 * 1024;       // 提示文案寫的 5 MB
    var BYTES_PER_ROW = 5800;              // 一列課程資料的概略大小，用來估筆數
    var CHECK_DELAY = 500;                 // 假裝在檢核格式的那一下

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }

    function FilePanel(el) {
        this.$panel = $(el);
        this.$row = this.$panel.find('.file-row');
        this.$name = this.$row.find('.file-row__name');
        this.$meta = this.$row.find('.file-row__meta');
        this.$badge = this.$row.find('.badge');
        this.$empty = this.$panel.find('.file-panel__empty');
        this.$input = $(this.$panel.data('file-input'));
        this.$zone = this.$input.closest('.dropzone');
        this.$submit = this.$panel.closest('.modal').find('.modal-footer .btn:not([data-dismiss])');

        // 範例列的原始文案要留著：彈窗關掉時要能還原成設計稿的樣子
        this.demo = {
            name: this.$name.text(),
            meta: this.$meta.text(),
            badge: this.$badge.text(),
            badgeClass: this.$badge.attr('class'),
            successText: this.$submit.attr('data-success-text') || ''
        };
        this.ok = true;
        this.bind();
    }

    FilePanel.prototype.setBadge = function (text, tone) {
        this.$badge
            .attr('class', 'badge badge-state badge-state--' + tone)
            .text(text);
    };

    // 檔名／大小照實顯示；筆數是估的，所以文案寫「約」
    FilePanel.prototype.show = function (file) {
        var self = this;
        var tooBig = file.size > MAX_BYTES;
        var isCsv = /\.csv$/i.test(file.name);

        this.$row.show().removeClass('file-row--error');
        this.$empty.prop('hidden', true);
        this.$name.text(file.name);
        this.$meta.text(formatSize(file.size));
        this.setBadge('格式檢核中…', 'neutral');
        this.ok = false;

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(function () {
            if (!isCsv) {
                self.fail('檔案格式不符', '僅支援 .csv（UTF-8 編碼）');
            } else if (tooBig) {
                self.fail('檔案過大', formatSize(file.size) + ' · 上限 5 MB');
            } else {
                var rows = Math.max(1, Math.round(file.size / BYTES_PER_ROW));
                self.$meta.text(formatSize(file.size) + ' · 約 ' + rows + ' 筆課程資料');
                self.setBadge('格式檢核通過', 'green');
                self.ok = true;
                self.$submit.attr('data-success-text',
                    '共 ' + rows + ' 筆課程已匯入，狀態為草稿。')
                    .data('success-text', '共 ' + rows + ' 筆課程已匯入，狀態為草稿。');
            }
        }, CHECK_DELAY);
    };

    FilePanel.prototype.fail = function (badge, meta) {
        this.$row.addClass('file-row--error');
        this.$meta.text(meta);
        this.setBadge(badge, 'red');
        this.ok = false;
    };

    FilePanel.prototype.clear = function () {
        window.clearTimeout(this.timer);
        this.$row.hide().removeClass('file-row--error');
        this.$empty.prop('hidden', false);
        // input.value = '' 才會讓「選同一個檔案兩次」也觸發 change
        if (this.$input.length) this.$input[0].value = '';
        this.ok = false;
    };

    // 彈窗關掉再打開時回到設計稿的初始樣子
    FilePanel.prototype.reset = function () {
        window.clearTimeout(this.timer);
        this.$row.show().removeClass('file-row--error');
        this.$empty.prop('hidden', true);
        this.$name.text(this.demo.name);
        this.$meta.text(this.demo.meta);
        this.$badge.attr('class', this.demo.badgeClass).text(this.demo.badge);
        if (this.$input.length) this.$input[0].value = '';
        this.$submit.attr('data-success-text', this.demo.successText)
            .data('success-text', this.demo.successText);
        this.ok = true;
    };

    FilePanel.prototype.bind = function () {
        var self = this;

        this.$input.on('change', function () {
            if (this.files && this.files.length) self.show(this.files[0]);
            else self.clear();
        });

        this.$panel.on('click', '.file-row .btn', function (e) {
            e.preventDefault();
            self.clear();
        });

        // 虛線框：拖曳進來也要收得到
        if (this.$zone.length) {
            this.$zone.on('dragover dragenter', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).addClass('is-dragover');
            });
            this.$zone.on('dragleave dragend drop', function () {
                $(this).removeClass('is-dragover');
            });
            this.$zone.on('drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var dt = e.originalEvent.dataTransfer;
                if (dt && dt.files && dt.files.length) {
                    self.$input[0].files = dt.files;      // 讓 input 也拿得到，送出時才有值
                    self.show(dt.files[0]);
                }
            });
        }

        // 沒檔案／檢核沒過就按「開始匯入」：擋在 admin-dialog 的成功提示之前。
        // 綁在彈窗上而不是 document，冒泡時會先走到這裡。
        this.$panel.closest('.modal').on('click', '.modal-footer .btn:not([data-dismiss])', function (e) {
            if (self.ok) return;
            e.preventDefault();
            e.stopPropagation();
            var picked = self.$input.length && self.$input[0].files && self.$input[0].files.length;
            window.AdminDialog && AdminDialog.confirm({
                title: picked ? '檔案無法匯入' : '尚未選擇檔案',
                text: picked ? '請修正檔案後重新上傳。' : '請先選擇或拖曳一個 CSV 檔再開始匯入。',
                variant: 'warn',
                showCancel: false,
                confirmText: '我知道了'
            });
        });

        this.$panel.closest('.modal').on('hidden.bs.modal', function () { self.reset(); });
    };

    $(function () {
        $('.file-panel').each(function () { new FilePanel(this); });
    });
}(jQuery));
