var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// A GET route for scraping the thrashermagazine website
app.get("/scrape", function (req, res) {
    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get("http://www.thrashermagazine.com/").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(response.data);

        $("h4.post-title").each(function (i, element) {

            var results = {};

            // var title = $(element).text();
            // var link = $(element).find("a").attr("href");

            result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");

            db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        });
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});