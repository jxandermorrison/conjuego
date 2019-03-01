$(document).ready(function() {

	refreshPage();

	function refreshPage() {
		$("#continue").hide();
		$("#respuesta").html("");
		$("#entregar").prop("disabled", false);
		$("#guess").val("");
		$("#guess").focus();

		$.getJSON("/en/verb", function(result) {
			$("#infinitivo").html(result.infinitive);
			$("#tema").html(result.subject);
			$("#aspecto").html(result.mood);
			$("#tenso").html(result.tense);

			if (result.tense.toUpperCase() != "Afirmativo") {
				var answer = result.subject + " " + result.answer;
				var response = answer.charAt(0).toUpperCase();
				response += answer.slice(1);
			} else {
				var answer = result.answer;
				var response = answer.charAt(0).toUpperCase();
				response += answer.slice(1);
			}

			$("#respuesta").data("data-answer", response);
			
		});
	}

	$("#guessForm").submit(function(e) {
		e.preventDefault();

		var values = $(this).serializeArray()[0];

		var guess = values.value;
		guess = guess.toUpperCase();

		var answer = $("#respuesta").data("data-answer");
		var check = answer.toUpperCase();

		if (check == guess) {
			$("#respuesta").html("CORRECTA<br>" + answer);
			$("#guess").blur();
			$("#continue").fadeIn();
			$("#entregar").prop("disabled", true);

		} else {
			$("#respuesta").html("Lo sentimos<br>" + answer);
			$("#guess").val("");
		}
	});


	$(document).on("keypress", function(e) {
		if (e.which === 13 && $("#continue").is(":visible")) {
			$("#continue").click();
		}
	});

	$("#continue").click(function() {
		refreshPage();
	});
});
