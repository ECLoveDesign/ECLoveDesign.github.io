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

};
$(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});