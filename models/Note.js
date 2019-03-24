var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    // _HeadlineId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "HeadLine"
      
    // },
    date:String,
    noteText: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

//Question - do I need to link the HeadLine here?