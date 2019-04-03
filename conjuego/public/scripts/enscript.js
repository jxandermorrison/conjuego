var wrongMessage = "Por favor ingrese la respuesta ";
wrongMessage += "correcta para continuar.";

function setOpts(object) {

	var opciones = {
		"translation": false,
		"mood": [],
		"tense": []
	};	

	if ($("#show-translation").prop("checked"))
		opciones.translation = true;

	if ($("input.aspecto:checked").length < 1) {
		$(object).prop("checked", true);
		$("#error-aspecto").fadeIn(500);
		setTimeout(function() {
			$("#error-aspecto").fadeOut(500);
		}, 4000);
	}

	if ($("input.tenso:checked").length < 1) {
		$(object).prop("checked", true);
		$("#error-tenso").fadeIn(500);
		setTimeout(function() {
			$("#error-tenso").fadeOut(500);
		}, 4000);
	}

	$("input.aspecto:checked").each(function(index) {
		var inputId = this.id;
		var search = `label[for='${inputId}']`;
		var text = $(search).html();
		opciones.mood.push(text);
	});

	$("input.tenso:checked").each(function(index) {
		var inputId = this.id;
		var search = `label[for='${inputId}']`;
		var text = $(search).html();
		opciones.tense.push(text);
	});

	return opciones;
}

function refresh(opciones) {
	$("#answer-section").hide();
	$("#continue").hide();
	$("#guess").prop("disabled", false);
	$("#send").prop("disabled", false);
	$("#guess").val("");
	$("#guess").focus();

	$.getJSON("/en/verbs/fetch", opciones, (result) => {
		var subject = result.subject[0].toUpperCase() + 
			result.subject.slice(1);
		var infinitive = result.infinitive;
		var mood = result.mood;
		var tense = result.tense;
		var definition = result.definition;
		var translation = result.translation[0].toUpperCase() + 
			result.translation.slice(1);
		var answer = result.answer;

		$("#sujeto").html(subject);
		$("#infinitivo").html(infinitive);
		$("#aspecto").html(mood);
		$("#tenso").html(tense);

		if (mood.toLowerCase() != "imperativo")
			answer = [subject, answer].join(" ");
		else {
			var response = answer[0].toUpperCase();
			answer = response + answer.slice(1);
		}

		$("#correct").html(answer);
		$("#definition").html(infinitive + " = " + definition);
		if (!opciones.translation) {
			$(".translation").html("");
		}
		else {
			$("#translation-title").html("Traducción:");
			$("#translation").html(translation);
		}
	});
}

$(document).ready(function() {

	var opciones = setOpts();
	refresh(opciones);

	$("#guess-form").submit(function(e) {
		e.preventDefault();
		var guess = $("#guess").val();
		var correct = $("#correct").html();

		if (guess.toLowerCase() === correct.toLowerCase()) {
			$("#guess").prop("disabled", true);
			$("#send").prop("disabled", true);
			$("#wrong-message").html("");
			$("#answer-section").removeClass("incorrect-guess");
			$("#answer-section").addClass("correct-guess").fadeIn(500);
			$("#continue").fadeIn(500);
		} 
		else {
			$("#wrong-message").html(wrongMessage);
			$("#answer-section").addClass("incorrect-guess").fadeIn(500);
			$("#guess").val("").focus();
		}
	});
		

	$("body").click(function() {
		$(".dropdown-menu").fadeOut("fast");
	});

	$("#update-options, #opciones").click(function(e) {
		e.stopPropagation();
		$(".dropdown-menu").fadeToggle("fast");
	});

	$("input[type='checkbox']").change(function() {
		opciones = setOpts(this);
	});

	$("#update-options").click(function(e) {
		refresh(opciones);
	});

	$(".dropdown-menu").click(function(e) {
		e.stopPropagation();
	});

	$(document).on("keypress", function(e) {
		if (e.which === 13 && $("#continue").is(":visible")) {
			$("#continue").click();
		}
	});

	$("#continue").click(function(e) {
		refresh(opciones);
	});
});
