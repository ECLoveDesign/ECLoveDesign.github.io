/* ==========================================================================
   後臺 / 報表管理 — 完課證書人數長條圖
   依賴：Chart.js 4（assets/chartjs/chart.umd.min.js）
   設計稿：y 軸 0/80/160/240、長條 #1e4fc4、月平均以虛線標示、最高點標數值
   ========================================================================== */
(function () {
    'use strict';

    var el = document.getElementById('chartCert');
    if (!el || typeof Chart === 'undefined') {
        return;
    }

    var LABELS = ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月'];
    var DATA = [110, 142, 166, 198, 92, 155, 218, 203];
    var AVG = DATA.reduce(function (a, b) { return a + b; }, 0) / DATA.length;
    var PEAK = Math.max.apply(null, DATA);

    // 月平均虛線 + 最高點數值：Chart.js 沒有內建，畫在 afterDatasetsDraw
    var overlay = {
        id: 'jcaseOverlay',
        afterDatasetsDraw: function (chart) {
            var ctx = chart.ctx;
            var y = chart.scales.y;
            var area = chart.chartArea;

            ctx.save();
            ctx.strokeStyle = '#9aa6b6';
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(area.left, y.getPixelForValue(AVG));
            ctx.lineTo(area.right, y.getPixelForValue(AVG));
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#7b8aa3';
            ctx.font = '11.5px "Noto Sans TC", sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText('月平均 ' + AVG.toFixed(1) + ' 人',
                area.left + 4, y.getPixelForValue(AVG) - 6);

            // 最高的那根標上數值
            var meta = chart.getDatasetMeta(0);
            meta.data.forEach(function (bar, i) {
                if (DATA[i] !== PEAK) {
                    return;
                }
                ctx.fillStyle = '#1e4fc4';
                ctx.font = '500 12px "Noto Sans TC", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(String(PEAK), bar.x, bar.y - 8);
            });
            ctx.restore();
        }
    };

    new Chart(el, {
        type: 'bar',
        data: {
            labels: LABELS,
            datasets: [{
                label: '完課證書核發人數',
                data: DATA,
                backgroundColor: '#1e4fc4',
                maxBarThickness: 44,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 24 } },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#16233f',
                    padding: 10,
                    displayColors: false,
                    bodyFont: { family: '"Noto Sans TC", sans-serif', size: 13 },
                    callbacks: {
                        label: function (ctx) {
                            return ctx.parsed.y + ' 人';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: {
                        color: '#8f98a8',
                        font: { family: '"Noto Sans TC", sans-serif', size: 11.5 }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 240,
                    ticks: {
                        stepSize: 80,
                        color: '#98a2b3',
                        font: { family: '"Noto Sans TC", sans-serif', size: 11.5 }
                    },
                    grid: { color: '#f0f2f6', drawBorder: false }
                }
            }
        },
        plugins: [overlay]
    });

})();
