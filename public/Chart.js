const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Total Hours',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    // Setting this to false let me change the size of the canvas in html
    responsive: false,
    // Not exactly sure why i needed to add plugins and then legend, but thats
    // what the doc said to do.
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
};

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
