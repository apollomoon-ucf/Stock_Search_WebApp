// Stock Market Search App by Brian Moon

// creating an express application in our js app
const express = require("express"); // pulls express into our app
const app = express(); // allows us to use express
// add a reference to handlevars
const exphbs = require("express-handlebars");
// we need to add path to app
const path = require("path");

// telling app which port to listen on; using OR for webhosts that are using their own port (we're using 5000)
const PORT = process.env.PORT || 5000;

// Set handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Set handlebar routes
// route to homepage
app.get("/", function (req, res) {
  res.render("home", { factorial: "Factorial of 10 is: " + factorial(10) });
});

// factorial function
function factorial(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else return num * factorial(num - 1);
}

// create a path and a route to our html index page (index pages are the common default home page of an html file)
// we created a public folder but now we need to tell the computer where that is
// Set static foler
app.use(express.static(path.join(__dirname, "public")));

// tell app to listen on the port
app.listen(PORT, () => console.log("Server listening on port " + PORT));
