import {PianoKeys, FullScreen, Notes} from './modules/index.js';

document.addEventListener('DOMContentLoaded', () => {
  new PianoKeys();
  new FullScreen();
  new Notes();
});
