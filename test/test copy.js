
QUnit.test('generate number creates a random number',function( assert ){
	generateNumber();
	assert.notEqual(secretNumber,'undefined','number is defined');
	assert.ok(typeof secretNumber === 'number', 'secret number is a number');
	assert.ok(secretNumber > 0, 'number is greate than zero');
	assert.ok(secretNumber < 101, ' number is less than 101');

})


// QUnit.test('check guess function', function ( assert ){
// 	userGuess = 'n';
// 	assert.equal(checkGuess(), true, ' not a number returns true');
// 	userGuess = '-1';
// 	assert.equal(checkGuess(), true, 'number is less than 0');
// 	userGuess = '102';
// 	assert.equal(checkGuess(), true, ' number is greater than 100');
// 	userGuess = '10';
// 	pastGuesses =[];
// 	assert.equal(checkGuess(), false, ' number is good, and the user hasn\'t guessed');
// 	pastGuesses =['10'];
// 	assert.equal(checkGuess(), true, 'user already guessed');
// });

QUnit.test('test feedback', function(assert){
	secretNumber = 1;
	userGuess = 1;
	generateFeedback();
	assert.equal(userFeedback,"You Won. Click new game to play again","secret number equals userGuess");
	
	secretNumber = 1;
	userGuess = 2;
	generateFeedback();
	assert.equal(userFeedback, 'hot', 'less than 10 equals hot');
	
	secretNumber = 1;
	userGuess = 18;
	generateFeedback();
	assert.equal(userFeedback,' Kinda hot', 'less than 20' );
	
	userGuess = 28;
	generateFeedback();
	assert.equal(userFeedback, 'less than warm', 'less than 30')
	
	userGuess = 50;
	generateFeedback();
	assert.equal(userFeedback,"cold" , 'else')

})

QUnit.test('incriment count', function(assert){
	assert.equal(guessCount(1), 2, 'count intriments');
})














