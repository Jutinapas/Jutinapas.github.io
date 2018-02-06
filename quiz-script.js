var answer = '';
var score = 0;
var start = false;
var timer = 10;
var questions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

$(document).ready(() => {

	$('#result').hide();
	$('#question').hide();
	$('.option').hide();
	$('.timer').hide();
	$('.image').hide();

	$('#normal').on('click', event => {
		selectMode();
	});
	$('#hard').on('click', event => {
		questions.push(10, 11, 12, 13, 14, 15, 16, 17, 18, 19);
		selectMode();
	});

	$('#option1').on('click', event => {
		selectOption('1');
	});
	$('#option2').on('click', event => {
		selectOption('2');
	});
	$('#option3').on('click', event => {
		selectOption('3');
	});
	$('#option4').on('click', event => {
		selectOption('4');
	});

	setInterval(() => {
		if (start == true) {
			$('.timer').html(timer + 's');
			if (timer == 0) {
				timer = 10;
				loadQuestion(randomQuiz());
			} timer -= 1; 
		} 
	}, 1000);

});

function loadQuestion(i) {

	console.log(questions);

	$('.image').hide();

	if (i == -1) {
		showResult();
		return ;
	}

	if (questions.length == 0) {
		start = false;
		showResult();
		return ;
	}

	timer = 10;

	var test = $.ajax({
		url: 'question.json',
		method: 'GET',
		dataType: 'json',
		success: response => {
			$('#question').html(response[i].question);
			if (i >= 10) {
				$('#question').addClass('extend');
				$('.image').attr('src', '');
				$('#option3').show();
				$('#option4').show();
				$('#option1').html(response[i].option1);
				$('#option2').html(response[i].option2);
				$('#option3').html(response[i].option3);
				$('#option4').html(response[i].option4);
			}
			else {
				$('#question').removeClass('extend');
				$('.image').slideDown(200);
				$('.image').attr('src', response[i].image);
				$('#option3').hide();
				$('#option4').hide();
				$('#option1').html('TRUE');
				$('#option2').html('FALSE');
			}
			answer = response[i].answer;
		}
	});

}

function selectOption(option) {
	if (answer == option) {
		score += 10 * timer;
	} loadQuestion(randomQuiz());
}

function random(range) {

	return Math.floor(Math.random() * range);

}

function randomQuiz() {

	if (questions.length == 0) {
		return -1;
	}

	var index = random(questions.length);
	var quiz = questions[index];

	questions.splice(index, 1);

	return quiz;
}

function selectMode() {
	$('.title').hide();
	$('.subtitle').hide();
	$('.btn').hide();
	$('.timer').show();
	$('#question').show();
	$('.option').show();
	start = true;
	loadQuestion(randomQuiz());
}

function showResult() {
	$('.image').attr('src', '');
	$('.image').hide();
	$('#result').slideDown(800).html('SCORE: ' + score);
	$('#question').hide();
	$('.option').hide();
	$('.timer').hide();
}