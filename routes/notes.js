/////////////////////////////////////////////////
//                    SETUP                    //
/////////////////////////////////////////////////

var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams makes the params accessible
var convertMarkdownToHtml = require("../modules/convert-markdown-to-html");
var Note = require("../models/note");


/////////////////////////////////////////////////
//                   ROUTES                    //
/////////////////////////////////////////////////

// NEW
router.get("/new", function(req, res) {
	Notebook.findById(req.params.notebook_id, function(err, notebook) {
		if (err) {
			res.redirect("back");
		} else {
			res.render("notes/new", {notebook: notebook});
		}
	});
});

// SHOW
router.get("/:note_id", function(req, res) {
	Note.findById(req.params.note_id, function(err, note) {
		if(err){
			res.redirect("/");
		} else {
			var html = convertMarkdownToHtml(note.text);
			res.render("notes/show", {notebook_id: req.params.notebook_id, note: note, html: html})
		}
	});
});

// CREATE
router.post("/", function(req, res) {
	Notebook.findById(req.body.notebook_id, function(err, notebook) {
		if (err) {
			res.redirect("back");
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

// DESTROY
router.delete("/:note_id", function(req, res) {
	Note.findByIdAndRemove(req.params.note_id, function (err, note) {
		if(err) {
			res.redirect("back");
		} else {
			Notebook.findById(req.params.notebook_id, function (err, notebook) {
				if (err) {
					console.log(err);
				} else {
					notebook.notes = notebook.notes.filter(function( obj ) {
						return !obj.id.equals(req.params.note_id);
					});
					notebook.save();
					res.redirect("/"); 
				}
			})
		}
	});
});

/////////////////////////////////////////////////
//                   EXPORTS                   //
/////////////////////////////////////////////////

module.exports = router;
