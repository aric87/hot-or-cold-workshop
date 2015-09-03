!function(){
	var domElements = {
		$newButton:'',
		$form :'',
		$input:'',
		$feedback:'',
		$count:'',
		$guessList:'',
		popInputValue :function (){
			gameData.userGuess = domElements.$input.val();
			domElements.$input.val('');
			domElements.$input.focus();
			return gameData.userGuess
		}
	};
	var gameData = {
		secretNumber:'',
		userGuess:'',
		pastGuesses:[],
		count:'',
		guessHtml:'',
		userFeedback:'',
		alreadyGuessed:'',
		generateNumber:	function (){
			this.secretNumber = Math.floor(Math.random()*100)+1;
		},
		resetVariables:function (){
			this.count = 0;
			this.pastGuesses = [];
			this.guessHtml='';
			this.userGuess = '';
			this.userFeedback = 'Make your Guess!';
		},
		trackGuesses:function (){
			this.count++;
			this.pastGuesses.push(this.userGuess);
			this.guessHtml = "";
			if(this.pastGuesses[0].length) {
				$.each(this.pastGuesses,function(guess,value){
					gameData.guessHtml += '<li>'+value+'</li>'
				})
			}
		},
		setGuess: function (){
			this.trackGuesses();
			gameActions.render();
		}

	};



	var gameActions = {
		pageLoad:function () {
			domElements.$newButton = $('a.new');
			domElements.$form = $('form');
			domElements.$input = domElements.$form.find('#userGuess');
			domElements.$feedback = $('#feedback');
			domElements.$count = $('#count');
			domElements.$guessList = $('#guessList');
			$(".what").click(function(){
				$(".overlay").fadeIn(1000);
			});
			/*--- Hide information modal box ---*/
			$("a.close").click(function(){
				$(".overlay").fadeOut(1000);
			});
			domElements.$form.submit(function(event){
				event.preventDefault();
				gameActions.getUserGuess();
			});
			domElements.$newButton.click(gameActions.newGame);
		},
		newGame:function(){
			domElements.$form.find('input[type=submit]').css('opacity','1');
			gameData.resetVariables();
			gameData.generateNumber();
			gameActions.render();
		},
		getUserGuess:function (){
			domElements.popInputValue();
			var trackGuess = !filters.checkGuess();
			if(trackGuess){
				gameData.setGuess();
			}
		},
		render: function (){
			domElements.$guessList.html(gameData.guessHtml);
			domElements.$count.html(gameData.count);
			domElements.$feedback.html(gameData.userFeedback);
		},
		winner: function (){
			gameData.userFeedback = "You Won. Click new game to play again";
			domElements.$form.find('input[type=submit]').css('opacity','0');
		}

	};

	var filters = {
		checkGuess: function (){
			if(!(gameData.userGuess % 1 == 0)){
				alert("please input a number");
				return true
			}
			if(!(gameData.userGuess > 0) || !(gameData.userGuess < 101)){
				alert("please choose a number between zero and 100");
				return true
			}
			$.each(gameData.pastGuesses,function(guess,value){
				if(gameData.userGuess == value){
					gameData.alreadyGuessed = true
				}
			});
			if(gameData.alreadyGuessed){
				gameData.alreadyGuessed =false;
				alert('You guessed this number already');
				return true
			}
			this.generateFeedback();
			return false
		},
		generateFeedback: function (){
			if(gameData.secretNumber == gameData.userGuess){
				gameActions.winner();
			} else if(Math.abs(gameData.secretNumber - gameData.userGuess) < 10){
				gameData.userFeedback = 'hot';
			} else if(Math.abs(gameData.secretNumber - gameData.userGuess) < 20 && Math.abs(gameData.secretNumber - gameData.userGuess) > 9){
				gameData.userFeedback = ' Kinda hot';
			} else if(Math.abs(gameData.secretNumber - gameData.userGuess) < 30 && Math.abs(gameData.secretNumber - gameData.userGuess) > 19){
				gameData.userFeedback = 'less than warm';
			} else {
				gameData.userFeedback = "cold"
			}
		}
	};

	$(document).ready(gameActions.pageLoad);
window.game = {
	gameData:gameData,
	gameActions:gameActions,
	domElements:domElements
}

}();




