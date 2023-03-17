// get references to HTML elements
const game = document.getElementById("game");
const player = document.getElementById("player");

// set up variables
let score = 0;
let playerPosition = 190;
let squares = [];

// listen for arrow key presses
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowLeft" && playerPosition > 0) {
    playerPosition -= 10;
    player.style.left = playerPosition + "px";
  } else if (event.code === "ArrowRight" && playerPosition < 380) {
    playerPosition += 10;
    player.style.left = playerPosition + "px";
  }
});

// generate falling squares every 500ms
setInterval(function() {
  // create a new square
  const square = document.createElement("div");
  square.classList.add("square");
  squares.push(square);
  game.appendChild(square);

  // set the square's position and speed
  const position = Math.floor(Math.random() * 360) + 20;
  square.style.left = Math.floor(Math.random() * 380) + "px";
  square.style.top = position + "px";
  const speed = Math.floor(Math.random() * 4) + 1;
  square.speed = speed;

  // move the squares
  const moveSquares = setInterval(function() {
    // check if the square hits the player
    if (playerPosition < square.offsetLeft + 20 &&
        playerPosition + 20 > square.offsetLeft &&
        580 < square.offsetTop + 20 &&
        600 > square.offsetTop) {
      clearInterval(moveSquares);
      alert("Game over! Score: " + score);
      location.reload();
    }

    // move the square down the screen
    const position = square.offsetTop + square.speed;
    square.style.top = position + "px";

    // remove the square if it hits the bottom of the screen
    if (position > 600) {
      game.removeChild(square);
      squares.splice(squares.indexOf(square), 1);
    }
  }, 20);

  // update the score if the square is avoided
  setInterval(function() {
    if (!squares.includes(square)) {
      score++;
      document.title = "Doge Game - Score: " + score;
    }
  }, 20);
}, 500);
