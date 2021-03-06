var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// var router = express.Router();

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// // Require all models
var db = require("./models"); //TA question - if I don't specify the file the app crashes. I figured out I needed an Index.js in models that exports Headline.js and Note.js

//Set up port to either host's designated port or 3000.
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
//app.use(express.static("public"));//TA question - when to use?
app.use(express.static(__dirname + "/public")); //This works for me

//set up express view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Connect to the Mongo DB and mongoose

//if deployed, use deployed database. Otherwise use the local mongoheadlines db
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(function() {
  console.log("connected to db");
});  


// HTML routes
app.get("/", function(req, res) {
  res.redirect("/headlines");
});

// app.get("/saved", function(req, res) {
//   res.render("saved");
// });

//API routes
// A GET route for scraping the cNet website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.cnet.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h3 within an article tag, and do the following:
    $("h3").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text(),
      // result.summary = $(this)
      //   .children("p")
      //   .text();
      // result.image = $(this)
      //   .children("figure")
      //   .attr("src");
      result.link = `https://www.cnet.com/${$(this)
        .children("a")
        .attr("href")}`;



      // Create a new Article using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    // res.send("Scrape Complete");
    //if array not empty change clase of modal
    res.redirect("/headlines");
  });
});

// Route for getting all Articles from the db
app.get("/headlines", function(req, res) {
  // Grab every document in the Articles collection
  db.Headline.find({ saved: false })
    .then(function(dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      //res.json(dbHeadline);
      res.render("home", { Headline: dbHeadline });
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for getting saved Articles from the db
app.get("/saved", function(req, res) {
  // Grab every document in the Articles collection
  db.Headline.find({ saved: true })
    .then(function(dbSaved) {
      // If we were able to successfully find Articles, send them back to the client
      //res.json(dbHeadline);
      res.render("saved", { Headline: dbSaved });
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/headlines/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Headline.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for retrieving all Notes from the db
app.get("/notes", function(req, res) {
  // Find all Notes
  db.Note.find({})
    .then(function(dbNote) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/headlines/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Headline.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//route for saving article
app.post("/saveheadlines/:id", function(req, res) {
  console.log("server-side code running");
  // Update the headline that matches the object id
  db.Headline.update(
    {
      _id: req.params.id
    },
    {
      // Set the saved to true
      $set: {
        saved: true
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        // res.send(edited);
        res.redirect("/headlines");
      }
    }
  );
});

//route for unsaving article
app.post("/unsaveheadlines/:id", function(req, res) {
  console.log("server-side code running");
  // Update the headline that matches the object id
  db.Headline.update(
    {
      _id: req.params.id
    },
    {
      // Set the saved to true
      $set: {
        saved: false
      }
    },
    function(error, unsaved) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(unsaved);
        // res.send(unsaved);
        res.redirect("/saved");
      }
    }
  );
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
