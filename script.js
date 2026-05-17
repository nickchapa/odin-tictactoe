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
    let isGameOver = false;

    function createPlayer(name, symbol) {

        return {name, symbol}
    }
    
    const p1 = createPlayer("player1", "x");
    const p2 = createPlayer("player2", "o");
    let currentPlayer;

    function pickRandomPlayer(player1, player2) {
        const randNum = Math.round(Math.random());
        console.log(randNum);
        if(randNum == 0) currentPlayer = player1;
        else currentPlayer = player2;
    }

    pickRandomPlayer(p1, p2);
    console.log(currentPlayer);
    //console.log(gameboard[0][1]);

    // round logic:
    // take player input
    // check if valid
    // store in gameboard array
    // reflect in display
    // check for endgame conditions: tie or winner
    function round(player){
        const userInput = prompt("type index to put symbol");

        if(userInput == '1A'  || userInput == '0' && gameboard.array[0][0] == null) gameboard.array[0][0] = player.symbol;
        else if (userInput == '1B' || userInput == '1' && gameboard.array[0][1] == null) gameboard.array[0][1] = player.symbol;
        else if (userInput == '1C' || userInput == '2' && gameboard.array[0][2] == null) gameboard.array[0][2] = player.symbol;
        else if (userInput == '2A' || userInput == '3' && gameboard.array[1][0] == null) gameboard.array[1][0] = player.symbol;
        else if (userInput == '2B' || userInput == '4' && gameboard.array[1][1] == null) gameboard.array[1][1] = player.symbol;
        else if (userInput == '2C' || userInput == '5' && gameboard.array[1][2] == null) gameboard.array[1][2] = player.symbol;
        else if (userInput == '3A' || userInput == '6' && gameboard.array[2][0] == null) gameboard.array[2][0] = player.symbol;
        else if (userInput == '3B' || userInput == '7' && gameboard.array[2][1] == null) gameboard.array[2][1] = player.symbol;
        else if (userInput == '3C' || userInput == '8' && gameboard.array[2][2] == null) gameboard.array[2][2] = player.symbol;
        console.log(player.symbol);
        if(player.name == 'player1') currentPlayer = p2;
        else currentPlayer = p1;

        if (userInput == 'end') isGameOver = true;
        if (userInput == null) isGameOver = true;

        gameDisplay.displayCurrentPlayer(currentPlayer);

        for(i = 0; i < gameDisplay.cellNodeList.length; i++){
            if(userInput == gameDisplay.cellNodeList[i].getAttribute('id')){
                gameDisplay.cellNodeList[i].style.backgroundColor = 'blue';
            }
        }
    }

    while(!isGameOver){

        round(currentPlayer)

        if (!gameboard.array[0].includes(null) &&
        !gameboard.array[1].includes(null) &&
        !gameboard.array[2].includes(null)
        ) isGameOver = true;

    } 
})

const gameDisplay = (() => {
    const body = document.querySelector('body');
    const startBtn = document.querySelector('#start-btn');
    const currentPlayerDisplay = document.createElement('div');

    const cellNodeList = document.querySelectorAll('.cell');

    body.append(currentPlayerDisplay);

    startBtn.addEventListener("click", () => {
        gameController();
    })

    for(i = 0; i < cellNodeList.length; i++){
        cellNodeList[i].addEventListener('click', (e) => {
        console.log(e.target.getAttribute('id'));
    })
    }

    const displayCurrentPlayer = (currentPlayer) => {
        currentPlayerDisplay.textContent = currentPlayer.name;
    }

    return {displayCurrentPlayer, cellNodeList};
})()