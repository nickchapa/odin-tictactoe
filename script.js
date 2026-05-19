const gameboard = (() => {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

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

    startBtn.addEventListener("click", () => {
        // run startGame function:
        // choose random player
        // displays player
        // doesn't start round. round is called when cell clicked

        game.startGame();
        const currentPlayer = game.getCurrentPlayer();
        console.log(currentPlayer.name);
        console.log(currentPlayer.symbol);
    })

    function clickEventHandler(e){
        const cell = e.target.getAttribute('id');
        game.round(cell);
        // update display

        // call playRound(userInput);
        // pass in e.target for userInput, playRound will use userInput to run game logic
        // then update the display with new data from gameController
    }

    for(i = 0; i < cellNodeList.length; i++){
        cellNodeList[i].addEventListener('click', clickEventHandler);
    }
})()