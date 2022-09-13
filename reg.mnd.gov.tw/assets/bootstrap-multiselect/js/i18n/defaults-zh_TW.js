!(function ($, defaults) {
	defaults = $.extend(defaults, {
		allSelectedText  : '全部',
		filterPlaceholder: '篩選',
		nSelectedText    : '已選擇',
		nonSelectedText  : '沒有選取任何項目',
		selectAllText    : '全部'
	});
}(jQuery, jQuery.fn.multiselect.Constructor.prototype.defaults));
