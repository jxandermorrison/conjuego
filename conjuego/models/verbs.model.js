var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EnglishVerbSchema = new Schema(
	{
		infinitive: {type: String},
		definition: {type: String},
		mood: {type: String},
		subject: {type: String},
		tense: {type: String},
		answer: {type: String},
		translation: {type: String}
	},
	{collection: "english"}
);

module.exports = mongoose.model("EnglishVerb", EnglishVerbSchema);
