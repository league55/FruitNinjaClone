import initTrail from "./trail";
import play from "./gameLoop";
import app from "./app";
import initFruitsWave from "./fruits";

initTrail();
const state = play;
const getFruitWave = initFruitsWave();

function gameLoop(delta) {
    //Update the current game state:
    const {x, y} = app.renderer.plugins.interaction.mouse.global;
    state(delta);
    const fruitWave = getFruitWave();
    fruitWave.tick();
    fruitWave.checkCollisions({x, y, height: 1, width: 1});
}

//Start the game loop
app.ticker.add(delta => gameLoop(delta));

