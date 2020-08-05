/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;
let isFinished = false;
var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let y = 0; y < HEIGHT; y++) {
        board[y] = new Array();
        for (let x = 0; x < WIDTH; x++) {
            board[y][x] = null;
        }
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    let htmlBoard = document.querySelector("#board");
    // TODO: add comment for this code
    var top = document.createElement("tr"); // create the top row of the board
    top.setAttribute("id", "column-top"); // set its id
    top.addEventListener("click", handleClick); // register a click event to the row
    // create tds and append them to the top row
    for (var x = 0; x < WIDTH; x++) {
        var headCell = document.createElement("td");
        headCell.setAttribute("id", x); // set the id of td to be its index
        top.append(headCell);
    }
    htmlBoard.append(top); //append the top row to board

    // TODO: add comment for this code
    //loop the HEIGHT to create rows that equal to HEIGHT
    for (var y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        //loop each row and create tds that equal to WIDTH
        for (var x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`); //set the id of td to match its two-dimentional index
            row.append(cell); //append each td to a row
        }
        htmlBoard.append(row); //append each row to the board
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let y = 0; y < HEIGHT; y++) {
        if (board[y][x] !== null) {
            if (y === 0) {
                return null;
            }
            return y - 1;
        }
    }
    return HEIGHT - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    if (y >= 0) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.classList.add(`player${currPlayer}`)
        let tableCell = document.querySelector(`td[id="${y}-${x}"]`);
        tableCell.append(piece);
        board[y][x] = currPlayer;
    }
}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
    isFinished = true;
    setTimeout(() => {
        if (msg) {
            alert(msg)
        } else {
            alert("Game Over! It's a tie.")
        }
    }, 700)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    if (isFinished === true) return;
    // get x from ID of clicked cell
    var x = +evt.target.id; //+ make the result a number

    // get next spot in column (if none, ignore click)
    var y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (checkForTie()) {
        return endGame();
    }
    // switch players
    // TODO: switch currPlayer 1 <-> 2
    switchPlayer();
}

function switchPlayer() {
    currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

function checkForTie() {
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (board[y][x] === null) {
                return false;
            }
        }
    }
    return true;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        // check if every element of the four cells are in the board and equals to currPlayer
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

    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            // create 4 elements arrays start from specific coordinate in four directions →↓↘↙
            var horiz = [
                [y, x],
                [y, x + 1],
                [y, x + 2],
                [y, x + 3]
            ];
            var vert = [
                [y, x],
                [y + 1, x],
                [y + 2, x],
                [y + 3, x]
            ];
            var diagDR = [
                [y, x],
                [y + 1, x + 1],
                [y + 2, x + 2],
                [y + 3, x + 3]
            ];
            var diagDL = [
                [y, x],
                [y + 1, x - 1],
                [y + 2, x - 2],
                [y + 3, x - 3]
            ];
            // any true returned from _win would make checkForWin return true  
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();