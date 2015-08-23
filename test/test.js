
QUnit.test('generate number',function( assert ){
	generateNumber();
	assert.ok(typeof secretNumber === 'number', 'is number');
	assert.ok(secretNumber > 0,'greater than 0');
	assert.ok(secretNumber < 101,'less than 101');

})

QUnit.test("resetVariables", function( assert ) {
	count = 1;
	pastGuesses = ['1','2','3'];
	guessHtml = 'test';
	userGuess = 'test';
	userFeedback = 'hot';
	resetVariables();
	assert.equal(count,0,'count');
	assert.equal(pastGuesses.length,0,'pastGuesses array')
	assert.equal(guessHtml, '','guessHtml');
	assert.equal(userGuess,'','userGuess');
	assert.equal(userFeedback,'Make your Guess!','userFeedback')

});

QUnit.test('generateFeedback',function(assert){
	secretNumber = 1;
	userGuess = 1;
	generateFeedback();
	assert.equal(userFeedback,"You Won. Click new game to play again",'win');
	userGuess = 2;
	generateFeedback();
	assert.equal(userFeedback,'hot','less than 10');
	userGuess = 12;
	generateFeedback();
	assert.equal(userFeedback,' Kinda hot','less than 20');
	userGuess = 22;
	generateFeedback();
	assert.equal(userFeedback,'less than warm','less than 30');
	userGuess = 32;
	generateFeedback();
	assert.equal(userFeedback,"cold",'more than 30');
	
});

QUnit.test('trackGuess',function(assert){
	userGuess = '';
	pastGuesses = [];
	trackGuess()
	assert.equal(guessHtml,'','empty array should have empty guessHtml');
	userGuess = '1';
	pastGuesses = [];
	trackGuess()
	assert.equal(guessHtml,'<li>1</li>','should add item to empty list');
	userGuess = '1';
	pastGuesses = ['2','3'];
	trackGuess()
	assert.equal(guessHtml,'<li>2</li><li>3</li><li>1</li>','should add item to existing list');
})
QUnit.test('guessCount',function(assert){
	count = 0;
	guessCount();
	assert.equal(count,1,'count incriments');
})

QUnit.test('checkGuess',function(assert){
	userGuess = 'n'
	assert.equal(checkGuess(),true,'number returns true');
	userGuess = '-1';
	assert.equal(checkGuess(),true,'number less than 1');
	userGuess = '110';
	assert.equal(checkGuess(),true,'number greater than 100');
	userGuess = '1'
	pastGuesses = ['1','2']
	assert.equal(checkGuess(),true,'user guessed same number');
	userGuess = '3';
	assert.equal(checkGuess(),false,'user guess is valid');
});
