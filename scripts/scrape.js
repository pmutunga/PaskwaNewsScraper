 // Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
 
var scrape = function(cb) {
 // First, we grab the body of the html with axios
 axios.get("https://www.cnet.com/").then(function(response) {
  // Then, we load that into cheerio and save it to $ for a shorthand selector
  var $ = cheerio.load(response.data);

  // Now, we grab every h3 within an article tag, and do the following:
  $(".latestScrollItems h3").each(function(i, element) {
    // Save an empty result object
    var result = {};
          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
          .children("a")
          .text();
        // result.summary = $(this)
        //   .children("p")
        //   .text();
        // result.image = $(this)
        //   .children("img")
        //   .attr("src");
        result.link = `https://www.cnet.com/${$(this)
          .children("a")
          .attr("href")}`;
}); //End of scrape function

 })
