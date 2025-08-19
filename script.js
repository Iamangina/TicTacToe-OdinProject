const newPlayer = function(playerName, symbol){
        return{
            playerName : playerName,
            symbol : symbol
        }
}

const X = newPlayer("X", "X");
const O = newPlayer("O", "O");


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

function makeMove(index){
    if(Gameboard.setCell(index, currentPlayer.symbol)){
        currentPlayer = currentPlayer === X ? O : X;
    }
}

Gameboard.initBoard();


makeMove(0);
makeMove(3);
makeMove(6);
makeMove(4);
makeMove(2);
makeMove(5);

 if(Gameboard.checkWin(X.symbol)){
    console.log("X win!");
    }
    else if(Gameboard.checkWin(O.symbol)){
        console.log("O win!")
    }

console.log(Gameboard.board)