var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
	title: String,
	text: String
});

module.exports = mongoose.model("Note", noteSchema);