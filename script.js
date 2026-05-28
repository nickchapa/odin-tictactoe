const gameboard = (() => {
    let board = [];

    const newBoard = () => {
        board = [];
        const rows = 3;
        const columns = 3;

        for(i = 0; i < rows; i++){
            board.push([]);
            for(j = 0; j < columns; j++){
                board[i].push(null);
            }
        }
        return board;
    }

    const getBoard = () => board;

    const loopThroughBoard = (callback) => {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                callback(rowIndex, columnIndex, cell);
            })
        });  
    }

    return {newBoard, getBoard, loopThroughBoard};
})()

const gameController = (() => {
    const board = gameboard;
    let isTie = false;
    let winningPlayer = null;
    function createPlayer(name, symbol) {

        return {name, symbol}
    }
    
    const p1 = createPlayer("player1", "x");
    const p2 = createPlayer("player2", "o");
    const playerArr = [p1, p2];
    let currentPlayer;

    const getPlayers = () => playerArr;

    function pickRandomPlayer(player1, player2) {
        const randNum = Math.round(Math.random());
        if(randNum == 0) currentPlayer = player1;
        else currentPlayer = player2;
    }

    const getCurrentPlayer = () => currentPlayer;
    const startGame = () => {
        board.newBoard();
        pickRandomPlayer(p1, p2);
        isTie = false;
        winningPlayer = null;
    }
    // check for endgame conditions: tie or winner
    function checkForGameOver(){
        const gameboardArr = board.getBoard();

        // check for winner
        // then check for tie

        // function checkForWinner
        // if winner found:
        // set winner variable to winning player object
        // return (exit function)
        function checkForWinner(){
            // winning conditions:
            // rows
            function rowCheck(){
                for(const [index, row] of gameboardArr.entries()){
                    if(row.includes(null)) continue;
                    if(row[0] == row[1] && row[1] == row[2]){
                        console.log(`found three in a row in row ${index}`);
                        if(row[0] == p1.symbol) return p1;
                        else if(row[0] == p2.symbol) return p2;
                    }
                }
            }

            function columnCheck(){
                for(let column = 0; column < gameboardArr[0].length; column++){
                    let prev = null;
                    let columnEquality = false;

                    for(let row = 0; row < gameboardArr.length; row++){
                        const current = gameboardArr[row][column];
                        if(current == null) {
                            columnEquality = false;
                            break;
                        };
                        if(prev == null || prev == current) columnEquality = true;
                        else {
                            columnEquality = false;
                            break;
                        }
                        prev = current;
                    }
                    if(columnEquality == true){
                        console.log(`three in a row in column ${column}`);
                        if(prev == p1.symbol) return p1;
                        else if (prev == p2.symbol) return p2;
                    };

                    columnEquality = false;
                }
            }

            function diagonalCheck(){
                if(gameboardArr[0][0] != null &&
                    gameboardArr[0][0] == gameboardArr[1][1] &&
                    gameboardArr[1][1] == gameboardArr[2][2]
                ){
                    if(gameboardArr[1][1] == p1.symbol) return p1;
                    else return p2;
                    console.log(`top-left to bottom-right diagonal win`);
                }
                if(gameboardArr[0][2] != null &&
                    gameboardArr[0][2] == gameboardArr[1][1] &&
                    gameboardArr[1][1] == gameboardArr[2][0]
                ){
                    if(gameboardArr[1][1] == p1.symbol) return p1;
                    else return p2;
                    console.log(`top-right to bottom-left diagonal win`);
                }
            }

            const rowWin = rowCheck();
            const columnWin = columnCheck();
            const diagonalWin = diagonalCheck();

            if(rowWin) winningPlayer = rowWin;
            else if(columnWin) winningPlayer = columnWin;
            else if(diagonalWin) winningPlayer = diagonalWin;

            // columns

            //diagonal

        }

        function checkForTie(){
            for(row of gameboardArr){
                for(cell of row){
                    if(cell === null) return;
                }
            }
            console.log('no null found, game tied');
            isTie = true;
        }

        // problem: if winner found, need to exit checkForGameOver
        // otherwise, checkForTie() will run
        // maybe if checkForWinner returns false, then run checkForTie
        checkForWinner();
        checkForTie();
    }

    function switchPlayer(player){
        if(player.symbol == 'x') currentPlayer = p2;
        else currentPlayer = p1;
    }
    
    const round = (row, column) => {
        const boardArr = board.getBoard();
        if(boardArr[row][column]) return;
        boardArr[row][column] = currentPlayer.symbol;
        switchPlayer(currentPlayer);
        checkForGameOver();
    }

    const getIsTie = () => isTie;
    const getWinner = () => winningPlayer;

    return {
        startGame,
        getPlayers,
        getCurrentPlayer,
        round,
        getBoard: board.getBoard,
        getIsTie,
        getWinner,
    }
})

const gameDisplay = (() => {
    const game = gameController();
    const startBtn = document.querySelector('#start-btn');
    const cellNodeList = document.querySelectorAll('.cell');
    const gameInfoDiv = document.querySelector('#game-info');
    const boardDiv = document.querySelector('#gameboard');
    const currentPlayerDiv = document.createElement('div');

    function displayBoard(){
        const createDisplayCells = (rowIndex, columnIndex, cell) => {
            const cellButton = document.createElement('button');
            cellButton.dataset.row = rowIndex;
            cellButton.dataset.column = columnIndex;
            if(cell === null) cellButton.textContent = '-';
            else cellButton.textContent = cell;
            boardDiv.append(cellButton);
        }

        gameboard.loopThroughBoard(createDisplayCells);
    }

    function displayPlayers(){
        const p1 = game.getPlayers()[0];
        const p2 = game.getPlayers()[1];
        const currentPlayer = game.getCurrentPlayer();
        const p1Display = document.createElement('p');
        const p2Display = document.createElement('p');

        p1Display.textContent = `${p1.name}, ${p1.symbol}`;
        p2Display.textContent = `${p2.name}, ${p2.symbol}`;

        if(currentPlayer == p1){
            p1Display.style.color = 'red';
        }
        else p2Display.style.color = 'red';
        
        gameInfoDiv.append(p1Display);
        gameInfoDiv.append(p2Display);
    }

    function displayGameOver(){
        // create div that displays result
        // if Winner
        if(game.getWinner()) console.log(game.getWinner().name);

        // if Tie
        if(game.getIsTie()){
            console.log('game tied');
            const body = document.querySelector('body');
            const resultDiv = document.createElement('div');
            resultDiv.textContent = 'game tied';
            body.append(resultDiv);
        }
    }

    startBtn.addEventListener("click", () => {
        gameInfoDiv.textContent = '';
        boardDiv.textContent = '';
        game.startGame();
        displayBoard();
        displayPlayers();
    })

    function clickEventHandler(e){
        if(game.getBoard().length == []) return;
        const btnClicked = e.target;
        const cellRow = btnClicked.dataset.row;
        const cellColumn = btnClicked.dataset.column;
        gameInfoDiv.textContent = '';
        boardDiv.textContent = '';

        game.round(cellRow, cellColumn);
        displayBoard();
        displayPlayers();
        displayGameOver();
    }

    boardDiv.addEventListener('click', clickEventHandler);

})()