var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var bodyParser = require("body-parser");
var logger = require('morgan');
var nunjucks = require('nunjucks');
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var verbs = require("./routes/verbs.route");

var app = express();

mongoose.connect("mongodb://localhost/verbs", {useNewUrlParser: true});
mongoose.Promie = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error:"));

nunjucks.configure("views", {
	autoescape: true,
	express: app
});

app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/en/verbs", verbs);

app.get("/en", (req, res) => {
	res.render("english.html");
});

app.get("/", (req, res) => {
	res.render("index.html");
});

app.listen(3000, () => {
	console.log("*Listening on localhost:3000");
});
