/* --------------------------------------------------------------------------
   輕量提示（toast）

   原本只寫在 js/favorite.js 裡給「加入我的最愛」用，後臺的「複製課程」也需要
   同一種提示，所以抽成共用的一支。

   用法
     Toast.show('已複製課程');
     Toast.show('已複製課程', { variant: 'info' });   // 'success'（預設）/ 'info'

   刻意不做成彈窗：這類動作是隨手按的，每按一次就跳一個要關掉的對話框太吵。
   toast 不擋操作、兩秒多自己收掉，掛 role="status" 讀屏也會唸出來。
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    var HIDE_AFTER = 2400;
    var $toast = null;
    var timer = null;

    function ensure() {
        if ($toast) return $toast;
        $toast = $(
            '<div class="toast-note" role="status" aria-live="polite">' +
            '  <img class="toast-note__icon" src="images/icons/check-white.svg" alt="" aria-hidden="true" />' +
            '  <span class="toast-note__text"></span>' +
            '</div>'
        ).appendTo('body');
        return $toast;
    }

    window.Toast = {
        show: function (text, opts) {
            opts = opts || {};
            var $t = ensure();
            $t.find('.toast-note__text').text(text);
            $t.toggleClass('toast-note--info', opts.variant === 'info');
            $t.addClass('is-open');

            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                $t.removeClass('is-open');
            }, opts.hideAfter || HIDE_AFTER);
        },
        hide: function () {
            if ($toast) $toast.removeClass('is-open');
            window.clearTimeout(timer);
        }
    };
}(jQuery));
