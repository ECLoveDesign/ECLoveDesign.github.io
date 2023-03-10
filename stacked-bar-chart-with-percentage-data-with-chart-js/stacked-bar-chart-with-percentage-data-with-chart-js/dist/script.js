var config = {
        type: 'horizontalBar',
        data: {
            labels: ["Dream Neo", "Dio", "CD 80", "CBR 150R", "CB Trigger", "CB Shine", "CB Hornet", "All Model"],
            datasets: [{
                label: "20-30",
                backgroundColor: "rgba(235, 29, 29, 0.7)",
                data: [0, 0, 50, 0, 0, 0, 100, 30],
            }, {
                label: "31-40",
                backgroundColor: "rgba(79, 143, 15, 0.7)",
                data: [0, 0, 50, 0, 0, 0, 0, 30]
            }, {
                label: "41-50",
                backgroundColor: "rgba(16, 94, 172, 0.7)",
                data: [0, 100, 0, 0, 0, 0, 0, 20]
            }, {
                label: "50 Up",
                backgroundColor: "rgba(247, 127, 7, 0.7)",
                data: [100, 0, 0, 0, 0, 100, 0, 20]
            }]
        },
        options: {
            // responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        min: 0,
                        max: 100,
                        callback: function(value){return value+ "%"}
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.xLabel + ' %';
                    }
                }
            }
        }
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, config);