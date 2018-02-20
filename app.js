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

var indexRoutes		= require("./routes/index"); 

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/devernote");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

/////////////////////////////////////////////////
//                   ROUTES                    //
/////////////////////////////////////////////////

// Root (landing page)d
app.get("/", function(req, res){
    res.render("index");
});

/////////////////////////////////////////////////
//                   SERVER                    //
/////////////////////////////////////////////////

const PORT = process.env.PORT || 2018;
app.listen(PORT, process.env.IP, function () {
	console.log(`Server listening on port ${PORT}`);
});