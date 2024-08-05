// script.js
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);

function handleClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.id.split("-")[1]);

    if (board[cellIndex] !== "" || checkWin()) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else {
        setTimeout(() => alert("It's a draw!"), 100);
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill("");
    currentPlayer = "X";
    cells.forEach(cell => (cell.textContent = ""));
}
