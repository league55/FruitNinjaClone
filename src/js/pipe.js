// Our input frames will come from here.
import {drawLandmarks, lerp} from '@mediapipe/drawing_utils/drawing_utils';
import {Hands} from '@mediapipe/hands/hands';
import {Camera} from '@mediapipe/camera_utils/camera_utils';
import {ControlPanel, FPS} from '@mediapipe/control_utils/control_utils';
import app, {APP_HEIGHT, APP_WIDTH, extraDebug} from "./app";
import stateManager, {State} from "./stateManager";

const videoElement =
    document.getElementsByClassName('input_video')[0];
const controlsElement =
    document.getElementsByClassName('control-panel')[0];

const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext('2d');

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
// eslint-disable-next-line
export const fpsControl = new FPS();

const noop = () => {
};

let position = {x: 0, y: 0};

export const getLastFingerPosition = () => {
    return position;
}

const setPosition = (results) => {
    if(results && results.multiHandLandmarks) {
        let finger = results.multiHandLandmarks[0][8];
        position = {x: finger.x * app.screen.width, y: finger.y * app.screen.height};
    }
}

function onResults(results) {
  setPosition(results);
  if(!stateManager.state) {
      // Hide the spinner.
      document.body.classList.add('loaded');
      stateManager.state = State.PAUSE;
  }

  // Update the frame rate.
  fpsControl.tick();

  // Draw the overlays.
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if(extraDebug) {
      if (results.multiHandLandmarks && results.multiHandedness) {
          const isRightHand = true;
          const landmarks = [results.multiHandLandmarks[0][8]];
          drawLandmarks(canvasCtx, landmarks, {
              color: isRightHand ? '#00FF00' : '#FF0000',
              fillColor: isRightHand ? '#FF0000' : '#00FF00',
              radius: (x) => {
                  return lerp(x.from.z, -0.4, .01, 1, 0.1);
              }
          });
      }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
  }});
hands.onResults(onResults);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: APP_WIDTH,
  height: APP_HEIGHT
});
camera.start();

// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
  selfieMode: true,
  maxNumHands: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
})
    .add([
      fpsControl
    ])
    .on(options => {
      videoElement.classList.toggle('selfie', options.selfieMode);
      hands.setOptions(options);
    })