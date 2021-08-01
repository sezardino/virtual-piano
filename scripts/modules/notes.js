import { CLASSES, TYPE } from "../utils/const.js";

class Notes {
  constructor() {
    this.type = TYPE.NOTES;
    this.buttonsWrapper = document.querySelector(CLASSES.BTN_WRAPPER);
    this.buttons = this.buttonsWrapper.querySelectorAll("button");
    this.pianoKeys = document.querySelectorAll(".piano-key");

    this.buttonWrapperHandler = this.buttonWrapperHandler.bind(this);

    this._init();
  }

  changeType(newType) {
    this.type = newType;
    this.pianoKeys.forEach((item) => {
      if (this.type === TYPE.NOTES) {
        item.classList.remove(CLASSES.LETTERS);
      } else {
        item.classList.add(CLASSES.LETTERS);
      }
    });
    this.buttons.forEach((item) => {
      item.classList.remove(CLASSES.BTN_ACTIVE);
      if (item.textContent === this.type) {
        item.classList.add(CLASSES.BTN_ACTIVE);
      }
    });
  }

  buttonWrapperHandler(evt) {
    const target = evt.target;
    if (
      target.classList.contains(CLASSES.BTN) &&
      !target.classList.contains(CLASSES.BTN_ACTIVE)
    ) {
      target.classList.add(CLASSES.BTN_ACTIVE);
      this.changeType(target.textContent);
    }
  }

  addListeners() {
    this.buttonsWrapper.addEventListener("click", this.buttonWrapperHandler);
  }

  _init() {
    this.addListeners();
  }
}

export default Notes;
