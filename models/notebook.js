var mongoose = require("mongoose");

var notebookSchema = new mongoose.Schema({
	name: String,
	notes: [{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Note"
		},
		title: String
	}]
});

module.exports = mongoose.model("Notebook", notebookSchema);