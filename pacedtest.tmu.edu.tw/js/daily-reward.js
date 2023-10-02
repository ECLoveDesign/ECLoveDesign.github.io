if ($('.btn-popup').length) {

	$('.btn-popup').magnificPopup({
		type: 'inline',

		// fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		mainClass: 'mfp-cont'
	});

};

if ($('.btn-popup-iframe').length) {

	$('.btn-popup-iframe').magnificPopup({
		type: 'iframe',

		// fixedContentPos: false,
		// fixedBgPos: true,

		overflowY: 'scroll',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		mainClass: 'mfp-cont-iframe'
	});

	$('.btn-popup-iframe.finish').magnificPopup({
		type: 'iframe',

		// fixedContentPos: false,
		// fixedBgPos: true,

		overflowY: 'scroll',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		mainClass: 'mfp-cont-iframe finish'
	});

};




$(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});

if ($('.btn-popover').length) {

	var popovers = document.querySelectorAll('.popover');
	var popoverTriggers = document.querySelectorAll('.btn-popover');

	for (var i = 0; i < popoverTriggers.length; i++) {
		popoverTriggers[i].addEventListener('click', function(event) {
			closeAllOthers(this.parentElement);
			this.parentElement.classList.toggle('popover--active');
		});
	}

	function closeAllOthers(ignore) {
		for (var i = 0; i < popovers.length; i++) {
			if ( popovers[i] !== ignore) {
				popovers[i].classList.remove('popover--active');	
			}
		}
	}

};