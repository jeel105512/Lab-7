// Each item can either be null (empty), 0 (player 1), and 1(player 2)
const boardState = [
    null, null, null,
    null, null, null,
    null, null, null
];

// The win condition array
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] // [6, 4, 2]
];

// The Active Player
let activePlayer = 0;

// Cells
const cells = document.querySelectorAll("td");

// Add event listners to cells
cells.forEach(function(cell, index){
    cell.dataset.index = index; // *** to set the index

    cell.onmouseover = function(){
        cell.style.background = "#ccc";
        cell.style.transition = "1s";
    }

    cell.onmouseout = function(){
        cell.style.background = "none";
    }

    cell.addEventListener("click", clicked);
});

// Clicked function definition
function clicked(event){
    const index = Number(event.target.dataset.index);
    const letter = activePlayer ? "o" : "x";
    
    const cell = event.target;
    cell.textContent = letter;
    boardState[index] = activePlayer;

    cell.removeEventListener("click", clicked); // to remove the event listner and do not allow user to click it again
    cell.onmouseover = null;

    if(hasWon()){
        window.location = "./winner.html";
    }
    
    if(hasDrawn()){
        window.location = "./draw.html";
    }

    activePlayer = activePlayer ? 0 : 1; // toggle between two plyers
}

// The Win detector
function hasWon(){
    for(const condition of winConditions){ // for of
        const boardValues = condition.map(function(item){
            return boardState[item];
        });

        const playerPieces = boardValues.filter(function(item){
            return item === activePlayer;
        });

        if(playerPieces.length === 3)
        {
            return true;
        }
    }
    return false;
}

function hasDrawn () {
    const boardCapacity = boardState.filter(function (item) {
        return item !== null;
    });
    return boardCapacity.length === boardState.length;
}

const again = document.querySelector("#again");
if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}