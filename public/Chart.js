// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];

let labels = [];
let dataPoints = [];

function refreshChart() {

  const data = {
    labels: labels,
    datasets: [{
      label: 'Total Hours',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataPoints,
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


  // Originally i used the code commented out below which is directly from chartjs docs.
  // But it wouldnt let me use the destroy function if i used that code so i had to
  // use window. instead.
  // let myChart = new Chart(
  window.myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}




// New functions created specifically for ScoreCard website

// This gets an array of the final week totals to use as chart data points
function getFinalWeekTotal() {

  // First reset array of labels in case you run this multiple times
  dataPoints = [];

  // Break down first layer of array
  let firstLayerArray = arrayOfWeekTotalCells.map(function(cell) {
    return cell[0];
  });

  // Get the innerHTML from each array
  let finalWeekTotalCalc = firstLayerArray.map(function(hours) {
    return Number(hours.innerHTML);
  });

  dataPoints = dataPoints.concat(finalWeekTotalCalc);

  console.log("Week Totals: ");
  console.log(dataPoints);
}


// This gets an array of the dates to use as chart labels
function getArrayOfDates() {

  // First reset array of labels in case you run this multiple times
  labels = [];

  let getDates = document.getElementsByClassName("date");
  // This converts html collection to array. Its a simpler version of:
  // let dateArray = [].slice.call(getDates)
  let dateArray = Array.from(getDates);

  // Convert array to the actual dates within each cell, similar to what i did
  // in the getFinalWeekTotal function
  let finalDateArray = dateArray.map(function(dates) {
    return dates.innerHTML;
  });

  // I used concat here bc if i pushed the finalDateArray, it would push the array
  // into the first index value of the label array. Concat actually puts the array
  // into the labels the way i want it.
  // https://stackoverflow.com/questions/4156101/copy-array-items-into-another-array
  labels = labels.concat(finalDateArray);
  console.log("Labels: ");
  console.log(labels);
}


function updateChart() {
  // I added this if statement here becasue I only want to destroy the chart if
  // there is a chart to destroy. So if the labels array is empty, dont destroy
  // anything. If there is a value in labels, I need to destroy before i can update
  if (labels.length === 0) {
    getFinalWeekTotal();
    getArrayOfDates();
    refreshChart();
  } else {
    myChart.destroy();
    getFinalWeekTotal();
    getArrayOfDates();
    refreshChart();
  }
}
