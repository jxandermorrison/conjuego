$(document).ready(function() {

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

			var answer = result.subject + " " + result.answer;
			answer = answer.toUpperCase();
			
			$("#guessForm").submit(function(e) {
				e.preventDefault();

				var values = $(this).serializeArray()[0];

				var guess = values.value;
				var check = guess.toUpperCase();

				if (check == answer) {
					$("#respuesta").html("CORRECTA<br>" + answer);
				} else {
					$("#respuesta").html("Lo sentimos<br>" + answer);
				}
				
				$("#guess").blur();
				$("#continue").fadeIn();

				$("#entregar").prop("disabled", true);

			});
		});
	}

	refreshPage();

	$(document).on("keypress", function(e) {
		if (e.which === 13 && $("#continue").is(":visible")) {
			$("#continue").click();
		}
	});

	$("#continue").click(function() {
		refreshPage();
	});

});
