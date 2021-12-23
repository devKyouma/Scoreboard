
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


let day1 = {
  date: "01/01/2021",
  hours: 2,
  notes: "did ok"
}

let day2 = {
  date: "01/02/2021",
  hours: 3,
  notes: "did great"
}

let day3 = {
  date: "01/03/2021",
  hours: 1,
  notes: "did bad"
}

let testGoals = {
  projectName: "Learn to Code",
  totalWeeks: 4,
  goalHoursWeek: 14,
}

let posts = [day1, day2, day3];
let startGoals = [testGoals];



// This sums up all the hours in my array.
// The reduce method starts at the set number (0) for the accumulator then goes through
// the array and adds each current value.
// https://www.youtube.com/watch?v=g1C40tDP0Bk
let totalHours = posts.reduce(function (accumlator, currentValue){
  return accumlator + currentValue.hours;
}, 0);

console.log(totalHours);








app.get("/", function(req, res) {


// This goes through each post and creates an array of each of the dates. I then
// pass this array to the chart to use as the labels.
// https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  let labels = posts.map(x => x.date);
  // console.log(labels);

// Doing the same thing for the hours
  let hoursData = posts.map(x => x.hours);
  // console.log(hoursData);


  // In this code i am telling the server to run the html file "home"
  // Then pass a second parameter, which is the const above that will pass through html
  // In this second parameter, you pass a object (key: value), where the key is
  // the variable name used in the html, and the value is the value you set it as
  res.render("home", {
    posts: posts,
    labels: labels,
    hoursData: hoursData,
    startGoals: startGoals
  });



});

app.get("/about", function(req, res) {
  // It is standard to use the same text for the key and value
  // but sometimes i get confused so for now I am keeping them different
  // For example, this works as well: "  res.render("about", {aboutContent: aboutContent});"
  res.render("about", {
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactText: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {});
});

app.post("/compose", function(req, res) {
  const userPost = {
    date: req.body.composeDate,
    hours: Number(req.body.composeHours),
    notes: req.body.composeNotes
  };

  posts.push(userPost);
  console.log("Logging posts below: ");
  console.log(posts);

  // let xxx = posts[0].title;
  // let yyy = xxx.replace(" ", "-").toLowerCase();
  // console.log(yyy);

  res.redirect("/");

})












app.get("/start", function(req, res) {
  res.render("start", {});
});

app.post("/start", function(req, res) {
  const userGoals = {
    projectName: req.body.composeProjectName,
    totalWeeks: Number(req.body.composeTotalWeeks),
    goalHoursWeek: Number(req.body.composeGoalHoursWeek)
  };

  startGoals.push(userGoals);
  console.log("Logging starting goals below: ");
  console.log(startGoals);
  startGoals.shift();
  console.log("Logging starting goals below: ");
  console.log(startGoals);

  res.redirect("/");

})












// https://expressjs.com/en/guide/routing.html
// route parameters lecture 305
// This creates an object with a key of the url string after the colon (postName) and
// the value is whatever is typed in its place
// The colon and string after it is like a variable for what the use types
app.get("/post/:postName", function(req, res) {

  // This outputs the object when you go to the url
  // res.write(req.params.postName);

  // Convert title to lower case and replace spaces with dashes
  // Video says to use lodash library for this but i think its easier to just do this
  let urlTitle = req.params.postName.replaceAll(" ", "-").toLowerCase();

  // This checks if the title in the url matches any of the titles in the array
  posts.forEach(function(post) {
    // Also have to adjust title in array to remove space and change spaces
    if (post.title.replaceAll(" ", "-").toLowerCase() === urlTitle) {
      // console.log(post);

      // If the url they typed matched one of the titles, this code will run the html on
      // post.ejs. I then pass the post which is a single object within the array (since this
      // is within a forEach loop) into the html file
      res.render("post", {
        post: post,
      });

    }

  });

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
