const gameboard = (() => {
    let board = [];

    const newBoard = () => {
        board = [];
        const rows = 3;
        const columns = 3;

        for(i = 0; i < rows; i++){
            board.push([]);
            for(j = 0; j < columns; j++){
                board[i].push(i + '-' + j);
            }
        }

        return board;
    }

    const getBoard = () => board;

    return {newBoard, getBoard};
})()

const gameController = (() => {
    const board = gameboard;
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
    }

    // round logic:
    // take player input
    // check if valid
    // store in gameboard array
    // reflect in display
    // check for endgame conditions: tie or winner

    function switchPlayer(player){
        if(player.symbol == 'x') currentPlayer = p2;
        else currentPlayer = p1;
    }
    
    const round = (row, column) => {
        const boardArr = board.getBoard();
        boardArr[row][column] = currentPlayer.symbol;
        switchPlayer(currentPlayer);
    }

    return {
        startGame,
        getCurrentPlayer,
        round,
        getBoard: board.getBoard
    }
})

const gameDisplay = (() => {
    const game = gameController();
    const startBtn = document.querySelector('#start-btn');
    const cellNodeList = document.querySelectorAll('.cell');
    const boardDiv = document.querySelector('#gameboard');


    function displayBoard(){
        const ticTacToeBoard = game.getBoard();
        ticTacToeBoard.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell;
                boardDiv.append(cellButton);
            })
        });  
    }
      

    startBtn.addEventListener("click", () => {
        // run startGame function:
        // choose random player
        // displays player
        // doesn't start round. round is called when cell clicked
        boardDiv.textContent = '';
        game.startGame();
        displayBoard();
    })

    function clickEventHandler(e){
        if(game.getBoard().length == []) return;
        const btnClicked = e.target;
        const cellRow = btnClicked.dataset.row;
        const cellColumn = btnClicked.dataset.column;
        boardDiv.textContent = '';

        game.round(cellRow, cellColumn);
        displayBoard();
    }

    boardDiv.addEventListener('click', clickEventHandler);

})()