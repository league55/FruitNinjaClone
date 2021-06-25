import * as PIXI from 'pixi.js'
export const shouldUseCamera = false;

const app = new PIXI.Application({
    width: 1280,
    height: 720,
    backgroundColor: 0x1099bb,
    view: document.querySelector('#scene'),
    resolution: window.devicePixelRatio || 1
});
export default app;