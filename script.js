const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let cells = Array(9).fill(null);
let currentPlayer = 'X';

function createBoard() {
    cells.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(index));
        board.appendChild(cell);
    });
}

function makeMove(index) {
    if (!cells[index]) {
        cells[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            alert(`${currentPlayer} ชนะ!`);
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            botMove();
        }
    }
}

function botMove() {
    let availableMoves = cells.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (availableMoves.length > 0) {
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        cells[randomMove] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            alert(`${currentPlayer} ชนะ!`);
        }
        currentPlayer = 'X';
    }
}

function updateBoard() {
    const cellElements = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cellElements[index].textContent = cell;
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // แถว
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // คอลัมน์
        [0, 4, 8], [2, 4, 6] // แนวทแยง
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

resetButton.addEventListener('click', () => {
    cells.fill(null);
    currentPlayer = 'X';
    updateBoard();
});

createBoard();