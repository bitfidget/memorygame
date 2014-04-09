var card1 = '';
var card2 = '';
var counterID = 0;

//Time that increments in the game
var timerStart = function(){
  counter = 0
  counterID = setInterval(function(){
    $('#timer span').text(counter++);
  }, 1000);
};
var timerStop = function(){
  clearInterval(counterID);
}

//arrays with letters in them.
var lettersGenerator = function(total){
  var list = [];
  for (var i = 0; i < total; ++i){
    list.push(String.fromCharCode(i + 65)),
    list.push(String.fromCharCode(i + 65));
  }
  return list
};

// Initializes the game and creates the board
var startGame = function(letters) {
  $('body').css('background', '#FFF')
  $game.html('');
  letters = _.shuffle(letters);
  for (var i = 0; i < letters.length; ++i){
    $game.append('<span id="letter' + i + '"class="unselected">' + letters[i] + '</span>')
  }
  if (counterID != 0){
    timerStop();
  }
  timerStart();
};

// this function represents a 'turn'
var testCard = function(chosen){
  if (card1 == ''){
    card1 = chosen
  } else {
    card2 = chosen
    testMatch(card1, card2)
  };
};
// this function evalutes a 'turn'
var testMatch = function(card1, card2){
  if (card1.html() == card2.html()){
    card1.addClass('matched');
    card2.addClass('matched');
  }else{
    card1.addClass('unselected');
    card2.addClass('unselected');
  };
  if ($('.unselected').length == 0){
    timerStop();
    endGame();
  }
};

// this is called when all letters are matched
var endGame = function(){
  $('body').css({
    background: 'url(http://mediad.publicbroadcasting.net/p/kcur/files/201307/fireworks.jpg) no-repeat',
    'background-size': 'cover'
  });
  alert('well done you finished in ' + counter + 'seconds!');
}

// set up any dom related variables
$(document).ready(function(){
  
  $game = $('#game');

  // set up listeners
  $('#small').on('click', function(){
    var letters = lettersGenerator(5);
    startGame(letters);
  })
  $('#medium').on('click', function(){
    var letters = lettersGenerator(10);
    startGame(letters);
  })
  $('#large').on('click', function(){
    var letters = lettersGenerator(20);
    startGame(letters);
  })

  // the tricky listener that will deal with the actual guessing
  $game.on('click', 'span.unselected', function(){
    // reset the turn if two cards already selected
    if ((card1 != '') && (card2 != '')){
      $('.selected').removeClass('selected');
      card1 = '';
      card2 = '';
    };
    // get the value of chosen card
    var chosen = $(this);
    chosen.addClass('selected');
    chosen.removeClass('unselected');
    testCard(chosen);
  })
});