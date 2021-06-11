import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
    width: 480,
    height: 640,
    backgroundColor: 0x1099bb,
    view: document.querySelector('#scene'),
    resolution: window.devicePixelRatio || 1
});
export default app;