/* --------------------------------------------------------------------------
   多選標籤欄位（tag-field）
   admin.css 早就備好 .tag-field__input / .tag-field.is-open / .suggest 三組樣式，
   admin-settings.html 的「課程來源」也留了一份展開狀態的靜態範例，
   這支就是把那份靜態稿變成可操作的元件：輸入 → 篩選建議 → 點選加標籤。

   標記約定：
     <div class="tag-field" data-options='["A","B"]' data-name="dept">
       <span class="tag-field__tag">A<button class="tag-field__remove">…</button></span>
       <input type="text" class="tag-field__input">
     </div>
     <ul class="suggest">…</ul>          ← 沒有的話會自動補

   沒有 .tag-field__remove 的標籤視為鎖定（例如已填學分數的系所），不可移除。
   -------------------------------------------------------------------------- */
(function ($) {
    'use strict';

    var uid = 0;

    function esc(t) {
        return $('<div/>').text(t).html();
    }

    function TagField(el) {
        this.$field = $(el);
        this.id = 'tagfield-' + (++uid);

        // 建議清單：沿用既有的兄弟節點，沒有就補一個
        this.$suggest = this.$field.next('.suggest');
        if (!this.$suggest.length) {
            this.$suggest = $('<ul class="suggest" role="listbox"></ul>').insertAfter(this.$field);
        }
        // 既有的 id（例如 stSourceHint）要留著，否則 aria-describedby 會斷掉
        if (!this.$suggest.attr('id')) this.$suggest.attr('id', this.id + '-list');
        this.$suggest.attr('role', 'listbox').hide();

        // 輸入框：沿用既有的，沒有就補一個
        this.$input = this.$field.find('.tag-field__input');
        if (!this.$input.length) {
            this.$input = $('<input type="text" class="tag-field__input" />').appendTo(this.$field);
        }
        this.$input.attr({
            role: 'combobox',
            autocomplete: 'off',
            'aria-autocomplete': 'list',
            'aria-expanded': 'false',
            'aria-controls': this.$suggest.attr('id')
        });
        if (!this.$input.attr('placeholder') && !this.$input.attr('aria-label')) {
            this.$input.attr('placeholder', this.$field.data('placeholder') || '輸入以新增…');
        }

        var opts = this.$field.data('options');
        this.options = $.isArray(opts) ? opts.slice() : [];
        this.activeIndex = -1;

        // 表單真的送出時要帶得走值
        var name = this.$field.data('name');
        if (name) {
            this.$hidden = $('<input type="hidden" />').attr('name', name).appendTo(this.$field);
        }

        this.bind();
        this.syncHidden();
    }

    TagField.prototype.values = function () {
        return this.$field.find('.tag-field__tag').map(function () {
            return $(this).clone().children().remove().end().text().trim();
        }).get();
    };

    TagField.prototype.syncHidden = function () {
        if (this.$hidden) this.$hidden.val(this.values().join(','));
    };

    TagField.prototype.addTag = function (text) {
        text = $.trim(text);
        if (!text) return false;
        // 重複的不再加一次
        var exists = this.values().some(function (v) { return v === text; });
        if (exists) return false;

        $('<span class="tag-field__tag"></span>')
            .text(text)
            .append(
                '<button type="button" class="tag-field__remove">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="a11y-hidden">移除' + esc(text) + '</span>' +
                '</button>'
            )
            .insertBefore(this.$input);

        if (this.options.indexOf(text) < 0) this.options.push(text);
        this.syncHidden();
        this.$field.trigger('tagfield:change', [this.values()]);
        return true;
    };

    TagField.prototype.removeTag = function ($tag) {
        // 沒有移除鈕的標籤是鎖定狀態
        if (!$tag.find('.tag-field__remove').length) return;
        $tag.remove();
        this.syncHidden();
        this.$field.trigger('tagfield:change', [this.values()]);
    };

    TagField.prototype.close = function () {
        this.$field.removeClass('is-open');
        this.$suggest.hide().empty();
        this.$input.attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
        this.activeIndex = -1;
    };

    TagField.prototype.render = function () {
        var self = this;
        var q = $.trim(this.$input.val());
        var chosen = this.values();
        var matches = $.grep(this.options, function (o) {
            return chosen.indexOf(o) < 0 && (!q || o.toLowerCase().indexOf(q.toLowerCase()) >= 0);
        });
        var exact = this.options.some(function (o) { return o === q; });

        this.$suggest.empty();
        this.activeIndex = -1;

        $.each(matches, function (i, o) {
            $('<li></li>').append(
                $('<a class="suggest__item" href="#" role="option"></a>')
                    .attr('id', self.id + '-opt-' + i)
                    .text(o)
            ).appendTo(self.$suggest);
        });

        if (q && !exact) {
            $('<li></li>').append(
                $('<a class="suggest__new" href="#" role="option"></a>')
                    .attr('id', self.id + '-opt-new')
                    .text('＋ 新增「' + q + '」為新選項')
            ).appendTo(this.$suggest);
        }

        if (!this.$suggest.children().length) {
            this.close();
            return;
        }
        this.$field.addClass('is-open');
        this.$suggest.show();
        this.$input.attr('aria-expanded', 'true');
    };

    TagField.prototype.move = function (dir) {
        var $items = this.$suggest.find('a');
        if (!$items.length) return;
        this.activeIndex = (this.activeIndex + dir + $items.length) % $items.length;
        $items.removeClass('is-active');
        var $a = $items.eq(this.activeIndex).addClass('is-active');
        this.$input.attr('aria-activedescendant', $a.attr('id'));
    };

    TagField.prototype.commit = function () {
        var $items = this.$suggest.find('a');
        var text;
        if (this.activeIndex >= 0 && $items.length) {
            var $a = $items.eq(this.activeIndex);
            text = $a.hasClass('suggest__new') ? $.trim(this.$input.val()) : $a.text();
        } else {
            text = $.trim(this.$input.val());
        }
        if (this.addTag(text)) {
            this.$input.val('');
            this.render();
        }
    };

    TagField.prototype.bind = function () {
        var self = this;

        this.$field.on('click', function (e) {
            if ($(e.target).closest('.tag-field__remove, .tag-field__tag').length) return;
            self.$input.focus();
        });

        this.$field.on('click', '.tag-field__remove', function (e) {
            e.preventDefault();
            self.removeTag($(this).closest('.tag-field__tag'));
            self.$input.focus();
        });

        this.$input.on('focus input', function () { self.render(); });

        this.$input.on('keydown', function (e) {
            switch (e.which) {
                case 40: e.preventDefault(); self.move(1); break;          // ↓
                case 38: e.preventDefault(); self.move(-1); break;         // ↑
                case 13: e.preventDefault(); self.commit(); break;         // Enter
                case 27: self.close(); break;                              // Esc
                case 8:                                                    // Backspace
                    if (!self.$input.val()) {
                        var $last = self.$field.find('.tag-field__tag').last();
                        if ($last.length) { self.removeTag($last); self.render(); }
                    }
                    break;
            }
        });

        this.$suggest.on('mousedown', 'a', function (e) {
            // mousedown 先於 blur，才不會點不到
            e.preventDefault();
            var $a = $(this);
            var text = $a.hasClass('suggest__new') ? $.trim(self.$input.val()) : $a.text();
            if (self.addTag(text)) {
                self.$input.val('');
            }
            self.$input.focus();
            self.render();
        });

        $(document).on('mousedown.' + this.id, function (e) {
            if (!$(e.target).closest(self.$field).length &&
                !$(e.target).closest(self.$suggest).length) {
                self.close();
            }
        });
    };

    $.fn.tagField = function () {
        return this.each(function () {
            if (!$.data(this, 'tagField')) $.data(this, 'tagField', new TagField(this));
        });
    };

    $(function () {
        $('.tag-field').tagField();
        // 靜態稿把「課程來源」留在展開狀態當範例，載入後先收起來
        $('.tag-field.is-open').each(function () {
            var tf = $.data(this, 'tagField');
            if (tf && !$(this).find('.tag-field__input').is(':focus')) tf.close();
        });
    });
}(jQuery));
