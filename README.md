* 12/29/21 The website is mostly complete. It functionally works and the design is mostly what I had in mind. There are still many improvements I can make but will stop here to work on other things. It will be a good challenge to try to pick this up again later with new tools I learned to apply. I think I took good notes on the code within the files but lacking in notes on the overall structure of how it all works.

# To Do List

  * Things gets messed up when you add a new goal when you already have one. This website is built for only one goal at a time so maybe add functionally for multiple goals and a way to save a completed goal.
  * Save notes. I can run a similar process that I used to save the data in the table, check notes on 12/29/21.
  * Format Notes at bottom of Plan page
  * Format the error page
  * Check all the pages for behavior when screen size changes
  * Improve text inside get started boxes
  * Fix structure of convertWeekTotalCellsToArray function so that Im not creating an array with only one value. So instead of an array which has arrays of each week total, it will just be an array of the week totals. I think i can just move the "calcWeekTotalArray" and push outside the for loop and it should work. But i would also need to update the updateWeekTotal function too.
  * Read more about "window." and why i have to use this for my charts to destory it.
  * Look into possible alternatives to detroying chart to recreate one. Maybe using the update function?
  * In the EditableTable file, i should have made the weekTotalx IDs instead of classes. There is only going to be one cell for each week total and that would make it cleaner.
  * Create a checklist of overall goals during the project
  * Add random useful stats. Day that you studied most. Number of times you hit weekly goal. Longest streak without a 0.  
  * The mapping and order of functions is all over the place. Write the structure down so that i can easily understand what gets run on what action

# Notes

* 12/20/21 - First challenge I had was adding the editable table into this file. The script tag that referenced the JavaScript file could not be found. The problem was bc of express. I initially put the EditableTable.js file in the "views" folder where the HTML (.ejs) files are saved. Since it was in the same directory I thought it was fine. While trouble shooting I looked at how the stylesheet was being referenced and the syntax was standard, "href="/css/styles.css"" but the css file itself was in the public folder. I need to read more into exactly how this works in the link below but any css and JavaScript files have to be saved in this location. I guess this is how express tells the HTML file where to find the files being referenced.

  * https://expressjs.com/en/starter/static-files.html

* 12/21/21 - The structure of the "arrayOfWeekTotalCells" was confusing me because there are 3 layers of arrays so it took me a while to figure out how to convert that into another array of the actual values (currently it is an array that references each cell that stores the value). It is an array that contains arrays for each row (which only contain one value so it doesnt even need to be an array), which contains the reference to each week total cell. So I have to map it twice to get the innerHTML.

* 12/29/21. Figuring out how to "save" the user entered data to the table was difficult but I found a way. It might not be the most efficient but I am proud of it and it works. I added a button that runs a function that converts all the values in the editable cells into an array. The function then targets an input (its hidden so you cant actually see it) in the same form as the as the button and writes the array (as a string) in the input. Then the form is submitted and posted. In app.js, I take the string and save it within express as "savedData" and change "didUserSaveData" to 1 so it knows there is saved data available. Now I can pass "savedData" back to the /plan page. Now that "didUserSaveData" is 1, it will write a hidden h1 of the array and run LoadSavedData.js. This file recognizes the hidden h1 with the data, converts it back to an array (since it was passed as a string), change all the cells back to the saved values, and run the necessary functions to make the page operational.
