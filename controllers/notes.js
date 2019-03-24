var express = require("express");

var router = express.Router();

// Import the model (Note.js) to use its database functions.
var Note = require("../models/Note");


// Create all our routes and set up logic within those routes where required.