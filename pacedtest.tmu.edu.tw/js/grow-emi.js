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
	colors: ['#DBDBDB', '#DDEBF6', '#E2EFDB', '#C10000', '#FEF0CB','#000'],	  
	dataLabels: {
		style: {
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
		}
	},
	xaxis: {
		categories: ['全校', '全院', '全系', '全系同年級'],
	},
	fill: {
		opacity: 1
	},
	legend: {
		position: 'right',
		offsetX: 0,
		offsetY: 50,		
		inverseOrder: true,
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
	tooltip: {
		enabled: false,
	}
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
