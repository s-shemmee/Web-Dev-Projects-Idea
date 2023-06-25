// Selecting the options and initializing player and computer scores
const options = document.querySelectorAll(".options");
let pScore = 0;
let cScore = 0;

// Event listener for each option
options.forEach((option) => {
  option.addEventListener("click", function () {
    const pInput = this.value; // Get the player's input

    const cOptions = ["Rock", "Paper", "Scissors"];
    const cInput = cOptions[Math.floor(Math.random() * 3)]; // Generate a random computer input
    
    updateMoves(pInput, cInput); // Update the moves displayed on the screen
    compareInputs(pInput, cInput); // Compare the inputs and determine the winner
    updateScore(); // Update the scores displayed on the screen

    if (checkWinner()) {
      pScore = cScore = 0; // Reset the scores if there is a winner
      updateScore(); // Update the scores displayed on the screen
    }
  });
});

// Function to update the moves displayed on the screen
function updateMoves(pInput, cInput) {
  document.getElementById("p-move").src = `${pInput}.png`; // Update the player's move image
  document.getElementById("c-move").src = `${cInput}.png`; // Update the computer's move image
}

// Function to compare the inputs and determine the winner
function compareInputs(pInput, cInput) {
  const currentMatch = `${pInput} vs ${cInput}`;

  if (pInput === cInput) {
    alert(`${currentMatch} is a Tie`); // Display a tie message
    return;
  }

  if (pInput === "Rock") {
    if (cInput === "Scissors") {
      alert(`${currentMatch} = You Win`); // Display a message for player win
      pScore++; // Increase player's score
    } else {
      alert(`${currentMatch} = Computer Wins`); // Display a message for computer win
      cScore++; // Increase computer's score
    }
  }
  // Check for Paper
  else if (pInput === "Paper") {
    if (cInput === "Rock") {
      alert(`${currentMatch} = You Win`); // Display a message for player win
      pScore++; // Increase player's score
    } else {
      alert(`${currentMatch} = Computer Wins`); // Display a message for computer win
      cScore++; // Increase computer's score
    }
  }
  // Check for Scissors
  else {
    if (cInput === "Paper") {
      alert(`${currentMatch} = You Win`); // Display a message for player win
      pScore++; // Increase player's score
    } else {
      alert(`${currentMatch} = Computer Wins`); // Display a message for computer win
      cScore++; // Increase computer's score
    }
  }
}

// Function to update the scores displayed on the screen
function updateScore() {
  document.getElementById("p-score").textContent = pScore; // Update player's score
  document.getElementById("c-score").textContent = cScore; // Update computer's score
}

// Function to check for a winner
function checkWinner() {
  if (pScore === 5 || cScore === 5) {
    const winner =
      pScore === 5
        ? "You win the game! Congratulations!"
        : "Computer wins the game! Try again next time!";
    alert(winner); // Display the winner message
    return true; // Return true if there is a winner
  }
  return false; // Return false if there is no winner yet
}
