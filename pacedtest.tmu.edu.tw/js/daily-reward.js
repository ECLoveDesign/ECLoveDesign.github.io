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

if ($('.btn-popup-ajax').length) {

	$('.btn-popup-ajax').magnificPopup({
        type: 'ajax',
        alignTop: true,

		// fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'scroll',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		mainClass: 'mfp-cont'
	});

};
