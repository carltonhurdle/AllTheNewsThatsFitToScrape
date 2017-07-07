//start with the requires
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up the port for 3000 OR the designated port
var PORT = process.env.PORT || 3000;

//express app
var app = express();

//express router
var router = express.Router();

//require routes file pass the router object
require("config/routes")(router);

//designate the public folder as a static directory
app.use(express.static(__dirname+"/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use body parser
app.use(bodyParser.urlencoded({
	extended: false
}));

//every request shoud go through router middleware
app.use(router);

//database or mongoheadlines db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to the db
mongoose.connect(db, function(error){
	if (error) {
		console.log(error);
	} else {
		console.log("mongoose connection successful")
	}
});

//listener on port
app.listen(PORT, function(){
	console.log("listening on port:" + PORT);
});