var EnglishVerb = require("../models/verbs.model");

exports.test = function(req, res) {
	res.send("Greetings from the verbs controller");
}

exports.fetchVerb = function(req, res) {
	EnglishVerb.countDocuments().exec(function (err, count) {

		var random = Math.floor(Math.random() * count);

		EnglishVerb.findOne().skip(random).exec(
			function(err, result) {
				console.log(result);
			});
	});
	res.send("Success");
}
