import Fruit from "./fruit";
import app from "../app";

export default class Wave {
    
    constructor() {
        this._waveSize = Math.random() * 5 + 1;
        this._active = this._waveSize;
        this._fruits = [];

        for (let i = 0; i < this._waveSize; i++) {
            const fruit = new Fruit();
            this._fruits.push(fruit);
            app.stage.addChild(fruit.sprite);
        }
    }
    
    tick() {
        for (let i = 0; i < this._fruits.length; i++) {
            this._fruits[i].tick();
            if (this._fruits[i].sprite.y > app.screen.height) {
                this._active--;
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
    }

    clean() {
        for (let i = 0; i < this._fruits.length; i++) {
            app.stage.removeChild(this._fruits[i].sprite); //is .sprite.visible = false is more efficient?
        }
    }
    
    get fruits() {
        return this._fruits;
    }

    get isActive() {
        return this._active > 0
    }
}