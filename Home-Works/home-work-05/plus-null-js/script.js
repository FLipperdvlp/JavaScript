const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turn");
const resetBtn = document.querySelector(".reset");

let currentPlayer = "X";
let board = Array(9).fill("");
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],            
];

function handleCellClick(e) {
  const index = Array.from(cells).indexOf(e.target);

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    turnText.textContent = `Гравець ${currentPlayer} переміг! 🎉`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    turnText.textContent = "Нічия! 🤝";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnText.textContent = `Хід гравця ${currentPlayer}`;
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill("");
  isGameActive = true;
  currentPlayer = "X";
  turnText.textContent = `Хід гравця ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);