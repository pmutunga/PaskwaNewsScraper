//scrape script

//require request and cheerio. We'll need them for scraping
var request = require("request");
var cheerio=require("cheerio");

var scrape = function(){
    request("http://wwww.nytims.com", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];

        $(".theme-summary").each(function(i, element){

            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim(;)
        })
    })
}