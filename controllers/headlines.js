var express = require("express");

var router = express.Router();

// Import the model (HeadLine.js) to use its database functions.
var Note = require("../models/HeadLine");

// Create all our routes and set up logic within those routes where required.

module.exports = {
  get: function(query, cb) {
    Headline.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  update: function(query, cb){
      Headline.update({_id: query._id},{
          $set:query}, {}, cb);
  }
};
