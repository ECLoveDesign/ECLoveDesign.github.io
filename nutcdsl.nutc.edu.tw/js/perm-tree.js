/* --------------------------------------------------------------------------
   角色管理 › 新增/編輯角色：權限樹

   結構就是語意化的 ul / li + 真正的 <input type="checkbox">，不靠任何套件。
   原生語意直接可用：label 點得到、鍵盤空白鍵本來就會切換、
   半選用 input.indeterminate（admin.css 早就備好對應樣式），
   不必再自己補 aria-checked。

   行為
     - .perm-node__toggle   展開／收合子層
     - 父項勾選            → 底下所有子項跟著同步
     - 子項變動            → 父項回捲成 全勾 / 半勾 / 未勾
     - disabled 的節點（首頁）是必要權限，不參與連動
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    $(function () {
        var $tree = $('#permTree');
        if (!$tree.length) return;

        /* ---------------------------------------------------------- 展開／收合 */
        $tree.on('click', '.perm-node__toggle', function () {
            var $btn = $(this);
            var $li = $btn.closest('.perm-node');
            var open = !$li.hasClass('is-open');

            // 收合只切 class，顯示與否交給 CSS（.perm-node:not(.is-open) > .perm-tree__sub）。
            // 不用 slideToggle：少一個動畫狀態，收合與否可以直接從 class 判讀。
            $li.toggleClass('is-open', open);
            $btn.attr('aria-expanded', open ? 'true' : 'false');
            $btn.find('.a11y-hidden')
                .text((open ? '收合' : '展開') + $li.children('.perm-node__row').find('label').text());
        });

        /* -------------------------------------------------------------- 連動 */
        // 只算可操作的，disabled（必要權限）不參與父子連動
        function boxesIn($li) {
            return $li.children('.perm-tree__sub').find('.check__input').not(':disabled');
        }

        function ownBox($li) {
            return $li.children('.perm-node__row').find('.check__input');
        }

        // 父 → 子：整個子樹跟著同一個狀態
        function pushDown($li, checked) {
            boxesIn($li).prop({ checked: checked, indeterminate: false });
        }

        // 子 → 父：逐層往上回捲成 全勾 / 半勾 / 未勾
        function pullUp($li) {
            var $parent = $li.parent('.perm-tree__sub').closest('.perm-node');
            if (!$parent.length) return;

            var $boxes = $parent.children('.perm-tree__sub').children('.perm-node')
                .map(function () { return ownBox($(this))[0]; }).get();
            $boxes = $($boxes).not(':disabled');

            var total = $boxes.length;
            var on = $boxes.filter(':checked').length;
            var partial = $boxes.filter(function () { return this.indeterminate; }).length > 0;

            var $own = ownBox($parent);
            $own.prop('checked', total > 0 && on === total);
            $own.prop('indeterminate', partial || (on > 0 && on < total));

            pullUp($parent);
        }

        $tree.on('change', '.check__input', function () {
            var $box = $(this);
            var $li = $box.closest('.perm-node');

            // 自己被直接點過就不再是半選
            $box.prop('indeterminate', false);

            if ($li.hasClass('perm-node--parent')) pushDown($li, $box.prop('checked'));
            pullUp($li);
            sync();
        });

        /* --------------------------------------- 初始狀態：把半選先算出來 */
        function seed() {
            // 由最深層往上算，父項才拿得到已經算好的子項狀態
            var parents = $tree.find('.perm-node--parent').get();
            parents.sort(function (a, b) {
                return $(b).parents('.perm-tree__sub').length - $(a).parents('.perm-tree__sub').length;
            });
            $.each(parents, function (i, el) {
                var $p = $(el);
                var $boxes = $p.children('.perm-tree__sub').children('.perm-node')
                    .map(function () { return ownBox($(this))[0]; }).get();
                $boxes = $($boxes).not(':disabled');
                var total = $boxes.length;
                var on = $boxes.filter(':checked').length;
                var partial = $boxes.filter(function () { return this.indeterminate; }).length > 0;
                var $own = ownBox($p);
                $own.prop('checked', total > 0 && on === total);
                $own.prop('indeterminate', partial || (on > 0 && on < total));
            });
        }


        /* ------------------------------------------ 表單送出時要拿得到值 */
        var $hidden = $('<input type="hidden" name="rolePerms" id="rolePerms" />')
            .appendTo($tree.closest('form'));

        function sync() {
            var ids = $tree.find('.check__input:checked').map(function () {
                return this.id;
            }).get();
            $hidden.val(ids.join(','));
        }

        seed();
        sync();
    });
}(jQuery));
