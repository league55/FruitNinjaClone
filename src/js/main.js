import stateManager, {State} from "./stateManager";

require('./pipe.js');
import initCursor, {Cursor} from "./trail";
import app from "./app";
import getFruitWave from "./fruits";
import initInterface from "./game_entities/interface";
import initMenu from "./menu";

initCursor();
initMenu();
const userInterface = initInterface();

function gameLoop(delta) {
    //Update the current game state:
    if (stateManager.state === State.PLAYING) {
        const {x, y} = Cursor.getPos();
        const fruitWave = getFruitWave();
        fruitWave.tick();
        let collisions = fruitWave.checkCollisions({x, y, height: 1, width: 1});
        userInterface.score += collisions;
        userInterface.tick();
    }
}

//Start the game loop
app.ticker.add(delta => gameLoop(delta));

