
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new HeadlineSchema object
var HeadlineSchema = new Schema({
    HeadLine: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type:String,
        required: true
    },
    link: {
        type: String,
        required: true
      },
    date:String,
    saved: {
        type: Boolean,
        default: false
    },
      // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var HeadLine = mongoose.model("HeadLine", HeadlineSchema);

module.exports = HeadLine;