// Create editable table
// https://www.youtube.com/watch?v=uPBxzvSGIiA

// Create dynamic table
// https://www.etutorialspoint.com/index.php/11-dynamically-add-delete-html-table-rows-using-javascript

// Wanted Features
// Use arrow keys to move around like excel file
// replace some of the code with jquery




// TO DO LIST
// Go through each line of the for loop that lets the cells become editable and write notes.
// Write a readme going through exactly how all of this works

// TO DO LIST (lower priority)
// Make the add rows more dynamic, give ability to delete rows.
// I use rowCount many times, should i just turn it into a function? Its so short though so i dont think its worth it


///////////////////////////////////////// Starting code ran immediately


// Created a global variable that holds all the daily hours rows and week total cells
let arrayOfDailyHoursRows = [];
let arrayOfWeekTotalCells = [];
let saveCells = [];



let table = document.getElementById("mainTable");
let cells = document.getElementsByClassName("cells");


// I want to run these functions before the refresh so that I can get the
// week total cell to work when loaded
convertHoursInRowsToArray();
convertWeekTotalCellsToArray();

// Run this function first so that the page is responsive when loaded
refresh();

let todayDate = new Date();

// I am setting the first row to have next Monday as the default date
let startingDate = getNextMonday(todayDate);
let firstDate = document.getElementById("firstDate");
firstDate.innerHTML = shortDate(startingDate);

///////////////////////////////////////// End of code ran immediately




///////////////////////////////////////// ALL CODE BELOW ARE FUNCTIONS


// This is the function tied to the user input and button
function userSubmit() {

  howManyRowsToAdd();
  updateWeekTotal();

  // This is here to update the cells variable since there are now new cells, but
  // the code for the onclick is still not working.
  cells = document.getElementsByClassName("cells");
  refresh();

  cumulativeGoal();

}


///////////////////////////////////////// Code here is related to dates

// This function returns the date format mm/dd/yyy, you need to pass a
// date, let xxx = new Date();
function shortDate(date) {
  let dayOfMonth = date.getDate();
  let month = (date.getMonth() + 1);
  let year = date.getFullYear();
  let shortDate = month + "/" + dayOfMonth + "/" + year;
  return shortDate;
}

// This code gets next monday from given date
function getNextMonday(date) {
  date.setDate(date.getDate() + (((1 + 7 - date.getDay()) % 7) || 7));
  return date;
}

// This function adds x days to given date
function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

///////////////////////////////////////// End of code related to dates







// Created an array of daily hours for each row
function convertHoursInRowsToArray() {
  // I named this rowCount2 bc there is another rowCount in addNewRow. I think
  // it would have been fine to name it the same since they are declared within
  // a variable but i wanted to be safe and avoid messing things up
  let rowCount2 = table.rows.length;

  // i is set to 1 here bc i skip the header row
  for (let i = 1; i < rowCount2; i++) {
    // This turns all the hours in days of the week to an array
    let rowNum = document.getElementsByClassName("row" + i);

    // Using the "getElementBy....." gets you an HTMLCollection, not an array. They
    // are similar but not the same. This code below converts it to an array. If I
    // didnt convert it, the reduce function would not work.
    let rowNumArray = [].slice.call(rowNum);
    arrayOfDailyHoursRows.push(rowNumArray);
  }
}

// Created an array of Week Total cells for each row
function convertWeekTotalCellsToArray() {

  let rowCount3 = table.rows.length;

  for (let i = 1; i < rowCount3; i++) {
    let calcWeekTotal = document.getElementsByClassName("weekTotal" + i);
    let calcWeekTotalArray = [].slice.call(calcWeekTotal);
    arrayOfWeekTotalCells.push(calcWeekTotalArray);
  }
}


// Now that i have an array of the daily hours for each week and an array of
// each week total cell for each row, i can sum the daily hours and put that value
// in the week total cell
function updateWeekTotal() {

  let rowCount4 = table.rows.length;

  for (let i = 1; i < rowCount4; i++) {
    // Here I use i minus 1 bc i actually want to start at 0. I could change i
    // to 0 but would then have to subtract 1 from rowcount so it doesnt really matter
    let totalHours = arrayOfDailyHoursRows[(i - 1)].reduce(function(accumlator, currentValue) {
      return accumlator + Number(currentValue.innerHTML);
    }, 0);

    arrayOfWeekTotalCells[(i - 1)].forEach(day => day.innerHTML = totalHours)
  }

}




