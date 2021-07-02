import * as PIXI from 'pixi.js'
export const shouldUseCamera = true;
export const extraDebug = true;

export const APP_WIDTH = 640;
export const APP_HEIGHT = 480;

const app = new PIXI.Application({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    backgroundColor: 0x1099bb,
    view: document.querySelector('#scene')
});
export default app;