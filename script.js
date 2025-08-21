const Game = (function(){

const form = document.querySelector(".form");
const inputX = document.querySelector("#inputX");
const inputO = document.querySelector("#inputO");
const playerX = document.querySelector(".player1");
const playerO = document.querySelector(".player2");
const btnStart = document.querySelector(".btnStart");
const gamebox = document.querySelector(".gamebox");


btnStart.addEventListener("click", function(){
    let playerXname = inputX.value;
    let playerOname = inputO.value;
    if (inputX.value === ""){
        inputX.value = "Player X";
    }else{
    playerX.textContent = playerXname + ":";
    }
    if (inputO.value === ""){
        inputO.value = "Player O";
    }else{
    playerO.textContent = playerOname + ":";
    }
    form.style.display = "none";
    gamebox.style.display = "flex";
})



const newPlayer = function(playerName, symbol, color){
        return{
            playerName : playerName,
            symbol : symbol,
            color : color
        }
};

const X = newPlayer("X", "X", "rgb(158, 210, 235)");
const O = newPlayer("O", "O", "rgb(243, 158, 132)");


const Gameboard = {
    board : [],
    
    initBoard(){
        for (let i = 0; i<9; i++){
            this.board.push("");
        }},

    setCell(index, symbol){
        if(this.board[index]===""){
            this.board[index] = symbol;
            return true;
        }
        return false;
    },

    winningCombinations : [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    
checkWin(symbol) {
    return this.winningCombinations.some(combination => 
        combination.every(index => this.board[index] === symbol)
    )},
};

let currentPlayer = X;

const newRound = document.querySelector(".newRound");
const resetBtn = document.querySelector(".reset");
const boardDiv = document.querySelector("#board");

let srcX = 0;
let srcO = 0;

function renderGameboard(){
    const scoreX = document.querySelector(".scoreX");
    const scoreO = document.querySelector(".scoreO");

        Gameboard.board.forEach((cell, index)=>{
            const cellDiv = document.createElement('div');
            cellDiv.classList.add("cell");
            cellDiv.textContent = cell;
            
            cellDiv.addEventListener("click", function(){
                function makeMove(index){
                if(Gameboard.setCell(index, currentPlayer.symbol)){
                    cellDiv.textContent = currentPlayer.symbol;
                    cellDiv.style.color = currentPlayer.color;
                    currentPlayer = currentPlayer === X ? O : X;
                }
                } makeMove(index);
                
                function disableBoard(){
                    const cells = document.querySelectorAll(".cell");
                    cells.forEach(cell => {
                        cell.replaceWith(cell.cloneNode(true));
                    });
                }

                function checkWinner(){
                    if(Gameboard.checkWin(X.symbol)){
                        console.log("X win!");
                        srcX++;
                        scoreX.textContent = `${srcX}`;
                        disableBoard();
                    }
                    else if(Gameboard.checkWin(O.symbol)){
                        console.log("O win!");
                        srcO++;
                        scoreO.textContent = `${srcO}`;
                       disableBoard();
                    };
                }; checkWinner();  
        });
        boardDiv.appendChild(cellDiv);       
    }); 
    resetBtn.addEventListener("click", function(){
    boardDiv.innerHTML = "";
    Gameboard.board = [];
    Gameboard.initBoard();
    renderGameboard();
    scoreO.textContent = "0";
    scoreX.textContent = "0";
    console.log(Gameboard.board)
})
};
Gameboard.initBoard();
renderGameboard();

newRound.addEventListener("click", function(){
    boardDiv.innerHTML = "";
    Gameboard.board = [];
    Gameboard.initBoard();
    renderGameboard();
    console.log(Gameboard.board)
})

console.log(Gameboard.board)


})();