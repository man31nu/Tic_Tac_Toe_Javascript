const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const resetBtn = document.getElementById('reset-btn');
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');

let currPlayer = "X";
let board = Array(9).fill(null);
let xScore = 0;
let oScore = 0;

cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

resetBtn.addEventListener('click', resetGame);

function handleClick(cell) {
  const id = Number(cell.id);
  if (board[id] !== null || checkWinner()) return;

  board[id] = currPlayer;
  cell.textContent = currPlayer;
  cell.classList.add(currPlayer.toLowerCase());

  if (!checkWinner()) {
    currPlayer = currPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currPlayer;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      [a,b,c].forEach(i => cells[i].classList.add('winner'));

      setTimeout(() => {
        showResult(`Player ${currPlayer} wins!`);
        updateScore(currPlayer);
      }, 300);
      return true;
    }
  }

  if (!board.includes(null)) {
    setTimeout(() => showResult(`It's a draw!`), 300);
    return true;
  }
  return false;
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winner');
  });
  currPlayer = "X";
  currentPlayerDisplay.textContent = currPlayer;
}

function showResult(message) {
  alert(message);
  resetGame();
}

function updateScore(winner) {
  if (winner === 'X') {
    xScore++;
    xScoreDisplay.textContent = xScore;
  } else {
    oScore++;
    oScoreDisplay.textContent = oScore;
  }
}
