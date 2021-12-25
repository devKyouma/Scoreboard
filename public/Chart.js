

let labels = [];
let weekTotalDataPoints = [];
let cumulativeProgressDataPoints = [];
let cumulativeGoalDataPoints = [];
let weeklyGoalDataPoints = [];



// Plots Weekly Totals
function refreshChart1() {

  const data = {
    labels: labels,
    datasets: [{
      label: 'Weekly Total Hours',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: weekTotalDataPoints,
    },
    {
      label: 'Weekly Goal',
      backgroundColor: 'rgb(200, 99, 12)',
      borderColor: 'rgb(200, 99, 12)',
      data: weeklyGoalDataPoints,
    }
  ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {

      scales: {
        y: {
          min: 0
        }
      },

      // Not exactly sure why i needed to add plugins and then legend, but thats
      // what the doc said to do.
      plugins: {
        legend: {
          position: "bottom"
        },
        title: {
          display: true,
          text: 'Custom Chart Title'
        }
      }

    }
  };

  // Originally i used the code commented out below which is directly from chartjs docs.
  // But it wouldnt let me use the destroy function if i used that code so i had to
  // use window. instead.
  // let myChart = new Chart(
  // https://stackoverflow.com/questions/47461720/destroying-chart-js-is-not-working-when-chart-created-inside-function-chart-de
  window.myChart1 = new Chart(
    document.getElementById('myChart1'),
    config
  );

}



// Plots Cumulative Progress and Goal
function refreshChart2() {

  const data = {
    labels: labels,
    datasets: [{
        label: 'Progress',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: cumulativeProgressDataPoints,
      },
      {
        label: 'Goal',
        backgroundColor: 'rgb(200, 99, 12)',
        borderColor: 'rgb(200, 99, 12)',
        data: cumulativeGoalDataPoints,
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {

      scales: {
        y: {
          min: 0
        }
      },

      // Not exactly sure why i needed to add plugins and then legend, but thats
      // what the doc said to do.
      plugins: {
        legend: {
          position: "bottom"
        },
        title: {
          display: true,
          text: 'Custom Chart Title'
        }
      }

    }
  };

  window.myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
  );

}









// New functions created specifically for ScoreCard website

// This creates 3 arrays to use as chart data points. 1 Week Totals 2 Cumulative
// Progress and 3 Cumulative Goal
function getDataPoints() {

  // First reset array of labels in case you run this multiple times
  weekTotalDataPoints = [];
  cumulativeProgressDataPoints = [];
  cumulativeGoalDataPoints = [];
  weeklyGoalDataPoints = [];

  let rowCount = table.rows.length;

// First 3 for loops are doing the same thing. Get each cell in the column,
// convert the value to a number, then push that number to the array
  for (let i = 1; i < rowCount; i++) {
    let currentWeek = document.getElementsByClassName("weekTotal" + i);
    let currentWeekValue = Number(currentWeek[0].innerHTML);
    weekTotalDataPoints.push(currentWeekValue);
  }

  for (let i = 1; i < rowCount; i++) {
    let currentWeek = document.getElementsByClassName("cumulativeProgress" + i);
    let currentWeekValue = Number(currentWeek[0].innerHTML);
    cumulativeProgressDataPoints.push(currentWeekValue);
  }

  for (let i = 1; i < rowCount; i++) {
    let currentWeek = document.getElementsByClassName("cumulativeGoal" + i);
    let currentWeekValue = Number(currentWeek[0].innerHTML);
    cumulativeGoalDataPoints.push(currentWeekValue);
  }

  for (let i = 1; i < rowCount; i++) {
    let currentWeek = document.getElementById("userNumberOfHours");
    let currentWeekValue = Number(currentWeek.innerHTML);
    weeklyGoalDataPoints.push(currentWeekValue);
  }
}

// This gets an array of the cumulative progress and cumulative goal to use as
// chart data points


// This gets an array of the dates to use as chart labels
function getArrayOfDates() {

  // First reset array of labels in case you run this multiple times
  labels = [];

  let getDates = document.getElementsByClassName("date");
  // This converts html collection to array. Its a simpler version of:
  // let dateArray = [].slice.call(getDates)
  let dateArray = Array.from(getDates);

  // Convert array to the actual dates within each cell, similar to what i did
  // in the getDataPoints function
  let finalDateArray = dateArray.map(function(dates) {
    return dates.innerHTML;
  });

  // I used concat here bc if i pushed the finalDateArray, it would push the array
  // into the first index value of the label array. Concat actually puts the array
  // into the labels the way i want it.
  // https://stackoverflow.com/questions/4156101/copy-array-items-into-another-array
  labels = labels.concat(finalDateArray);
  // console.log("Labels: ");
  // console.log(labels);
}


function updateChart() {
  // I added this if statement here becasue I only want to destroy the chart if
  // there is a chart to destroy. So if the labels array is empty, dont destroy
  // anything. If there is a value in labels, I need to destroy before i can update
  if (labels.length === 0) {
    getDataPoints();
    getArrayOfDates();
    refreshChart1();
    refreshChart2();
  } else {
    myChart1.destroy();
    myChart2.destroy();
    getDataPoints();
    getArrayOfDates();
    refreshChart1();
    refreshChart2();
  }
}
