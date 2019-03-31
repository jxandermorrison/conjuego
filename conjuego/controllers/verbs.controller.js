var EnglishVerb = require("../models/verbs.model");

exports.test = function(req, res) {
	res.send("Greetings from the verbs controller");
}

exports.fetchVerb = function(req, res) {
	mood = JSON.parse(req.query.mood);
	tense = JSON.parse(req.query.tense);
	EnglishVerb.countDocuments()
		.where("mood").in(mood)
		.where("tense").in(tense)
		.exec(function (err, count) {

		var random = Math.floor(Math.random() * count);

		EnglishVerb.findOne()
			.where("mood").in(mood)
			.where("tense").in(tense)
			.skip(random)
			.exec(function(err, result) {
				res.send(result);
			});
		});
}
