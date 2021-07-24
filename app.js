// Stock Market Search App by Brian Moon

// creating an express application in our js app
const { object } = require("assert-plus");
const express = require("express"); // pulls express into our app
const app = express(); // allows us to use express
// add a reference to handlevars
const exphbs = require("express-handlebars");
// we need to add path to app
const path = require("path");
const { post } = require("request");
// request for api
const request = require("request");
// telling app which port to listen on; using OR for webhosts that are using their own port (we're using 5000)
const PORT = process.env.PORT || 5000;

// point to env file
dotenv.config({ path: "./config.env" });

// parser middleware
app.use(express.urlencoded());

// API Key: pk_acb37dd339c446f2b589742ab463a39a
function call_api(requestcompleted, ticker) {
  request(
    "https://cloud.iexapis.com/stable/stock/" +
      ticker +
      "/quote?token=" +
      process.env.APIKEY,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        requestcompleted(body);
      }
    }
  );
}
// MY SIMPLE API CALL
// var returned_request = request(
//   "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_acb37dd339c446f2b589742ab463a39a",
//   { json: true }
// );
// error handling version of api request
// request(
//   "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_acb37dd339c446f2b589742ab463a39a",
//   { json: true },
//   (err, res, body) => {
//     if (err) {
//       return console.log(err);
//     }
//     if (res.statusCode === 200) {
//       console.log(body);
//     }
//   }
// );

// Set handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Set handlebar routes
// route to homepage
// app.get("/", function (req, res) {
//   res.render("home", { stock_call: returned_request.symbol });
// });
// for function version of api call (get)
app.get("/", function (req, res) {
  call_api(function (request) {
    res.render("home", { stock_call: request });
  }, "aapl");
});

// for function version of api call (post)
app.post("/", function (req, res) {
  call_api(function (request) {
    posted_data = req.body.stock_ticker;
    res.render("home", {
      stock_call: request,
      posted_data_return: posted_data,
    });
  }, req.body.stock_ticker);
});

// routing to second dynamic page
app.get("/stocknews", function (req, res) {
  res.render("stocknews");
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
