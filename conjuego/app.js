var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var mongodb = require("mongodb");
var monk = require('monk');

var app = express();

var db = monk("localhost:27017/verbs");

nunjucks.configure("views", {
	autoescape: true,
	express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
	res.render("index.html");
});

app.use(function(req, res, next) {
	req.db = db;
	next();
});

app.get("/en/", (req, res) => {
	res.render("english.html");
});

app.get("/en/verb", (req, res) => {
	var collection = db.get("english");
	
	collection.aggregate([
		{$match:
			{$and: [
				{mood: {$in: req.query.mood}},
				{tense: {$in: req.query.tense}}
			]}
		},
		{"$sample": {"size": 1}}
	], (err, result) => {
		res.json(result);
	});
});

app.listen(3000, () => {
	console.log("*Listening on localhost:3000");
});
