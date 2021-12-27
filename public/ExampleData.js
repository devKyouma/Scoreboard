// Populates sample data if user clicked on show me an example
// I used a try and catch so that it doesnt give an error when not showing an example.
// If there is no example, the id "showingExample" doesnt exist, giving an error.
let showingExample = document.getElementById("showingExample");
try {
  if (showingExample.innerHTML === "EXAMPLE") {
    exampleTableData();
  }
} catch {}


// Gets a random number between 0 and 4
function randomNumber() {
  return Math.floor(Math.random() * 5);
}

// Enters random hours in the table
function exampleTableData() {
  let cells = document.getElementsByClassName("cells");
  let arrayCells = Array.from(cells);

  arrayCells.forEach(cell => cell.innerHTML = randomNumber());
  // console.log(cells[0].innerHTML = randomNumber());

  updateWeekTotal();
  weeklyDifference();
  cumulativeProgress();
  updateChart();
}
