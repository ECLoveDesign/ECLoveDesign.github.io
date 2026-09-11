/* ==========================================================================
   我的學習歷程 — 環圈圖
   依賴：Chart.js 4（assets/chartjs/chart.umd.min.js）
   色票取自設計稿；圖表僅為視覺輔助，同一份數字在右側圖例中以文字呈現，
   因此 canvas 只給 aria-label，不另做替代表格（無障礙 1.1.1）
   ========================================================================== */
(function () {
    'use strict';

    if (typeof Chart === 'undefined') {
        return;
    }

    // 共用設定：環圈寬度與缺口比照設計稿（外徑 140、內徑約 62%）
    var COMMON = {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '62%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#16233f',
                    padding: 10,
                    displayColors: false,
                    bodyFont: { family: '"Noto Sans TC", sans-serif', size: 13 },
                    callbacks: {
                        label: function (ctx) {
                            return ctx.label + '：' + ctx.parsed + ' 門';
                        }
                    }
                }
            }
        }
    };

    function render(id, labels, data, colors) {
        var el = document.getElementById(id);
        if (!el) {
            return;
        }
        new Chart(el, {
            type: COMMON.type,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    // 區段之間留 2px 底色間隙，邊界才不會糊在一起
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: COMMON.options
        });
    }

    render('chartDomain',
        ['資訊科技', '語言學習', '通識教育', '商業管理'],
        [2, 1, 1, 1],
        ['#2b6cd4', '#3d9e5a', '#d14fa8', '#e8862a']);

    render('chartStatus',
        ['已完成', '進行中'],
        [3, 2],
        ['#3d9e5a', '#e8722a']);

})();
