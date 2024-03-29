// apexcharts js
var options = {
	series: [{
		name: '無資料',
		data: [3, 3, 10, 10]
	}, {
		name: 'A2以下',
		data: [5, 10, 4, 4],
	}, {
		name: 'B1',
		data: [62, 56, 68, 74],
	}, {
		name: 'B2(您的落點)',
		data: [15, 23, 21, 17],
	}, {
		name: 'C1',
		data: [3, 3, 5, 10]
	}],
	colors: ['#DBDBDB', '#DDEBF6', '#E2EFDB', '#C10000', '#FEF0CB', '#000'],	
	// 20230508 調整字體大小
	dataLabels: {
		style: {
			fontSize: '18px',
			colors: ['#000', '#000', '#000', '#fff', '#000']
		}
	},
	chart: {
		type: 'bar',
		height: 350,
		stacked: true,
		stackType: '100%',
		toolbar: {
			show: false,
		},
	},
	// 20230508 調整字體大小
	xaxis: {
		labels: {
			style: {
				fontSize: '18px',
				fontFamily: 'Noto Sans TC',
				fontWeight: 700,
			}
		},
		categories: ['全校', '全院', '全系', '全系同年級'],
	},
	// 20230508 調整字體大小
	yaxis: {
		labels: {
			style: {
				fontSize: '18px'
			},
		},
	},
	fill: {
		opacity: 1
	},
	// 20230508 調整字體大小
	legend: {
		position: 'right',
		offsetX: 0,
		offsetY: 50,
		inverseOrder: true,
		fontSize: "16px"
	},
	states: {
		hover: {
			filter: {
				type: 'darken'
			}
		}
	},
	responsive: [{
		breakpoint: 768,
		options: {
			legend: {
				position: 'bottom',
				offsetX: -10,
				offsetY: 0
			}
		}
	}],
	// 20230508 調整 hover 內容 & 字體大小
	tooltip: {
		y: {
			formatter: function (value, opts) {
				let percent = opts.w.globals.seriesPercent[opts.seriesIndex][opts.dataPointIndex];
				return percent.toFixed(1) + '%'
			}
		},
		style: {
			fontSize: '18px',
		}
	},
};

var chart = new ApexCharts(document.querySelector("#capacityDistributionChart"), options);
chart.render();


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
