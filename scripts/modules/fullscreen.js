class FullScreen {
  constructor() {
    this.trigger = document.querySelector('.js-fullscreen');

    this.init();
  }

  addListeners() {
    this.trigger.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        this.fullScreen = true;
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });
  }

  init() {
    this.addListeners();
  }
}

export default FullScreen;
