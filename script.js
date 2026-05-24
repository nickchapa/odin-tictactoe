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
    function createPlayer(name, symbol) {

        return {name, symbol}
    }
    
    const p1 = createPlayer("player1", "x");
    const p2 = createPlayer("player2", "o");
    let currentPlayer;

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
                for(row of gameboardArr){
                    if(row.includes(null)) continue;
                    if(row[0] == row[1] && row[1] == row[2]){
                        console.log(`found three in a row in row ${row}`);
                        if(row[0] == p1.symbol) console.log('p1 wins');
                        else if(row[0] == p2.symbol) console.log('p2 wins');
                    }
                }
            }

            function columnCheck(){
                for(let column = 0; column < gameboardArr[0].length; column++){
                    let prev = null;
                    let columnEquality = false;

                    for(row of gameboardArr){
                        const current = row[column];
                        if(current == null) {
                            columnEquality = false;
                            break;
                        };
                        if(current == prev) columnEquality = true;
                        else columnEquality = false;
                        
                        prev = current;
                    }
                    if(columnEquality == true){
                        console.log(`three in a row in column ${column}`);
                        if(prev == p1.symbol) console.log('p1 wins');
                        else if (prev == p2.symbol) console.log('p2 wins');
                        return;
                    };

                    columnEquality = false;
                }
            }
            rowCheck();
            columnCheck();

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
        console.log(isTie);
    }

    const getIsTie = () => isTie;

    return {
        startGame,
        getCurrentPlayer,
        round,
        getBoard: board.getBoard,
        getIsTie,
    }
})

const gameDisplay = (() => {
    const game = gameController();
    const startBtn = document.querySelector('#start-btn');
    const cellNodeList = document.querySelectorAll('.cell');
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

    function displayCurrentPlayer(){
        const currentPlayer = game.getCurrentPlayer();
        currentPlayerDiv.textContent = currentPlayer.name + ' ' + currentPlayer.symbol;
        startBtn.after(currentPlayerDiv);
    }

    function displayGameOver(){
        // create div that displays result
        // if Winner

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
        boardDiv.textContent = '';
        game.startGame();
        displayBoard();
        displayCurrentPlayer();
    })

    function clickEventHandler(e){
        if(game.getBoard().length == []) return;
        const btnClicked = e.target;
        const cellRow = btnClicked.dataset.row;
        const cellColumn = btnClicked.dataset.column;
        boardDiv.textContent = '';

        game.round(cellRow, cellColumn);
        displayBoard();
        displayCurrentPlayer();
        displayGameOver();
    }

    boardDiv.addEventListener('click', clickEventHandler);

})()