function updateChart() {
async function fetchJSON() {
    const url = './data.json'
    const response = await fetch(url);
    const datapoints = await response.json();
    return datapoints
}
fetchJSON().then(datapoints => {
    const day = datapoints.financialreport.map(function(index){
      return index.day;
    });
    const amount = datapoints.financialreport.map(function(index){
        return index.amount;
      });
    myChart.config.data.labels = day;
    myChart.config.data.datasets[0].data = amount;
    myChart.update()
});
}
updateChart();

const data = {
    labels: [''],
    datasets: [{
      data: [0],
      backgroundColor: [
        'hsl(10, 79%, 65%)'
      ],
      hoverBackgroundColor: 'hsl(186, 34%, 60%)',
      borderWidth: 1,
      borderRadius: 4,
      barThickness: 34,
      borderSkipped: false,
    }]
  };

  // config 
  const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                display: false,
                drawBorder: false,
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                }
            }
        },
     maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
        },
        title: {
          display: false,
        }
      }
    },
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  // MEDIA QUERIES FOR BAR THICKNESS
  function barThickness(width) {
    if (width.matches) { // If media query matches
        data.datasets[0].barThickness = 34
    } else {
        data.datasets[0].barThickness = 46;
    }
  }
  
  let width = window.matchMedia("(max-width: 992px)")
  barThickness(width) // Call listener function at run time
  width.addListener(barThickness) // Attach listener function on state changes

  console.log(data.datasets[0].barThickness)