var opciones = {};

$(document).ready(function() {
/*
	setOptions();
	refreshPage();

	function refreshPage() {
		$("#respuesta").removeClass("white-bg-opaque");
		$("#continue").hide();
		$("#respuesta").html("");
		$("#entregar").prop("disabled", false);
		$("#guess").prop("disabled", false);
		$("#guess").val("");
		$("#guess").focus();

		$.getJSON("/en/verb", opciones, function(result) {
			var subject = result[0].subject;
			var subjeto = subject.charAt(0).toUpperCase();
			subjeto += subject.slice(1);

			$("#infinitivo p").html(result[0].infinitive);
			$("#tema p").html(subjeto);
			$("#aspecto p").html(result[0].mood);
			$("#tenso p").html(result[0].tense);

			if (result[0].tense.toUpperCase() != "AFIRMATIVO" && 
				result[0].tense.toUpperCase() != "NEGATIVO") {
				var answer = result[0].subject + " " + result[0].answer;
				var response = answer.charAt(0).toUpperCase();
				response += answer.slice(1);
			} else {
				var answer = result[0].answer;
				var response = answer.charAt(0).toUpperCase();
				response += answer.slice(1);
			}

			$("#respuesta").data("data-answer", response);
			$("#respuesta").data("data-id", result[0].id);
			$("#respuesta").data("data-defi", result[0].definition);
			$("#respuesta").data("data-trans", result[0].translation);
			
		});
	}

	function setOptions(object) {

		if ($("input.aspecto:checked").length === 0) {
			$(object).prop("checked", true);
			$("#error-aspecto").fadeIn(500);
			setTimeout(function() {
				$("#error-aspecto").fadeOut(2000);
			}, 4000);

			return
		}
		if ($("input.tenso:checked").length === 0) {
			$(object).prop("checked", true);
			$("#error-tenso").fadeIn(500);
			setTimeout(function() {
				$("#error-tenso").fadeOut(2000);
			}, 4000);

			return
		}
			
		opciones.mood = [];
		$("input.aspecto:checked").each(function() {
			var inputId = this.id;
			var search = "label[for='" + inputId + "']";
			var title = $(search).html();
			opciones.mood.push(title);
		});

		opciones.tense = [];
		$("input.tenso:checked").each(function() {
			var inputId = this.id;
			var search = "label[for='" + inputId + "']";
			var title = $(search).html();
			opciones.tense.push(title);
		});
	}

	// CLOSE OPTIONS


	$("#update-options").click(function(e) {
		e.preventDefault();
		$("#quiz-options").fadeToggle();
		refreshPage();
	});

	$("input[type='checkbox']").change(function() {
		setOptions(this);
	});

	// CHECK ANSWER

	$("#guessForm").submit(function(e) {
		e.preventDefault();

		var values = $(this).serializeArray()[0];

		var guess = values.value;
		guess = guess.toUpperCase();

		var answer = $("#respuesta").data("data-answer");
		var check = answer.toUpperCase();
		var definition = $("#respuesta").data("data-defi");
		var translation = $("#respuesta").data("data-trans");
		var infini = $("#infinitivo p").html()

		if (check == guess) {
			var returnHtml = "CORRECTA<br><strong>" + answer;
			returnHtml += "</strong>" + "<br>".repeat(2);
			returnHtml += "DEFINICIÓN DEL VERBO<br><strong>";
			returnHtml += infini + " = " + definition + "</strong><br>";
			if ($("#show-translation").is(":checked")) {
				returnHtml += "<br>TRADUCCIÓN<br><strong>";
				returnHtml += translation + "</strong>";
			}

			if ($("#respuesta").hasClass("text-danger"))
				$("#respuesta").removeClass("text-danger");
			$("#respuesta").addClass("text-success");
			$("#respuesta").addClass("white-bg-opaque");
			$("#respuesta").html(returnHtml);

			$("#guess").blur();
			$("#guess").prop("disabled", "true");
			$("#continue").fadeIn();
			$("#entregar").prop("disabled", true);

		} else {
			var returnHtml = "LO SENTIMOS";
			returnHtml += "<br><strong>" + answer + "</strong>";
			returnHtml += "<br>".repeat(2);
			returnHtml += "<em>Por favor ingrese la respuesta ";
			returnHtml += "correcta para continuar</em>";
			if ($("#respuesta").hasClass("text-success"))
				$("#respuesta").removeClass("text-success");
			$("#respuesta").addClass("text-danger");
			$("#respuesta").addClass("white-bg-opaque");
			$("#respuesta").html(returnHtml);
			
			$("#guess").val("");
		}
	});

	// ALLOW FOR CONTINUE

	$(document).on("keypress", function(e) {
		if (e.which === 13 && $("#continue").is(":visible")) {
			$("#continue").click();
		}
	});

	$("#continue").click(function() {
		refreshPage();
	});

*/

	$("#update-options").click(function() {
		$(".dropdown-menu").fadeToggle("fast");
	});

	$("#opciones").click(function(e) {
		$(".dropdown-menu").fadeToggle("fast");
	});


});
