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

    const playersArray = [p1, p2];

    console.log(gameboard.gameboardArray);
    console.log(playersArray);
})()