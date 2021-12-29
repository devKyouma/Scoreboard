const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));


let posts = [];
let startGoals = [];
let savedData = [];

// This is used to check whether the user entered a goal. Default is 0, then when
// the user enters a goal it comes 1
let didUserEnterGoal = 0;

// This is used for the example to prevent the example data to push multiple
// times if the user clicks away from page then clicks show example again
let onlyPushOnce = 0;





function shortDate(date) {
  let dayOfMonth = date.getDate();
  let month = (date.getMonth() + 1);
  let year = date.getFullYear();
  let shortDate = month + "/" + dayOfMonth + "/" + year;
  return shortDate;
}

let todayDateApp = new Date();
todayDateApp = shortDate(todayDateApp);







app.get("/", function(req, res) {
  res.render("home", {});
});


app.get("/plan", function(req, res) {
  // This goes through each post and creates an array of each of the dates. I then
  // pass this array to the chart to use as the labels.
  // https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  let labels = posts.map(x => x.date);
  // console.log(labels);

  // Doing the same thing for the hours
  let hoursData = posts.map(x => x.hours);
  // console.log(hoursData);


if (didUserEnterGoal === 1) {
  res.render("plan", {
    posts: posts,
    labels: labels,
    startGoals: startGoals,
  });
} else if (didUserEnterGoal === 0) {
  res.render("errorPage", {});
}

  // In this code i am telling the server to run the html file "plan"
  // Then pass a second parameter, which is the const above that will pass through html
  // In this second parameter, you pass a object (key: value), where the key is
  // the variable name used in the html, and the value is the value you set it as

});


// This is rendering the same "plan" file but with example data in variables
app.get("/showExample", function(req, res) {

  let day1 = {
    date: "01/01/2021",
    notes: "I wrote my first hello world line",
    id: "example"
  }
  let day2 = {
    date: "01/02/2021",
    notes: "Learned if statements but struggled with for loops",
    id: "example"
  }
  let day3 = {
    date: "01/03/2021",
    notes: "Built my first website",
    id: "example"
  }

  let testGoals = {
    projectName: "Learn to Code",
    totalWeeks: 12,
    goalHoursWeek: 14,
  }

  // Only push these one time
  // if (onlyPushOnce === 0) {
  //   posts.push(day1, day2, day3);
  //   startGoals.push(testGoals);
  //   onlyPushOnce++;
  // }

  let postsExample = [day1, day2, day3];
  let startGoalsExample = [testGoals];

  let labels = postsExample.map(x => x.date);

  let hoursData = postsExample.map(x => x.hours);

  // showExample = 1;

  res.render("showExample", {
    postsExample: postsExample,
    labels: labels,
    startGoalsExample: startGoalsExample,
    // showExample: showExample
  });
});




app.get("/compose", function(req, res) {
  res.render("compose", {
    todayDateApp: todayDateApp
  });
});




app.post("/compose", function(req, res) {
  const userPost = {
    date: req.body.composeDate,
    notes: req.body.composeNotes
  };

  posts.push(userPost);

  console.log("Logging notes below: ");
  console.log(posts);

  // let xxx = posts[0].title;
  // let yyy = xxx.replace(" ", "-").toLowerCase();
  // console.log(yyy);

  // If a note is entered before a new project there will be an error going to the
  // plan page. So this redirects the user to create a project in that case.
  if (startGoals.length === 0) {
    res.redirect("/newGoal");
  } else {
    res.redirect("/plan");
  }


});









app.get("/newGoal", function(req, res) {
  res.render("newGoal", {});
});

app.post("/newGoal", function(req, res) {
  const userGoals = {
    projectName: req.body.composeProjectName,
    totalWeeks: Number(req.body.composeTotalWeeks),
    goalHoursWeek: Number(req.body.composeGoalHoursWeek)
  };

  // First reset startGoals to remove example, then push the new user input
  startGoals = [];
  startGoals.push(userGoals);
  // console.log("Logging starting goals below: ");
  // console.log(startGoals);
  // startGoals.shift();
  console.log("Logging starting goals below: ");
  console.log(startGoals);


  // This removes the examples from the posts
  posts = posts.filter(function(post) {
    return post.id !== "example";
  });

  // Now that a goal was entered, this value changes to 1
  didUserEnterGoal = 1;

  res.redirect("/plan");

});


app.get("/getStarted", function(req, res) {
  res.render("getStarted", {});
});







// Get the saved data. This data is the user entered data in the table
app.post("/plan", function(req, res) {

  // This gets the user saved data as a string from the input
  let userSavedDataString = req.body.savedData;
  // This converts that string into an array
  let userSavedDataArray = userSavedDataString.split(",");
  savedData.push(userSavedDataArray);

});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});
