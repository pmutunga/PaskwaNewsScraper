var express = require("express");

var router = express.Router();

// Import the model (HeadLine.js) to use its database functions.
var Note = require("../models/HeadLine");


// Create all our routes and set up logic within those routes where required.