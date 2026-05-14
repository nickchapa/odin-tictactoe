const gameboard = (() => {
    const array = [
        ['1A', '1B', '1C'],
        ['2A', '2B', '2C'],
        ['3A', '3B', '3C']
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
        if(userInput == '1A') gameboard.array[0][0] = player.symbol;
        console.log(player.symbol);
        if(player.name == 'player1') currentPlayer = p2;
        else currentPlayer = p1;
    }

    round(currentPlayer);
    console.log(gameboard.array);
    round(currentPlayer);
    console.log(gameboard.array);
})()