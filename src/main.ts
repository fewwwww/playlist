import * as THREE from 'three';
import acid from './audio/acid.mp3';
import car from './audio/car.mp3';
import down from './audio/down.mp3';
import f from './audio/f.mp3';
import feel from './audio/feel.mp3';
import girl from './audio/girl.mp3';
import gonsa from './audio/gonsa.mp3';
import i from './audio/i.mp3';
import iff from './audio/iff.mp3';
import jean from './audio/jean.mp3';
import know from './audio/know.mp3';
import love from './audio/love.mp3';
import must from './audio/must.mp3';
import night from './audio/night.mp3';
import north from './audio/north.mp3';
import one from './audio/one.mp3';
import oui from './audio/oui.mp3';
import pull from './audio/pull.mp3';
import rain from './audio/rain.mp3';
import real from './audio/real.mp3';
import shrink from './audio/shrink.mp3';
import sick from './audio/sick.mp3';
import summer from './audio/summer.mp3';
import text from './audio/text.mp3';
import troop from './audio/troop.mp3';
import tweak from './audio/tweak.mp3';
import walk from './audio/walk.mp3';
import withh from './audio/withh.mp3';

// data model
let model = {
  activeView: 1,
  pointerPosition: new THREE.Vector2(0, 0),
  // all the audio music files
  audioSrc: [
    acid,
    car,
    down,
    f,
    feel,
    girl,
    gonsa,
    i,
    iff,
    jean,
    know,
    love,
    must,
    night,
    north,
    one,
    oui,
    pull,
    rain,
    real,
    shrink,
    sick,
    summer,
    text,
    troop,
    tweak,
    walk,
    withh,
    gonsa
  ],
};

// DOM
const playDOM = document.getElementById('play');
const audioDOM = document.getElementsByTagName('audio')[0];
const htmlDOM = document.getElementsByTagName('html')[0];

let renderer: THREE.WebGLRenderer;

// landing view
let viewOne: ViewOne;
// main view
let viewTwo: ViewTwo;

// all the views
let views: BaseView[] = [];

import { ViewOne } from './view/ViewOne';
import { BaseView } from './view/BaseView';
import { ViewTwo } from './view/ViewTwo';

function main() {
  initPlay();
  initScene();
  initListeners();
}

// initiate player
function initPlay() {
  if (playDOM) {
    // invert the color of the whole page
    playDOM.onmouseover = function () {
      htmlDOM.style.filter = 'invert(1)';
    };
    // invert the color of the whole page, for mobile...
    playDOM.ontouchstart = function () {
      htmlDOM.style.filter = 'invert(1)';
    };
    // get back the color of the page
    playDOM.onmouseleave = function () {
      htmlDOM.style.filter = '';
    };
    // initiate the audio on clicking, hide the play button, change active view
    playDOM.onclick = function (event: any) {
      audioDOM.src =
        model.audioSrc[Math.floor(Math.random() * model.audioSrc.length)];
      audioDOM.load();
      audioDOM.play();
      audioDOM.style.display = 'none';
      playDOM.style.display = 'none';
      model.activeView = (model.activeView + 1) % views.length;
      // make camera not jumping
      onPointerMove(event);
      // for mobile
      htmlDOM.style.filter = '';
    };
  }
}

// initiate the scene, assemble the views
function initScene() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // viewOne
  viewOne = new ViewOne(model, renderer);
  views.push(viewOne);

  // viewTwo
  viewTwo = new ViewTwo(model, renderer);
  views.push(viewTwo);

  animate();
}

function initListeners() {
  window.addEventListener('resize', onWindowResize, false);

  window.addEventListener('pointermove', onPointerMove);
}

function onWindowResize() {
  viewOne.onWindowResize();
  viewTwo.onWindowResize();
}

function onPointerMove(event: any) {
  // move camera along with the pointer position
  model.pointerPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  model.pointerPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  views[model.activeView].camera.position.x = model.pointerPosition.x / 2;
  views[model.activeView].camera.position.y = model.pointerPosition.y / 2;
}

function animate() {
  requestAnimationFrame(() => {
    animate();
  });

  // switch view when updating the model
  switch (model.activeView) {
    case 0:
      viewOne.update();
      break;

    case 1:
      viewTwo.update();
      break;

    default:
      break;
  }

  renderer.render(
    views[model.activeView].scene,
    views[model.activeView].camera,
  );
}

main();
