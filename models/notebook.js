var mongoose = require("mongoose");

var notebookSchema = new mongoose.Schema({
	name: String,
	notes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Note"
	}]
});

module.exports = mongoose.model("Notebook", notebookSchema);