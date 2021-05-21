import spriteLoader from "./assetsLoader";
import app from "./app";

const bunny = spriteLoader("assets/bunny.png")
bunny.anchor.set(0.5);
bunny.x = 160
bunny.y = 160
app.stage.addChild(bunny);

document.body.appendChild(app.view);
const cat = spriteLoader("assets/cat.png")
app.stage.addChild(cat);

export default function play(delta = 1){
    bunny.rotation -= 0.01 * delta;
    cat.x += 1 + delta;
}