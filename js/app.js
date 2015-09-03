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
		},
		init:function(){
			this.$newButton = $('a.new');
			this.$form = $('form');
			this.$input = domElements.$form.find('#userGuess');
			this.$feedback = $('#feedback');
			this.$count = $('#count');
			this.$guessList = $('#guessList');
			$(".what").click(function(){
				$(".overlay").fadeIn(1000);
			});
			/*--- Hide information modal box ---*/
			$("a.close").click(function(){
				$(".overlay").fadeOut(1000);
			});
			this.$form.submit(function(event){
				event.preventDefault();
				gameActions.getUserGuess();
			});
			this.$newButton.click(gameActions.newGame);
		},
		render: function (){
			this.$guessList.html(gameData.guessHtml);
			this.$count.html(gameData.count);
			this.$feedback.html(gameData.userFeedback);
		},
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
			domElements.render();
		},
		checkGuess: function (){
			if(!(this.userGuess % 1 == 0)){
				alert("please input a number");
				return true
			}
			if(!(this.userGuess > 0) || !(this.userGuess < 101)){
				alert("please choose a number between zero and 100");
				return true
			}
			$.each(this.pastGuesses,function(guess,value){
				if(gameData.userGuess == value){
					gameData.alreadyGuessed = true
				}
			});
			if(this.alreadyGuessed){
				gameData.alreadyGuessed =false;
				alert('You guessed this number already');
				return true
			}
			this.generateFeedback();
			return false
		},
		generateFeedback: function (){
			if(this.secretNumber == this.userGuess){
				this.winner();
			} else if(Math.abs(this.secretNumber - this.userGuess) < 10){
				this.userFeedback = 'hot';
			} else if(Math.abs(this.secretNumber - this.userGuess) < 20 && Math.abs(this.secretNumber - this.userGuess) > 9){
				this.userFeedback = ' Kinda hot';
			} else if(Math.abs(this.secretNumber - this.userGuess) < 30 && Math.abs(this.secretNumber - this.userGuess) > 19){
				this.userFeedback = 'less than warm';
			} else {
				this.userFeedback = "cold"
			}
		}

	};



	var gameActions = {
		pageLoad:function () {
			domElements.init();
			this.newGame();
		},
		newGame:function(){
			domElements.$form.find('input[type=submit]').css('opacity','1');
			gameData.resetVariables();
			gameData.generateNumber();
			gameActions.render();
		},
		getUserGuess:function (){
			domElements.popInputValue();
			var trackGuess = !gameData.checkGuess();
			if(trackGuess){
				gameData.setGuess();
			}
		},
		winner: function (){
			gameData.userFeedback = "You Won. Click new game to play again";
			domElements.$form.find('input[type=submit]').css('opacity','0');
		}

	};



	$(document).ready(gameActions.pageLoad);

window.game = {
	gameData:gameData,
	gameActions:gameActions,
	domElements:domElements
}

}();




