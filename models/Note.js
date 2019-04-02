var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  // `_headlineId` of the article we want to associate our note to
  // `body` is of type String
  _headlineId: {
    type:Schema.Types.ObjectId,
    ref: "Headline"
  },
  // date:String,
  body: String  
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;

//Question - do I need to link the HeadLine here?