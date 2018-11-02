var mongoose = require("mongoose");

// Save a ref to Schema constructor 
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

var NoteSchema = new Schema({
    title: String, 
    body: String
});

// This creates our model for the above schema, using mongoose's model method 
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model 
module.exports = Note;