const gameboard = (() => {
    const gameboardArray = [1, 2, 3];
    const randVar = 42;

    return {gameboardArray};
})()

function createPlayer(name, symbol) {

    return {name, symbol}
}

const gameController = (() => {
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
})()