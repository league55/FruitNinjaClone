import * as PIXI from 'pixi.js'

const loader = (name, cb) => {
    const texture = PIXI.Texture.from(name);
    return new PIXI.Sprite(texture);
}

export default loader;