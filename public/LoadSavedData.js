// Get the data that was loaded from express to the hidden h1 and convert it
// to an array
let getLoadSavedData = document.getElementById("loadSavedData").innerHTML;
let getLoadSavedDataArray = getLoadSavedData.split(",");
// console.log(getLoadSavedDataArray);

// This logs each value of the array to the correct cell
for (let i = 0; i < cells.length; i++) {
  cells[i].innerHTML = getLoadSavedDataArray[i];
}

// These are the standard functions needed to get the table and charts running.
// Since the for loop above doesnt trigger the onclick event, I have to manually
// run these functions after the cells' values are entered
convertHoursInRowsToArray();
convertWeekTotalCellsToArray();
refresh();
updateWeekTotal();
weeklyDifference();
cumulativeProgress();
updateChart();
