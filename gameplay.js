// Tic Tac Toe between two users (no CPU input)

const DIM = 3;
let isOTurn = true;
// empty = 0, o = 1, x = 10
let boardState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function checkSum(sum) {
  if (sum == 3) {
    alert("O wins!\nClick ok to play again");
    resetBoard();
  } else if (sum == 30) {
    alert("X wins!\nClick ok to play again");
    resetBoard();
  }
}

function checkWin() {
  const b = boardState;
  if (!(b[0].includes(0) || b[1].includes(0) || b[2].includes(0))) {
    alert("Draw!\nClick ok to play again");
    resetBoard();
  } else {
    for (let i = 0; i < DIM; i++) {
      let sum = b[0][i] + b[1][i] + b[2][i];
      checkSum(sum);
    }
    // diagonals
    checkSum(b[0][0] + b[1][1] + b[2][2]);
    checkSum(b[0][2] + b[1][1] + b[2][0]);
  }
}

function createBoard(dim = 3) {
  const board = document.getElementById("board");
  for (let i = 0; i < dim; i++) {
    for (let i = 0; i < dim; i++) {
      const space = document.createElement("div");
      space.className = "space";
      const tile = document.createElement("img");
      tile.className = "tile";
      // tile.style.top = space.style.top;
      // tile.style.left = space.style.left;
      space.addEventListener("mouseover", (e) => {
        if (space.childElementCount == 0) {
          tile.src = isOTurn ? "assets/o.png" : "assets/x.png";
          tile.alt = isOTurn ? "O piece" : "X piece";
          tile.style.opacity = 0.5;
          space.appendChild(tile);
        }
      });
      space.addEventListener("mouseleave", (e) => {
        if (space.firstChild.style.opacity != "1") {
          space.removeChild(tile);
        }
      });
      space.addEventListener("click", (e) => {
        const spaceIdx = Array.from(space.parentNode.children).indexOf(space);
        let rowIndex = Math.floor(spaceIdx / DIM);
        let colIndex = spaceIdx % DIM;
        boardState[rowIndex][colIndex] = isOTurn ? 1 : 10;
        isOTurn = !isOTurn;
        tile.style.opacity = 1;
        checkWin();
      });

      board.appendChild(space);
    }
  }
}

createBoard(DIM);

function resetBoard() {
  isOTurn = true;
  boardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const board = document.getElementById("board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  createBoard();
}

document.getElementById("reset-board").addEventListener("click", resetBoard);
