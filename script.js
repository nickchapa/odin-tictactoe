const gameboard = (() => {
    const array = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const randVar = 42;

    return {array};
})()

const gameController = (() => {
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

    pickRandomPlayer(p1, p2);

    // round logic:
    // take player input
    // check if valid
    // store in gameboard array
    // reflect in display
    // check for endgame conditions: tie or winner
    
    function round(userInput){
        console.log(userInput);
    }
})

const gameDisplay = (() => {
    const startBtn = document.querySelector('#start-btn');
    const cellNodeList = document.querySelectorAll('.cell');

    startBtn.addEventListener("click", () => {
        // run startGame function:
        // choose random player
        // displays player
        // doesn't start round. round is called when cell clicked
    })

    for(i = 0; i < cellNodeList.length; i++){
        cellNodeList[i].addEventListener('click', (e) => {
            clickedCell = e.target.getAttribute('id');
            console.log(clickedCell);

            // call playRound(userInput);
            // pass in e.target for userInput, playRound will use userInput to run game logic
            // then update the display with new data from gameController
        })
    }
})()