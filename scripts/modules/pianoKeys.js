import { CLASSES, TRIGGERS_KEYS } from "../utils/const.js";

class PianoKeys {
  constructor() {
    this.play = false;
    this.container = document.querySelector(".piano");
    this.keys = Array.from(document.querySelectorAll("." + CLASSES.KEY));
    this.audio = document.querySelector("audio");
    this.mousemoveActiveKey;

    this.containerMousedownHandler = this.containerMousedownHandler.bind(this);
    this.windowKeyHandler = this.windowKeyHandler.bind(this);
    this.documentMousemoveHandler = this.documentMousemoveHandler.bind(this);
    this.documentMouseupHandler = this.documentMouseupHandler.bind(this);

    this.init();
  }

  playAudio(item) {
    item.classList.add("piano-key-active");

    this.audio.src = `/assets/audio/${item.dataset.note}.mp3`;
    this.audio.currentTime = 0;
    this.audio.play();
    setTimeout(() => item.classList.remove("piano-key-active"), 400);
  }

  documentMousemoveHandler(evt) {
    const target = evt.target;
    if (target.classList.contains(CLASSES.KEY)) {
      if (this.mousemoveActiveKey !== target) {
        this.mousemoveActiveKey = target;
        this.playAudio(target);
      }
    }
  }

  documentMouseupHandler(evt) {
    const target = evt.target;
    if (target.classList.contains(CLASSES.KEY)) {
      this.playAudio(target);
    }

    document.removeEventListener("mousemove", this.documentMousemoveHandler);
  }

  containerMousedownHandler() {
    document.addEventListener("mousemove", this.documentMousemoveHandler);
    document.addEventListener("mouseup", this.documentMouseupHandler);
  }

  windowKeydownHandler(evt) {
    const key = evt.key.toUpperCase();
    if (TRIGGERS_KEYS.some((item) => item === key)) {
      this.keys.map((item) => {
        if (item.dataset.letter === key) {
          this.playAudio(item);
        }
      });
    }
  }

  windowKeyHandler(evt) {
    const key = evt.key.toUpperCase();
    if (TRIGGERS_KEYS.some((item) => item === key)) {
      this.keys.map((item) => {
        if (item.dataset.letter === key) {
          if (evt.type === "keydown") {
            if (this.play === false) {
              this.play = true;
              this.playAudio(item);
            }
          } else {
            this.play = false;
          }
        }
      });
    }
  }

  addEventListeners() {
    this.container.addEventListener(
      "mousedown",
      this.containerMousedownHandler
    );
    window.addEventListener("keydown", this.windowKeyHandler);
    window.addEventListener("keyup", this.windowKeyHandler);
  }

  init() {
    this.addEventListeners();
  }
}

export default PianoKeys;
