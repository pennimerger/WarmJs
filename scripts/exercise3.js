
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties:${score.ties}`;
}
updateScoreElement() // Updates <p> query selector

function resultUpdate(results) {
  document.querySelector('.js-result').innerHTML = `${results}`;
}

function gameMoves(player, computer) {
  document.querySelector('.js-moves').innerHTML = `
You
<img src="images/${player}.jpeg" class="move-icon">
<img src="images/${computer}.jpeg" class="move-icon">
Computer`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playermove = pickComputerMove();
      playGame(playermove);
    }, 1000); // auto play every second (1000 ms)
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
}); // play with keyboard.

function playGame(playermove) {
  const computerMove = pickComputerMove();
  let result = '';


  if (playermove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'Lose.';
    } else if (computerMove === 'scissors') {
      result = 'Win.';
    }
  }

  else if (playermove === 'paper') {
    if (computerMove === 'rock') {
      result = 'Win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'Lose.';
    }
  }

  else if (playermove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'Lose.';
    } else if (computerMove === 'paper') {
      result = 'Win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'Win.') {
    resultUpdate(`You ${result}.`)
    score.wins += 1;
  } else if (result === 'Lose.') {
    resultUpdate(`You ${result}.`)
    score.losses += 1;
  } else if (result === 'Tie.') {
    resultUpdate(`${result}.`)
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  // Updates results on page after storing.
  updateScoreElement()
  gameMoves(playermove, computerMove)
}