var chartCtx = document.getElementById("chart").getContext("2d");
var chartAxisCtx = document.getElementById("chartAxis").getContext("2d");

var days = Object.keys(data['Weekly Time Series']).slice(0, 300).reverse();
var processedData = {
  open: [],
  high: [],
  low: [],
  close: []
};

days.forEach(function (day) {
  var dayData = data['Weekly Time Series'][day];
  processedData.open.push(dayData['1. open']);
  processedData.high.push(dayData['2. high']);
  processedData.low.push(dayData['3. low']);
  processedData.close.push(dayData['4. close']);
});

var chartConfig = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      onComplete: function (animation) {
        var pixelRatio = chart.chart.currentDevicePixelRatio;
        var sourceCanvas = chart.chart.canvas;
        var copyWidth = Number(chart.scales['y-axis-0'].width);
        var copyHeight = Number(chart.scales['y-axis-0'].height + chart.scales['y-axis-0'].top) + 5;
        chartAxisCtx.canvas.width = copyWidth;
        chartAxisCtx.drawImage(sourceCanvas, 0, 0, copyWidth * pixelRatio, copyHeight * pixelRatio, 0, 0, copyWidth, copyHeight);
      }
    }
  },
  type: 'line',
  data: {
    labels: days.slice(0, 10),
    datasets: [{
      label: 'Open',
      fill: false,
      backgroundColor: 'rgb(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
      data: processedData.open.slice(0, 10),
      lineTension: 0
    }, {
      label: 'High',
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgb(75, 192, 192)',
      data: processedData.high.slice(0, 10),
      lineTension: 0
    }, {
      label: 'Low',
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: processedData.low.slice(0, 10),
      lineTension: 0
    }, {
      label: 'Close',
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: processedData.close.slice(0, 10),
      lineTension: 0
    }]
  }
};

var chart = new Chart(chartCtx, chartConfig);

for (var i = 10; i < days.length; i++) {
  var day = days[i];
  chart.data.labels.push(day);
  chart.data.datasets[0].data.push(processedData.open[i]);
  chart.data.datasets[1].data.push(processedData.high[i]);
  chart.data.datasets[2].data.push(processedData.low[i]);
  chart.data.datasets[3].data.push(processedData.close[i]);
}

document.querySelector('.chartAreaWrapperInner').style.width = '8000px';