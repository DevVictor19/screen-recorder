class SocketClient {
  constructor() {
    this.socket = io("http://localhost:3000");
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
}

class ScreenRecorder {
  constructor(socketClient) {
    this.socketClient = socketClient;
    this.mediaRecorder = null;
  }

  async start() {
    const mediaStream = await this._startScreenCapture();
    this.mediaRecorder = new MediaRecorder(mediaStream);
    this.mediaRecorder.start(1000);

    this.mediaRecorder.ondataavailable = this._onDataAvailable.bind(this);
  }

  stop() {
    if (!this.mediaRecorder) return;
    this.mediaRecorder.stop();
    this.socketClient.emit("stop");
  }

  pause() {
    if (!this.mediaRecorder) return;
    this.mediaRecorder.pause();
  }

  resume() {
    if (!this.mediaRecorder) return;
    this.mediaRecorder.resume();
  }

  async _onDataAvailable(event) {
    this.socketClient.emit("start", event.data);
  }

  async _startScreenCapture() {
    let captureStream = null;

    const displayMediaOptions = {
      video: {
        displaySurface: "browser",
      },
      audio: {
        suppressLocalAudioPlayback: false,
      },
      preferCurrentTab: false,
      selfBrowserSurface: "exclude",
      systemAudio: "include",
      surfaceSwitching: "include",
      monitorTypeSurfaces: "include",
    };

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
    } catch (err) {
      console.error(`Error: ${err}`);
    }
    return captureStream;
  }
}

const socketClient = new SocketClient();
const screenRecorder = new ScreenRecorder(socketClient);

const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const resumeBtn = document.querySelector("#resume");
const stopBtn = document.querySelector("#stop");

startBtn.addEventListener("click", () => {
  screenRecorder.start();
});
pauseBtn.addEventListener("click", () => {
  screenRecorder.pause();
});
resumeBtn.addEventListener("click", () => {
  screenRecorder.resume();
});
stopBtn.addEventListener("click", () => {
  screenRecorder.stop();
});
