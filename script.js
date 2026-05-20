const gameboard = (() => {
    const board =[];
    const rows = 3;
    const columns = 3;

    for(i = 0; i < rows; i++){
        board.push([]);
        for(j = 0; j < columns; j++){
            board[i].push(i + '-' + j);
        }
    }

    const getBoard = () => board;

    return {getBoard};
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
        pickRandomPlayer(p1, p2);
    }

    // round logic:
    // take player input
    // check if valid
    // store in gameboard array
    // reflect in display
    // check for endgame conditions: tie or winner
    
    const round = (userInput) => {
        console.log(userInput);
        // run round logic
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

    ticTacToeBoard = game.getBoard();
    console.log(ticTacToeBoard);
    ticTacToeBoard.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            // move this logic to gameboard object
            cell = rowIndex + '-' + columnIndex;

            const cellButton = document.createElement('button');
            cellButton.dataset.cellIndex = cell;
            cellButton.textContent = cell;
            boardDiv.append(cellButton);
        })
    });    

    startBtn.addEventListener("click", () => {
        // run startGame function:
        // choose random player
        // displays player
        // doesn't start round. round is called when cell clicked

        game.startGame();
    })

    function clickEventHandler(e){
        const btnClicked = e.target;
        // update display

        // call playRound(userInput);
        // pass in e.target for userInput, playRound will use userInput to run game logic
        // then update the display with new data from gameController
        game.round(btnClicked);
    }

    boardDiv.addEventListener('click', clickEventHandler);

})()