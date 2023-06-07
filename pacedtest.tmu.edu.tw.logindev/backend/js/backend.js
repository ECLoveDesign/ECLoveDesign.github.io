
var options = {
    series: [{
        name: '人數',
        data: [5, 5, 10, 8, 7, 5, 4, 4, 8, 2, 10, 10, 7, 8, 6, 9]
    }, {
        name: '人次',
        data: [10, 15, 16, 12, 20, 10, 16, 15, 26, 40, 22, 20, 14, 16, 12, 14]
    }],
    chart: {
        height: 400,
        type: 'area',
        stacked: false,
        zoom: {
            enabled: false
        },
        animations: {
            enabled: false
        },
		toolbar: {
			show: false,
		},
        defaultLocale: "zh-tw",
        locales: [{
            name: 'zh-tw',
            options: {
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                shortDays: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
                toolbar: {
                    exportToSVG: '下載 SVG',
                    exportToPNG: '下載 PNG',
                    exportToCSV: '下載 CSV',
                    menu: '菜單',
                    selection: '選擇',
                    selectionZoom: '選擇縮放',
                    zoomIn: '放大',
                    zoomOut: '縮小',
                    pan: '平移',
                    reset: '重置縮放'
                }
            }
        }],
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100]
        },
    },
    markers: {
      size: 0,
    },
    stroke: {
        width: [5, 5, 4],
        curve: 'straight'
    },
    title: {
        text: 'Missing data (null values)'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2023-05-01", "2023-05-02", "2023-05-03", "2023-05-04", "2023-05-05", "2023-05-06", "2023-05-07", "2023-05-08", "2023-05-09", "2023-05-10", "2023-05-11", "2023-05-12", "2023-05-13", "2023-05-14", "2023-05-15", "2023-05-16"]

    },
    title: {
        text: '登入統計',
        align: 'center',
        style: {
            fontSize: '28px',
            fontFamily: 'Noto Sans TC',
            fontWeight: 700,
        }
    },
    tooltip: {
        shared: true
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
    },
	responsive: [{
		breakpoint: 768,
		options: {
			chart: {
                height: 350,
			}
		}
	}],
}

var chart = new ApexCharts(
    document.querySelector("#logChart"),
    options
);

chart.render();