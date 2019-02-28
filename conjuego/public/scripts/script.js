$(document).ready(function() {

	$.getJSON("/en/verb", function(result) {
		$("#infinitivo").html(result.infinitive);
		$("#tema").html(result.subject);
		$("#aspecto").html(result.mood);
		$("#tenso").html(result.tense);
	});
});

