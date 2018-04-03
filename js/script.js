// These variables are used in one or more functions
const board = document.querySelector('.board');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const box = document.querySelectorAll('.box');

let attempts = 0; // Used to determine if the game will be tie


// -------------------- Start Page ----------
// This function will create the start page and ask the user to 'Start game'
(function () {
  const div = document.createElement('div');
  const header = document.createElement('header');
  const h1 = document.createElement('h1');
  const a = document.createElement('a');

  div.className = 'screen screen-start';
  div.id = 'start';
  h1.textContent = 'Tic Tac Toe';
  a.href = '#';
  a.className = 'button';
  a.textContent = 'Start game';

  // The div will be placed just after the html body tag
  board.insertAdjacentElement('beforebegin', div);
  div.insertAdjacentElement('afterbegin', header);
  header.insertAdjacentElement('afterbegin', h1);
  header.insertAdjacentElement('beforeend', a);

  // Sets the board game to none-display
  board.style.display = 'none';

  // When clicking the button 'Start Game', the board game will be visible
  a.addEventListener('click', function () {
    div.style.display = 'none';
    board.style.display = 'block';
  })

})();


// -------------------- Result Page ----------

// This function will create the result page and show who the winner is
(function () {
  const div = document.createElement('div');
  const header = document.createElement('header');
  const h1 = document.createElement('h1');
  const p = document.createElement('p');
  const a = document.createElement('a');

  div.className = 'screen screen-win';
  div.id = 'finish';
  h1.textContent = 'Tic Tac Toe';
  p.className = 'message';
  p.textContent = '';
  a.href = '#';
  a.className = 'button';
  a.textContent = 'New Game';

  // The div will be placed just after the first div tag
  board.insertAdjacentElement('beforebegin', div);
  div.insertAdjacentElement('afterbegin', header);
  header.insertAdjacentElement('afterbegin', h1);
  header.insertAdjacentElement('beforeend', p);
  header.insertAdjacentElement('beforeend', a);

  // When clicking the button 'New Game', the board game will be visible
  a.addEventListener('click', function () {
    div.style.display = 'none';
    board.style.display = 'block';
  })

  // Sets the Game Result to none-display
  div.style.display = 'none';

})();

// This function determines which player will win or if the game will be a tie
function gameResult () {
  const box1 = 'box box-filled-1';
  const box2 = 'box box-filled-2';

  // This variable contains the different three-in-a-row patterns that needs to be true
  let playerO = box[0].className === box1 && box[1].className === box1 && box[2].className === box1 // Horisontal
                || box[3].className === box1 && box[4].className === box1 && box[5].className === box1
                || box[6].className === box1 && box[7].className === box1 && box[8].className === box1

                || box[0].className === box1 && box[3].className === box1 && box[6].className === box1 // Vertical
                || box[1].className === box1 && box[4].className === box1 && box[7].className === box1
                || box[2].className === box1 && box[5].className === box1 && box[8].className === box1

                || box[0].className === box1 && box[4].className === box1 && box[8].className === box1 // Diagonal
                || box[2].className === box1 && box[4].className === box1 && box[6].className === box1;

  // This variable contains the different three-in-a-row patterns that needs to be true
  let playerX = box[0].className === box2 && box[1].className === box2 && box[2].className === box2 // Horisontal
                || box[3].className === box2 && box[4].className === box2 && box[5].className === box2
                || box[6].className === box2 && box[7].className === box2 && box[8].className === box2

                || box[0].className === box2 && box[3].className === box2 && box[6].className === box2 // Vertical
                || box[1].className === box2 && box[4].className === box2 && box[7].className === box2
                || box[2].className === box2 && box[5].className === box2 && box[8].className === box2

                || box[0].className === box2 && box[4].className === box2 && box[8].className === box2 // Diagonal
                || box[2].className === box2 && box[4].className === box2 && box[6].className === box2;

  // Condital statement that determines which result page will be visible
  if (playerO) {
    result('screen screen-win screen-win-one', 'Winner');
  } else if (playerX) {
    result('screen screen-win screen-win-two', 'Winner');
  } else if (attempts === 9) {
    result('screen screen-win screen-win-tie', "It's a tie!");
  }

  // Inputs to the Result Page
  // Re-sets the Board Page
  function result (arg1, arg2) {

    const div = document.querySelector('#finish');
    const p = document.querySelector('#finish p');

    board.style.display = 'none'; // Hides the Board Page
    div.style.display = 'block'; // Shows the Result Page

    div.className = arg1;
    p.textContent = arg2;

    // Re-sets all the boxes
    for (let i = 0; i < box.length; i += 1) {
      box[i].className = 'box';
    }

    // Re-sets the game
    attempts = 0;

  }

}


// -------------------- Board Page ----------

// This function will random decide which player will start
(function () {
  // Select a number between 1 and 2
  let randomPlayer = Math.floor((Math.random() * 2) + 1);

  if (randomPlayer === 1) {
    player1.className += ' active';
  } else {
    player2.className += ' active';
  }
})();

// This function will display the player O or X on the board when mouse-over and clicking
// After a player clicks on a box then it will be the other player turn
(function () {
  // Loops through all the box elements
  for (let i = 0; i < box.length; i += 1) {

    // Adds an mouse-over event on the specific [i] box, and show either O or X
    box[i].addEventListener('mouseover', function (event) {
      if (player1.className === 'players active' && event.target.className !== 'box box-filled-1' && event.target.className !== 'box box-filled-2') {
        event.target.style.backgroundImage = 'url(img/o.svg)';
      } else if (player2.className === 'players active' && event.target.className !== 'box box-filled-1' && event.target.className !== 'box box-filled-2') {
        event.target.style.backgroundImage = 'url(img/x.svg)';
      }
    });

    // Adds an mouse-out event, and removes O or X
    box[i].addEventListener('mouseout', function (event) {
      event.target.style.backgroundImage = '';
    });

    // When the user clicks on a box, then a O or X will be fixed on the box
    // Changes players turn
    // Calls gameResult(); and shows the result of the game (winner or tie)
    box[i].addEventListener('click', function (event) {
      if (player1.className === 'players active' && event.target.className === 'box') {
        event.target.className += ' box-filled-1';

        player1.className = 'players';
        player2.className = 'players active';

        attempts += 1;


      } else if (player2.className === 'players active' && event.target.className === 'box') {
        event.target.className += ' box-filled-2';

        player2.className = 'players';
        player1.className = 'players active';

        attempts += 1;
      }

      gameResult();

    });
  }
})();
