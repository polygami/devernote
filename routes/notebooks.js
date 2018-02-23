/////////////////////////////////////////////////
//                    SETUP                    //
/////////////////////////////////////////////////

var express = require("express");
var router = express.Router();

/////////////////////////////////////////////////
//                   ROUTES                    //
/////////////////////////////////////////////////

// NEW
router.get("/new", function(req, res) {
	res.render("notebooks/new");
});

// CREATE
router.post("/", function(req, res) {
	Notebook.create(req.body.notebook, function(err, notebook){
		if(err){
			res.render("new");
		} else {
			res.redirect("/notebooks/" + notebook._id + "/notes/new");
		}
	});
});

/////////////////////////////////////////////////
//                   EXPORTS                   //
/////////////////////////////////////////////////

module.exports = router;
