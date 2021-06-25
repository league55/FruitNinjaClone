//require('./pipe.js');
import initCursor, {Cursor} from "./trail";
import app from "./app";
import initFruitsWave from "./fruits";
import initInterface from "./game_entities/interface";
document.body.appendChild(app.view);

initCursor();
const getFruitWave = initFruitsWave();
const userInterface = initInterface();


function gameLoop(delta) {
    //Update the current game state:
    const {x, y} = Cursor.getPos();
    const fruitWave = getFruitWave();
    fruitWave.tick();
    let collisions = fruitWave.checkCollisions({x, y, height: 1, width: 1});
    userInterface.score += collisions;
    userInterface.tick();
}

//Start the game loop
app.ticker.add(delta => gameLoop(delta));