function howManyRowsToAdd() {
  // This gets the number inputed into the input
  let getNumberOfWeeks = document.getElementById("userNumberOfWeeks");
  // Convert it to a number and subtracts 1 since there is already 1 row by default
  let numberOfRowsToAdd = (Number(getNumberOfWeeks.innerHTML) - 1);

  // This runs the addNewRow function for the amount of times entered
  for (i = 0; i < numberOfRowsToAdd; i++) {
    addNewRow();
  }


  // After I add new rows i want to wipe the arrays of daily hours rows and week total
  // cells BEFORE i run the functions that pushes to them bc if i dont, the arrays
  // will keep pushing on top of each other and double count. I only want to create
  // these arrays when changes are made to the number of rows.
  arrayOfDailyHoursRows = [];
  arrayOfWeekTotalCells = [];

  convertHoursInRowsToArray();
  convertWeekTotalCellsToArray();


}


// Dynamically add rows
// https://www.etutorialspoint.com/index.php/11-dynamically-add-delete-html-table-rows-using-javascript
// https://www.w3schools.com/jsref/met_table_insertrow.asp
function addNewRow() {

  let rowCount = table.rows.length;
  let cellCount = table.rows[0].cells.length;
  let row = table.insertRow(rowCount);

  for (let i = 0; i < cellCount; i++) {
    // This creates an empty row
    let newCell = row.insertCell(i);

    // This creates the cells, their values, and classes in the empty row created
    if (i === 0) {
      newCell.innerHTML = rowCount;
    } else if (i === 1) {
      let nextDate = shortDate(addDays(startingDate, 7));
      newCell.className = "date";
      newCell.innerHTML = nextDate;
    } else if (i === 9) {
      newCell.className = "weekTotal" + rowCount;
    } else if (i === 10) {
      newCell.className = "weekDiff" + rowCount;
    } else if (i === 11) {
      newCell.className = "cumulativeProgress" + rowCount;
    } else if (i === 12) {
      newCell.className = "cumulativeGoal" + rowCount;
    } else {
      newCell.className = "cells row" + rowCount;
    }
  }

}







// It took me a while to figure this out but i had to put the entire for loop into
// this refresh function bc the cells variable would not update as i added new
// rows since it gets ran as soon as the page loads and thats it. This resulted in
// any new cells not being able to edit. Putting it in a function lets me refresh
// the cells variable.
function refresh() {

  // This for loop is what lets me click and edit each cell

  // This for loop creates an onclick listener for every cell in the table
  for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {

      if (this.hasAttribute("data-clicked")) {
        return;
      }

      this.setAttribute("data-clicked", "yes");
      this.setAttribute("data-text", this.innerHTML);

      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = this.innerHTML;


      // This keeps style of the cell the same when you click it.
      input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px";
      input.style.height = this.offsetHeight - (this.clientTop * 2) + "px";
      input.style.border = "0px";
      input.style.fontFamily = "inherit";
      input.style.fontSize = "inherit";
      input.style.textAlign = "inherit";
      input.style.backgroundColor = "white";
      // End of code that keeps stlye



      input.onblur = function() {
        let td = input.parentElement;
        let orig_text = input.parentElement.getAttribute("data-text");
        let current_text = this.value;

        if (orig_text != current_text) {
          // if there were changes to text
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = current_text;
          console.log(orig_text + " was changed to " + current_text);

          // I need to recalculate the weekly total after a change is made
          updateWeekTotal();

          ////////// New code specifically for ScoreCard
          weeklyDifference();
          cumulativeProgress();
          updateChart();
          ////////// End of new code specifically for ScoreCard

        } else {
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = orig_text;
          console.log("no changes");
        }
      }

      // This waits for the event of pressing enter
      input.onkeypress = function() {
        if (event.keyCode === 13) {
          // this runs the "input.onblur" function above
          this.blur();
        }
      }

      this.innerHTML = "";
      this.style.cssText = "padding: 0px 0px";
      this.append(input);
      this.firstElementChild.select();
    }
  }
}





/////////////// New code written for ScoreCard



