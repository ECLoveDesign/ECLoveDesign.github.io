
var ctx2 = document.getElementById("capacityDistributionChart");
var stackChart1 = new Chart(ctx2, {
	type: 'bar',
	data: {
		labels: ["全校", "全院", "全系", "全系同年級",],
		datasets: [{
			label: '無資料',
			backgroundColor: "#DBDBDB",
			data: [15, 8, 5, 4],
		}, {
			label: 'A2以下',
			backgroundColor: "#DDEBF6",
			data: [5, 10, 4, 4],
		}, {
			label: 'B1',
			backgroundColor: "#E2EFDB",
			data: [62, 56, 68, 74],
		}, {
			label: 'B2',
			backgroundColor: "#C10000",
			data: [15, 23, 21, 17],
		}, {
			label: 'C1',
			backgroundColor: "#FEF0CB",
			data: [3, 3, 2, 1],
		}],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			position: 'right'
		},
		scales: {
			xAxes: [{
				stacked: true,
				// barThickness: 70
			}],
			yAxes: [{
				stacked: true,
				ticks: {
					min: 0,
					max: 100,
					callback: function (value) { return value + "%" }
				}
			}]
		},
		tooltips: {
			displayColors: true,
			callbacks: {
				label: function (tooltipItems, data) {
					return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel + ' %';
				}
			}
		},
		plugins: {
			datalabels: {
				// formatter: (value, ctx) => {
				// 	let sum = 0;
				// 	let dataArr = ctx.chart.data.datasets[0].data;
				// 	dataArr.map(data => {
				// 		sum += data;
				// 	});
				// 	let percentage = (value*100 / sum).toFixed(2)+"%";
				// 	return percentage;
				// },
				formatter: (value, context) => {
					return value +"%";					
					// return context.chart.data.labels[context.dataIndex] + ': ' + context.chart.data.datasets[0].label[context.dataIndex] + value + ' %';
					// return context.chart.data.datasets[0].label[context.dataIndex]  + ': ' + value + ' %';
					// return  context.dataIndex + ': ' +percentage;
				},
				color: '#000',
			}
		}
	},

});


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
