// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var exphbs = require("express-handlebars");
const mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

//Set up port to either host's designated port or 3000.
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//Designate Public folder

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));//TA question - when to use #21?
app.use(express.static(__dirname + "/public"));


//set up express view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set up Express Router
var router = express.Router();

// //have every request go through our router middleware
// app.use(router); TA question - do i need this? why?

//require routes file to pass our router object
require("./config/routes")(router);

//Set up mongoose to either use deployed DB or local db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//Database setup
mongoose.connect(db, function(error) {
  //log errors
  if (error) {
    console.log(error);
  }
     //or else success message
     else{
         console.log("mongoose connection is successful");
     }
});

//Routes
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/saved", function(req, res) {
  res.render("saved");
});

// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// // Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request via axios for the news section of `ycombinator`
//   axios.get("https://news.ycombinator.com/").then(function(response) {
//     // Load the html body from axios into cheerio
//     var $ = cheerio.load(response.data);
//     // For each element with a "title" class
//     $(".title").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
