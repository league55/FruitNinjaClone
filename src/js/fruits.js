import * as PIXI from 'pixi.js'
import app from "./app";
import Wave from "./game_entities/wave";

// holder to store the fruits
let wave;

const startDroppingFruits = () => {
    wave = new Wave();
}

const tick = () => {
// create a bounding box for the little dudes
    const dudeBoundsPadding = 100;
    const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
        -dudeBoundsPadding,
        app.screen.width + dudeBoundsPadding * 2,
        app.screen.height + dudeBoundsPadding * 2);

    return () => {
        // iterate through the dudes and update their position
        wave.tick();
        if(!wave.isActive) {
            wave.clean();
            wave = new Wave();
        }
    };
}

export default () => {
    startDroppingFruits();
    return tick();
}