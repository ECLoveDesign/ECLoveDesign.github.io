/* --------------------------------------------------------------------------
   課程卡右上角的「我的最愛」

   卡片上的 .btn-fav 原本就已經是完整的切換鈕標記（aria-pressed + 實心/線條兩顆
   愛心圖），只是沒有行為。這支補上：切換狀態，並跳一則輕量提示。

   提示走共用的 Toast（js/toast.js）：收藏是一個隨手的動作，每按一次就跳一個
   要關掉的對話框太吵。
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    function courseTitle($btn) {
        // 卡片標題；取不到就退回按鈕上給讀屏用的那段文字
        var t = $btn.closest('.course-list__item, .card').find('.course-body__title').first().text();
        if ($.trim(t)) return $.trim(t);
        var sr = $btn.find('.a11y-hidden').text();
        return $.trim(sr.split('：')[1] || '');
    }

    $(function () {
        $(document).on('click', '.btn-fav', function (e) {
            e.preventDefault();
            var $btn = $(this);
            var on = $btn.attr('aria-pressed') !== 'true';   // 切換後的狀態
            var title = courseTitle($btn);

            $btn.attr('aria-pressed', on ? 'true' : 'false');
            // 愛心改用 FontAwesome：實心/線條是同一個字符的兩種樣式，切 class 就好
            $btn.find('.btn-fav__fa')
                .toggleClass('fa-solid', on)
                .toggleClass('fa-regular', !on);
            $btn.find('.a11y-hidden').text((on ? '取消收藏：' : '加入收藏：') + title);

            Toast.show(on ? '已加入我的最愛' : '已從我的最愛移除');
        });
    });
}(jQuery));
