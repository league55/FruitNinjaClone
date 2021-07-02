
export const State = {
    PAUSE: "PAUSE",
    PLAYING: "PLAYING"
}

class StateManager {
    constructor() {
        this._stateHandlers = {};
        Object.keys(State).forEach(key => {
            this._stateHandlers[key] = [];
        });
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
        this._stateHandlers[state].forEach(handler => handler());
    }

    addStateHandler(state, handler) {
        this._stateHandlers[state].push(handler);
    }
}

const stateManager = new StateManager();
export default stateManager;