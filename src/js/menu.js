import stateManager, {State} from "./stateManager";

const mainMenu =
    document.getElementsByClassName('main_menu')[0];
const ingameMenu =
    document.getElementsByClassName('ingame_menu')[0];

ingameMenu.style.display = "none";
mainMenu.style.display = "none";

const startBtn =
    document.getElementsByClassName('start_btn')[0];
const pauseBtn =
    document.getElementsByClassName('pause_btn')[0];

export default function initMenu() {
    stateManager.addStateHandler(State.PAUSE, ()=> {
        mainMenu.style.display = "unset";
        ingameMenu.style.display = "none";
    });
    stateManager.addStateHandler(State.PLAYING, ()=> {
        mainMenu.style.display = "none";
        ingameMenu.style.display = "unset";
    });

    startBtn.addEventListener("click", () => {
        stateManager.state = State.PLAYING;
    }, false)

    pauseBtn.addEventListener("click", () => {
        stateManager.state = State.PAUSE;
    }, false);
}