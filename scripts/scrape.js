//scrape script

//require request and cheerio. We'll need them for scraping
var request = require("request");
var cheerio = require("cheerio");

var scrape = function() {
  // First, we grab the body of the html with axios
  request("http://www.nytimes.com", function(err, res, body) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(body);

    // Now, we grab every div with the class css-1qj0wac and do the following:

    $(".css-1qj0wac").each(function(i, element) {
      //save an empty object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
    });
  };

