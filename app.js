/*
7 wide by 6 deep board
2 players (red and blue)
alternating colors (or player turns)
piece falls down to furthest unoccupied slot
game ends when player makes four in a row (horizontal, vertical, diagonal)
game is tie if entire board fills up without winner
*/

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// function makeBoard() {
// TODO: set "board" to empty HEIGHT x WIDTH matrix array
//     for (let i = 0; i < HEIGHT; i++) {
//         let array = [];
//         for (let j = 0; j < WIDTH; j++) {
//             array.push(null)
//         }
//         board.push(array);
//     }
// }

function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById("board");

    // TODO: add comment for this code
    // this code adds id to the tops of each column and listens for a click to add game piece
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    // this code creates the top row of the columns, known as headCell
    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    htmlBoard.append(top); // the new row of 7 cells is appended to the board as the top row

    // TODO: add comment for this code
    // this block creates the rest of the game board, giving each cell a y-x location id
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}


function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add("w3-animate-top");
    piece.classList.add(`p${currPlayer}`);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
    function alertWinner() {
        alert(msg);
    }
    setTimeout(alertWinner, 600);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    board[y][x] = currPlayer;
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (board.every(row => row.every(cell => cell))) {
        return endGame("It's a tie!");
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.
    // loops through array checking combo of 4 cells in each directional way to win
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            // checks to see if any of the ways to win are true
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();
