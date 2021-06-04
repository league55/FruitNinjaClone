import * as PIXI from 'pixi.js'
import app from "./app";

// holder to store the fruits
const fruits = [];
const totalDudes = 3;
const g = 0.05;

class Fruit {
    get sprite() {
        return this._sprite;
    }
    set sprite(sprite) {
        this._sprite = sprite;
    }
    constructor() {
        this._sprite = PIXI.Sprite.from('assets/pineapple.png');
        this._velocity = 0;

        // set the anchor point so the texture is centered on the sprite
        this._sprite.anchor.set(0.5);
        // set a random scale for the dude - no point them all being the same size!
        this._sprite.scale.set(0.05 + Math.random() * 0.1);
        // finally lets set the dude to be at a random position..
        this._sprite.x = Math.random() * app.screen.width;
        this._sprite.y = app.screen.height;

        // create some extra properties that will control movement :
        // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
        this._sprite.direction = Math.PI;

        // this number will be used to modify the direction of the dude over time
        //dude.turningSpeed = Math.random() - 0.8;
        this._sprite.turningSpeed = this._sprite.x >= app.screen.width / 2 ? Math.random() * 0.2 + 0.2 : Math.random() * 0.2 - 0.2;

        // create a random speed for the dude between 2 - 4
        this._sprite.speed = 12 + Math.random() * 2;
    }

    tick() {
        this._velocity += Math.sin(Math.PI * 2 + g) * 2;

        this.sprite.direction += this.sprite.turningSpeed * 0.01;
        this.sprite.x += Math.sin(this.sprite.direction) * this.sprite.speed;
        this.sprite.y += Math.cos(this.sprite.direction) * (this.sprite.speed - this._velocity);
        this.sprite.rotation = -this.sprite.direction - Math.PI / 2;
    }
}

const initAliens = () => {
    for (let i = 0; i < totalDudes; i++) {
        const fruit = new Fruit();
        // finally we push the dude into the fruits array so it it can be easily accessed later
        fruits.push(fruit);

        app.stage.addChild(fruit.sprite);
    }
}

const getDropDudesCycle = () => {
// create a bounding box for the little dudes
    const dudeBoundsPadding = 100;
    const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
        -dudeBoundsPadding,
        app.screen.width + dudeBoundsPadding * 2,
        app.screen.height + dudeBoundsPadding * 2);

    return () => {
        // iterate through the dudes and update their position
        for (let i = 0; i < fruits.length; i++) {
            fruits[i].tick();
            if(fruits[i].sprite.y > app.screen.height) {
                fruits[i] = new Fruit();
                app.stage.addChild(fruits[i].sprite);
                fruits[i].tick();
            }

            // wrap the dudes by testing their bounds...
            //if (dude.x < dudeBounds.x) {
            //    dude.x += dudeBounds.width;
            //} else if (dude.x > dudeBounds.x + dudeBounds.width) {
            //    dude.x -= dudeBounds.width;
            //}
//
            //if (dude.y < dudeBounds.y) {
            //    dude.y += dudeBounds.height;
            //} else if (dude.y > dudeBounds.y + dudeBounds.height) {
            //    dude.y -= dudeBounds.height;
            //}
        }
    };
}

export default () => {
    initAliens();
    return getDropDudesCycle();
}