// Calculate and enter the difference between Week Total and Weekly Goal
function weeklyDifference() {
  // This gets the number inputed by user for the goal of number of hours each week
  let getNumberOHours = document.getElementById("userNumberOfHours");
  // Convert it to a number
  let numberOfHours = Number(getNumberOHours.innerHTML);

  let rowCount = table.rows.length;

  for (let i = 1; i < rowCount; i++) {
    let getWeekTotal = document.getElementsByClassName("weekTotal" + i);
    // Convert it to a number
    let numberWeekTotal = Number(getWeekTotal[0].innerHTML);

    let calcWeekDiff = numberWeekTotal - numberOfHours

    let getWeekDiff = document.getElementsByClassName("weekDiff" + i);
    // console.log(getWeekDiff[0]);
    getWeekDiff[0].innerHTML = calcWeekDiff;
  }
}

// Calculate and enter cumulative progress
// MUST BE RUN AFTER getDataPoints SINCE IT USES weekTotalDataPoints VARIABLE
function cumulativeProgress() {
  let rowCount = table.rows.length;



// This portion of the code was taken directly from the getDataPoints functions.
// I did slighty change the variable by adding "other". I repeated this code bc
// if i didnt, this function would rely on that function running first, but getDataPoints
// function cant run correctly unless this gets run. Not good practice but it works.
  let otherWeekTotalDataPoints = [];

  for (let i = 1; i < rowCount; i++) {
    let currentWeek = document.getElementsByClassName("weekTotal" + i);
    let currentWeekValue = Number(currentWeek[0].innerHTML);
    otherWeekTotalDataPoints.push(currentWeekValue);
  }





  for (let i = 1; i < rowCount; i++) {
    let getCumulativeProgress = document.getElementsByClassName("cumulativeProgress" + i);

    // This takes the weekTotalDataPoints (array of week totals) and cuts it off up to
    // the current row
    let currentWeekTotalDataPoints = [];
    currentWeekTotalDataPoints = otherWeekTotalDataPoints.slice(0, i);

    let calcCurrentProgress = currentWeekTotalDataPoints.reduce(function(accumlator, currentValue) {
      return accumlator + currentValue;
    }, 0);

    getCumulativeProgress[0].innerHTML = calcCurrentProgress;
  }
}

// Calculates cumulative goal and is only ran once in userSubmit
function cumulativeGoal() {
  let rowCount = table.rows.length;
  let getNumberOHours = document.getElementById("userNumberOfHours");
  let numberOfHours = Number(getNumberOHours.innerHTML);

  for (let i = 1; i < rowCount; i++) {
    let getCumulativeGoal = document.getElementsByClassName("cumulativeGoal" + i);
    getCumulativeGoal[0].innerHTML = numberOfHours * i;
  }
}


// Save the user entered data. This is similar to getDataPoints in Chart.js. I
// run a for loop that pushes each value of the cells into the empty array.
function saveUserData() {
  // console.log(cells.length);
  saveCells = [];

  for (let i = 0; i < cells.length; i++) {
    let cellsDataPoint = Number(cells[i].innerHTML);
    saveCells.push(cellsDataPoint);
  }
  // console.log(saveCells);

  let saveInput = document.getElementById("saveInput");
  saveInput.value = saveCells;
}


// This is just for testing
function testing() {

  // let uuu = weekTotalDataPoints[0] + weekTotalDataPoints[1];
  // let uuu = weekTotalDataPoints.splice(0,3);
  // let getDates = document.getElementsByClassName("weekTotal1");
  // let uuu = Number(getDates[0].innerHTML);

  // console.log(cells.length);
  // let saveCells = [];
  //
  // for (let i = 0; i < cells.length; i++) {
  //   let cellsDataPoint = Number(cells[i].innerHTML);
  //   saveCells.push(cellsDataPoint);
  // }
  // // let newArray = Array.from(cells);
  //
  // console.log(saveCells);

  saveCells = [];

  for (let i = 0; i < cells.length; i++) {
    let cellsDataPoint = Number(cells[i].innerHTML) + ",";
    saveCells.push(cellsDataPoint);
  }
  console.log(saveCells);


  let xxx = 3;
  let savingCell = document.getElementById("saveInput");
  savingCell.value = saveCells;


}





// Put this userSubmit here at the end so that it runs when the page loads. It
// gets the value for number of rows to add from the page so no need to input anything
userSubmit();
