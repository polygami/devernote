/////////////////////////////////////////////////
//                    SETUP                    //
/////////////////////////////////////////////////

require("dotenv").config();

var express			= require("express"),
	favicon			= require("serve-favicon"),
	app				= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	methodOverride 	= require("method-override"),
	path			= require("path");
	hljs			= require("highlight.js"),
	showdown		= require("showdown"),
	Note			= require("./models/note"),
	Notebook		= require("./models/notebook");

var	indexRoutes		= require("./routes/index"),
	noteRoutes		= require("./routes/notes"),
	notebookRoutes	= require("./routes/notebooks");

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/devernote");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

/////////////////////////////////////////////////
//                 MIDDLEWARE                  //
/////////////////////////////////////////////////

app.use(function(req, res, next){
	Notebook.find({}, function(err, notebooks) {
		if (err) {
			console.log(err);
			next();
		} else {
			app.locals.notebooks = notebooks;
			next();
		}
	})
});

/////////////////////////////////////////////////
//                   ROUTES                    //
/////////////////////////////////////////////////

app.use("/", indexRoutes);
app.use("/notebooks", notebookRoutes);
app.use("/notebooks/:notebook_id/notes", noteRoutes);

/////////////////////////////////////////////////
//                   SERVER                    //
/////////////////////////////////////////////////

const PORT = process.env.PORT || 2018;
app.listen(PORT, process.env.IP, function () {
	console.log(`Server listening on port ${PORT}`);
});
