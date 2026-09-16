/* --------------------------------------------------------------------------
   後臺提示彈窗：成功提示 / 危險動作確認
   直接沿用 .admin-modal 的樣式，不引入額外的對話框套件。

   API
     AdminDialog.success({ title, text, onClose })
     AdminDialog.confirm({ title, text, confirmText, variant, onConfirm })
       variant: 'danger'（預設）/ 'warn'

   自動接線（不必逐頁寫 JS）
     - 彈窗頁尾的送出鈕（.admin-modal [type=submit]）按下 → 先關表單彈窗，
       關完再跳成功提示。Bootstrap 4 疊兩層 modal 會出問題，所以是接力不是疊加。
     - 列表上的 刪除 / 停用 / 不通過 → 先跳確認，確認後才往下走。
       用 data-confirm 可覆寫訊息，data-confirm-variant 可換顏色。
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    var ICON = {
        success: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">' +
            '<path d="M5.5 14.5l5.5 5.5L22.5 8.5" stroke="currentColor" stroke-width="2.6" ' +
            'stroke-linecap="round" stroke-linejoin="round"/></svg>',
        danger: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">' +
            '<path d="M14 7v9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' +
            '<circle cx="14" cy="21" r="1.6" fill="currentColor"/></svg>',
        warn: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">' +
            '<path d="M14 7v9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' +
            '<circle cx="14" cy="21" r="1.6" fill="currentColor"/></svg>'
    };

    var $dlg = null;

    function ensure() {
        if ($dlg) return $dlg;
        $dlg = $(
            '<div class="modal fade admin-modal admin-modal--alert" id="adminDialog" tabindex="-1"' +
            ' role="dialog" aria-labelledby="adminDialogTitle" aria-hidden="true">' +
            '  <div class="modal-dialog modal-dialog-centered" role="document">' +
            '    <div class="modal-content">' +
            '      <div class="modal-body">' +
            '        <span class="alert-dialog__icon" aria-hidden="true"></span>' +
            '        <h2 class="alert-dialog__title" id="adminDialogTitle"></h2>' +
            '        <p class="alert-dialog__text"></p>' +
            '      </div>' +
            '      <div class="modal-footer"></div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
        ).appendTo('body');
        return $dlg;
    }

    function open(cfg) {
        var $d = ensure();
        var variant = cfg.variant || 'success';

        $d.removeClass('admin-modal--success admin-modal--danger admin-modal--warn')
            .addClass('admin-modal--' + variant);
        $d.find('.alert-dialog__icon').html(ICON[variant] || ICON.success);
        $d.find('.alert-dialog__title').text(cfg.title || '');
        $d.find('.alert-dialog__text').html(cfg.text || '').toggle(!!cfg.text);

        var $foot = $d.find('.modal-footer').empty();
        if (cfg.showCancel) {
            $('<button type="button" class="btn btn-m btn-m--neutral" data-dismiss="modal"></button>')
                .text(cfg.cancelText || '取消').appendTo($foot);
        }
        var okClass = variant === 'success' ? 'btn-m--primary' : 'btn-m--danger-solid';
        var $ok = $('<button type="button" class="btn btn-m ' + okClass + '"></button>')
            .text(cfg.confirmText || '確定').appendTo($foot);

        var confirmed = false;
        $ok.on('click', function () {
            confirmed = true;
            $d.modal('hide');
        });

        $d.off('hidden.bs.modal.adlg').on('hidden.bs.modal.adlg', function () {
            // 用同一個 #adminDialog 接力顯示下一則（確認 → 成功）時，
            // 必須等這一輪 hide 完全收尾，否則 backdrop 會殘留
            window.setTimeout(function () {
                if (confirmed && cfg.onConfirm) cfg.onConfirm();
                if (!confirmed && cfg.onCancel) cfg.onCancel();
                if (cfg.onClose) cfg.onClose(confirmed);
            }, 0);
        });

        $d.modal('show');
        $d.one('shown.bs.modal', function () { $ok.focus(); });
        return $d;
    }

    var AdminDialog = {
        success: function (cfg) {
            cfg = cfg || {};
            return open($.extend({}, cfg, {
                variant: 'success',
                title: cfg.title || '儲存成功',
                confirmText: cfg.confirmText || '確定'
            }));
        },
        confirm: function (cfg) {
            cfg = cfg || {};
            return open($.extend({}, cfg, {
                variant: cfg.variant || 'danger',
                showCancel: cfg.showCancel !== false,
                title: cfg.title || '確認執行？',
                confirmText: cfg.confirmText || '確認'
            }));
        }
    };

    window.AdminDialog = AdminDialog;

    /* ---------------------------------------------------------------- 自動接線 */
    $(function () {

        // 1. 表單彈窗頁尾的動作鈕 → 關掉表單彈窗，再跳結果提示。
        //    不只抓 [type=submit]：新增課程的「儲存草稿 / 退回 / 通過」都是 type=button，
        //    一樣是送出動作，只有「取消」（data-dismiss）要排除。
        $(document).on('click',
            '.admin-modal:not(.admin-modal--alert) .modal-footer .btn:not([data-dismiss])',
            function (e) {
                e.preventDefault();
                var $btn = $(this);
                var $modal = $btn.closest('.modal');

                var title = $btn.data('success-title') ||
                    ($modal.find('.modal-title').text().trim() || '儲存') + '完成';
                var text = $btn.data('success-text') || '資料已成功儲存。';
                var variant = $btn.data('success-variant') || 'success';

                $modal.one('hidden.bs.modal', function () {
                    if (variant === 'success') {
                        AdminDialog.success({ title: title, text: text });
                    } else {
                        AdminDialog.confirm({
                            title: title, text: text, variant: variant,
                            showCancel: false, confirmText: '確定'
                        });
                    }
                });
                $modal.modal('hide');
            });

        // 2. 刪除 / 停用 / 不通過 → 先確認
        var DESTRUCTIVE = {
            '刪除': { title: '確定要刪除？', text: '刪除後無法復原，確定要繼續嗎？', confirmText: '確定刪除', variant: 'danger' },
            '停用': { title: '確定要停用？', text: '停用後此項目將不再套用，之後仍可重新啟用。', confirmText: '確定停用', variant: 'warn' },
            '不通過': { title: '確定標記為不通過？', text: '送出後將通知申請者，且無法自行撤回。', confirmText: '確定不通過', variant: 'danger' },
            '退回': { title: '確定要退回這門課程？', text: '退回後課程會回到草稿狀態，並通知建課者補正。', confirmText: '確定退回', variant: 'warn' }
        };

        // 不是破壞性、但按了要有回饋的動作：跳 toast 就好，不用擋一個對話框。
        // 值是 function，才能把「哪一門課」帶進提示文字。
        var TOAST = {
            '複製課程': function (name) {
                return name ? '已複製「' + name + '」，草稿已建立' : '已複製課程，草稿已建立';
            }
        };

        // 用文字比對而非選擇器綁死位置：列內操作鈕與批次操作鈕都吃得到，
        // 而「不通過 6 件」這種頁籤因為文字不完全相同，不會誤觸。
        $(document).on('click', 'a, button', function (e) {
            var $el = $(this);
            if ($el.closest('.modal-footer').length) return;   // 彈窗頁尾走上面那條
            if ($el.data('confirmed')) { $el.removeData('confirmed'); return; }

            var label = $el.clone().find('.a11y-hidden').remove().end().text().trim();

            if (TOAST[label] && window.Toast) {
                e.preventDefault();
                // 按鈕上給讀屏用的那段是「：課程名稱」，取冒號後面那半
                var sr = $el.find('.a11y-hidden').text();
                Toast.show(TOAST[label]($.trim(sr.split('：')[1] || '')));
                return;
            }

            var cfg = $el.data('confirm')
                ? { title: $el.data('confirm'), text: $el.data('confirm-text') || '', confirmText: '確定', variant: $el.data('confirm-variant') || 'danger' }
                : DESTRUCTIVE[label];
            if (!cfg) return;

            e.preventDefault();
            AdminDialog.confirm($.extend({}, cfg, {
                onConfirm: function () {
                    // 靜態切版階段沒有後端，確認後給一則成功提示收尾
                    AdminDialog.success({
                        title: label + '完成',
                        text: '已完成「' + label + '」。'
                    });
                }
            }));
        });
    });
}(jQuery));
