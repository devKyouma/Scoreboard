# To Do List

* Right now the website works by creating a new goal where you enter some inputs, then log in each study session in "Compose". This will update the chart. I need to set it up so that I can take the data from the table and use that for the chart.

  * Create a function that creates an object of the all the week totals with date as key and hours as value.
  * Pass that object to the chart
  * The object with the hours will be available as long as i dont refresh the server but if i go to a new page and then go back to home, the table will refresh. I need to create another function that uses the saved object, and recreates what was there before.

  * Im having issues getting the value of the innerHTML from my arrays


# Notes

* 12/20/21 - First challenge I had was adding the editable table into this file. The script tag that referenced the JavaScript file could not be found. The problem was bc of express. I initially put the EditableTable.js file in the "views" folder where the HTML (.ejs) files are saved. Since it was in the same directory I thought it was fine. While trouble shooting I looked at how the stylesheet was being referenced and the syntax was standard, "href="/css/styles.css"" but the css file itself was in the public folder. I need to read more into exactly how this works in the link below but any css and JavaScript files have to be saved in this location. I guess this is how express tells the HTML file where to find the files being referenced.

  * https://expressjs.com/en/starter/static-files.html
