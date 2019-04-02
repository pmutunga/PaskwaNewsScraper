var express = require("express");

var router = express.Router();

// Import the model (Note.js) to use its database functions.
var Note = require("../models/Note");

// Create all our routes and set up logic within those routes where required.

module.exports = {
  get: function(data, cb) {
    Note.find(
      {
        _headlineId: data._id
      },
      cb
    );
  },
  save: function(data, cb) {
    var NewNote = {
      _headlineId: data._id,
      body: data.body
    };
    Note.create(NewNote, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        cb(doc);
      }
    });
  },
  delete:function(data,cb){
      Note.remove({
          _id: data._id
      }, cb);
  }
};
