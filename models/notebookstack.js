var mongoose = require("mongoose");

var notebookStackSchema = new mongoose.Schema({
	name: String,
	notebooks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Notebook"
	}]
});

module.exports = mongoose.model("NotebookStack", notebookStackSchema);