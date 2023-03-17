// extract highlighted code from README
const readme = `
# My Project

Here's some example code:

\`\`\`javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

console.log(add(2, 3));
console.log(subtract(5, 2));
\`\`\`
`;

const code = readme.match(/```javascript([\s\S]*?)```/)[1].trim();

// split the code into puzzle pieces
const pieces = [];
const numPieces = 4;
const pieceWidth = Math.ceil(code.length / numPieces);
for (let i = 0; i < numPieces; i++) {
  const piece = code.substr(i * pieceWidth, pieceWidth);
  pieces.push(piece);
}

// shuffle the pieces
shuffle(pieces);

// create draggable puzzle pieces in HTML
const game = document.getElementById("game");
for (let i = 0; i < numPieces; i++) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.innerHTML = pieces[i];
  piece.style.top = Math.floor(Math.random() * 300) + "px";
  piece.style.left = Math.floor(Math.random() * 450) + "px";
  game.appendChild(piece);
}

// make the puzzle pieces draggable and the game droppable
$(".piece").draggable({
  containment: "#game",
  snap: ".piece",
  snapMode: "outer",
  snapTolerance: 10,
  start: function(event, ui) {
    $(this).css("z-index", 1);
  },
  stop: function(event, ui) {
    $(this).css("z-index", "auto");
  }
});

$("#game").droppable({
  drop: function(event, ui) {
    const piece = ui.draggable;
    const top = piece.position().top;
    const left = piece.position().left;

    // snap the piece to the grid
    piece.css({
      top: Math.round(top / 100) * 100 + "px",
      left: Math.round(left / 150) * 150 + "px"
    });

    // check if the puzzle is complete
    let complete = true;
    $(".piece").each(function() {
      if ($(this).text() !== $(this).attr("data-piece")) {
        complete = false;
      }
    });
    if (complete) {
      alert("You win!");
      location.reload();
    }
  }
});

// shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
