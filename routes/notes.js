/////////////////////////////////////////////////
//                    SETUP                    //
/////////////////////////////////////////////////

var express = require("express");
var router = express.Router();
var convertMarkdownToHtml = require("../modules/convert-markdown-to-html");
var Note = require("../models/note");

console.log(convertMarkdownToHtml);

/////////////////////////////////////////////////
//                   ROUTES                    //
/////////////////////////////////////////////////

// NEW
router.get("/new", function(req, res) {
	Notebook.findById(req.params.notebook_id, function(err, notebook) {
		if (err) {
			console.log("back");
		} else {
			res.render("notes/new", {notebook: notebook});
		}
	});
});

// SHOW
router.get("/:id", function(req, res) {
	Note.findById(req.params.id, function(err, note) {
		if(err){
			res.redirect("/");
		} else {
			console.log(req.params.id);
			// res.redirect("/");
			var html = convertMarkdownToHtml(note.text)
			res.render("notes/show", {note: note, html: html})
		}
	});
});

// CREATE
router.post("/", function(req, res) {
	Notebook.findById(req.body.notebook_id, function(err, notebook) {
		if (err) {
			console.log("back");
		} else {
			Note.create(req.body.note, function(err, note){
				if(err){
					res.render("notebooks/:notebook_id/notes/new");
				} else {
					notebook.notes.push({ id: note._id, title: note.title });
					notebook.save();
					res.redirect("/notebooks/" + req.body.notebook_id + "/notes/" + note._id);
				}
			});
		}
	});
});

/////////////////////////////////////////////////
//                   EXPORTS                   //
/////////////////////////////////////////////////

module.exports = router;
