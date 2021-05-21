import initTrail from "./trail";
import play from "./gameLoop";
import app from "./app";
import initAliens from "./fruits";

initTrail();
const state = play;
const dudesCycle = initAliens();

function gameLoop(delta) {
    //Update the current game state:
    state(delta);
    dudesCycle();
}

//Start the game loop
app.ticker.add(delta => gameLoop(delta));

