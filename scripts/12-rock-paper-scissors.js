// Retrieve Scores from localStorage or initialize it if not present
let Scores = localStorage.getItem('Scores') 
              ? JSON.parse(localStorage.getItem('Scores')) 
              : { Wins: 0, Losses: 0, Ties: 0 };

// Log initial Scores value to verify
// console.log("Initialized Scores from localStorage:", Scores);

// Initial call to display the score
updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// EventListeners
document.querySelector('.js-rock-btn').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-btn').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-btn').addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('Rock');
  } else if (event.key == 'p'){
    playGame('Paper');
  } else if (event.key == 's'){
    playGame('Scissors');
  } else if (event.key == 'a'){
    autoPlay();
  } else if (event.key == 'c'){
    resetScores();
  }
})

function playGame(playerMove) {
  const computermove = pickComputerMove();
  let result = '';
  const Rules = { Rock: ["Scissors", "Paper"], Paper: ["Rock", "Scissors"], Scissors: ["Paper", "Rock"] };
  
  if (playerMove === computermove) {
    result = 'Tie';
  } else if (computermove === Rules[playerMove][0]) {
    result = 'Win';
  } else {
    result = 'Loss';
  }

  // Update Scores based on result
  if (result === 'Win') {
    Scores.Wins += 1;
  } else if (result === 'Loss') {
    Scores.Losses += 1;
  } else if (result === 'Tie') {
    Scores.Ties += 1;
  }

  // Log the updated Scores before storing in localStorage
  // console.log("Scores before storing to localStorage:", Scores);

  // Store the updated Scores back to localStorage
  localStorage.setItem('Scores', JSON.stringify(Scores));

  // Log the stored value in localStorage for comparison
  // console.log("Scores in localStorage after update:", localStorage.getItem('Scores'));

  // Update the display
  updateScoreElement();

  document.querySelector('.js-battle-result').innerHTML = result !== "Tie" ? `You ${result.toLowerCase()}.` : `${result}.`;
  //document.querySelector('.js-battle-message').innerHTML = `You ${playerMove.toLowerCase()} - ${computermove.toLowerCase()} Computer`;
  document.querySelector('.js-battle-message').innerHTML = `
  You <img src="images/${playerMove.toLowerCase()}-emoji.png" class = "move-icon"> <img src="images/${computermove.toLowerCase()}-emoji.png" class = "move-icon"> Computer`;
}

function pickComputerMove() {
  const randomnum = Math.random();
  return randomnum < 1 / 3 ? "Rock" : randomnum < 2 / 3 ? "Paper" : "Scissors";
}

function updateScoreElement() {
  // Display the current score
  document.querySelector('.js-total-result').innerHTML = `Wins: ${Scores.Wins}, Losses: ${Scores.Losses}, Ties: ${Scores.Ties}`;
}

function resetScores() {
  // Reset the Scores object and localStorage
  Scores = { Wins: 0, Losses: 0, Ties: 0 };
  localStorage.setItem('Scores', JSON.stringify(Scores)); // Explicitly store reset values
  // console.log("Scores reset:", Scores); // Debug: Log reset state

  // Update the display
  updateScoreElement();
}