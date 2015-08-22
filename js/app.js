
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	var secretNumber, userGuess, pastGuesses, count,guessHtml, userFeedback,alreadyGuessed;
  	var $newButton = $('a.new');
  	var $form = $('form');
  	var $input = $form.find('#userGuess');
  	var $feedback = $('#feedback');
  	var $count = $('#count');
  	var $guessList = $('#guessList');

  	//page load
  	newGame();
  	//event handlers
  	$form.submit(function(event){
  		event.preventDefault();
  		getUserGuess();
  	});
  	$newButton.click(newGame);

  	//new game function
  	function newGame(){
  		count = 0;
  		pastGuesses = [];
  		guessHtml='';
  		userGuess = '';
  		userFeedback = 'Make your Guess!';
  		render();
  		generateNumber();
  	}

  	//page render function
  	function render(){
  		$guessList.html(guessHtml);
  		$count.html(count);
  		$feedback.html(userFeedback);
  	}

  	//get the user guess
  	function getUserGuess(){
  		userGuess = $input.val();
  		$input.val('');
  		$input.focus();
  		if(checkGuess()){return};
  		trackGuess();
  		guessCount();
  		render();
  	}

  	//utility functions
  	function checkGuess(){
  		if(!(userGuess % 1 == 0)){
  			alert("please input a number");
  			return true
  		}
  		if(!(userGuess > 0) || !(userGuess < 101)){
  			alert("please choose a number between zero and 100");
  			return true
  		}
		$.each(pastGuesses,function(guess,value){
			if(userGuess == value){
				alreadyGuessed = true
			}
		}) 
		if(alreadyGuessed){
			alreadyGuessed =false;
			alert('You guessed this number already');
			return true
		}

  		if(Math.abs(secretNumber - userGuess) < 10){
  			userFeedback = 'hot';
  		} else if(Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9){
  			userFeedback = ' Kinda hot';
  		} else if(Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19){
  			userFeedback = 'less than warm';
  		} else {
  			userFeedback = "cold"
  		}
  	}



  	function generateNumber(){
  		secretNumber = Math.floor(Math.random()*100)+1
  	};

  	//keep track of guess count
  	function guessCount(){
  		count++;
  	}
  	//keep track of the users past guesses
  	function trackGuess(){
  		pastGuesses.push(userGuess);
  		guessHtml = ""
  		if(pastGuesses.length) {
  			$.each(pastGuesses,function(guess,value){
  				guessHtml += '<li>'+value+'</li>'
  			})
  		}
  	}


});


