# To Do List

* Right now the website works by creating a new goal where you enter some inputs, then log in each study session in "Compose". This will update the chart. I need to set it up so that I can take the data from the table and use that for the chart.

  * If i try to write notes before i create a new project i get an error. Fix this
  * Find a way to "save" the user inputs in the table. If the user enters data then clicks on notes to write a note, they will be redirected to an empty table
  * Add random useful stats. Day that you studied most. Number of times you hit weekly goal. Longest streak without a 0.  
  * The mapping and order of functions is all over the place. Write the structure down so that i can easily understand what gets run on what action
  * Change cell colors of editable values which are the hours for each day

# Lower Priority

  * Fix structure of convertWeekTotalCellsToArray function so that Im not creating an array with only one value. So instead of an array which has arrays of each week total, it will just be an array of the week totals. I think i can just move the "calcWeekTotalArray" and push outside the for loop and it should work. But i would also need to update the updateWeekTotal function too.
  * Read more about "window." and why i have to use this for my charts to destory it.
  * Look into possible alternatives to detroying chart to recreate one. Maybe using the update function?
  * In the EditableTable file, i should have made the weekTotalx IDs instead of classes. There is only going to be one cell for each week total and that would make it cleaner.

# Done

* Create a function that creates an object of the all the week totals with date as key and hours as value.


# Notes

* 12/20/21 - First challenge I had was adding the editable table into this file. The script tag that referenced the JavaScript file could not be found. The problem was bc of express. I initially put the EditableTable.js file in the "views" folder where the HTML (.ejs) files are saved. Since it was in the same directory I thought it was fine. While trouble shooting I looked at how the stylesheet was being referenced and the syntax was standard, "href="/css/styles.css"" but the css file itself was in the public folder. I need to read more into exactly how this works in the link below but any css and JavaScript files have to be saved in this location. I guess this is how express tells the HTML file where to find the files being referenced.

  * https://expressjs.com/en/starter/static-files.html

* 12/21/21 - The structure of the "arrayOfWeekTotalCells" was confusing me because there are 3 layers of arrays so it took me a while to figure out how to convert that into another array of the actual values (currently it is an array that references each cell that stores the value). It is an array that contains arrays for each row (which only contain one value so it doesnt even need to be an array), which contains the reference to each week total cell. So I have to map it twice to get the innerHTML.
