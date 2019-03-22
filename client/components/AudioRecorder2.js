import React, { Component } from "react";
let audioCtx;
let canvasCtx;
let constraints;
let chunks;
let mediaRecorder;
let canvas;
let soundClips;

export default class AudioRecorder extends Component {
  constructor() {
    super();
    this.state = {
      recordDisabled: false,
      stopDisabled: true,
      recordingColor: "blue"
    };
    this.onRecord = this.onRecord.bind(this);
    this.onStop = this.onStop.bind(this);
    this.Setup = this.Setup.bind(this);
    this.visualize = this.visualize.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.startRecording = this.startRecording.bind(this);
  }

  componentDidMount() {
    canvas = document.querySelector(".visualizer");
  }

  startRecording() {
    console.log("onRecord");
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    this.setState({
      recordDisabled: true,
      stopDisabled: false,
      recordingColor: "red"
    });
  }

  onRecord() {
    let p = this.Setup();
    if (p) {
      p.then(this.onSuccess)
        .then(this.startRecording)
        .catch(err => {
          console.log("The following error occured: " + err);
        });
    } else {
      this.startRecording();
    }
  }

  onStop() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    this.setState({
      recordDisabled: false,
      stopDisabled: true,
      recordingColor: "blue"
    });
  }

  onSuccess(stream) {
    console.log("$$$$$$$");
    mediaRecorder = new MediaRecorder(stream);

    this.visualize(stream);

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      var clipName = prompt(
        "Enter a name for your sound clip?",
        "My unnamed clip"
      );
      console.log(clipName);
      var clipContainer = document.createElement("article");
      var clipLabel = document.createElement("p");
      var audio = document.createElement("audio");
      var deleteButton = document.createElement("button");

      clipContainer.classList.add("clip");
      audio.setAttribute("controls", "");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";

      if (clipName === null) {
        clipLabel.textContent = "My unnamed clip";
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips = document.querySelector(".sound-clips");
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      console.log(audioURL, "audioUrl");
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      };

      clipLabel.onclick = function() {
        var existingName = clipLabel.textContent;
        var newClipName = prompt("Enter a new name for your sound clip?");
        if (newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      };
    };

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  }

  Setup() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || webkitAudioContext)();
      canvasCtx = canvas.getContext("2d");
      if (navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");

        constraints = { audio: true };
        chunks = [];

        console.log("!!!!!!!!");
        return navigator.mediaDevices.getUserMedia(constraints);
      } else {
        console.log("getUserMedia not supported on your browser!");
      }
    }
  }

  visualize(stream) {
    var source = audioCtx.createMediaStreamSource(stream);

    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    draw();

    function draw() {
      let WIDTH = canvas.width;
      let HEIGHT = canvas.height;

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      canvasCtx.beginPath();

      var sliceWidth = (WIDTH * 1.0) / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }
  }

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>Web dictaphone</h1>
        </header>

        <section className="main-controls">
          <canvas className="visualizer" height="60px" />
          <div id="buttons">
            <button
              style={{ color: this.state.recordingColor }}
              className="record"
              disabled={this.state.recordDisabled}
              onClick={this.onRecord}
            >
              Record
            </button>
            <button
              className="stop"
              disabled={this.state.stopDisabled}
              onClick={this.onStop}
            >
              Stop
            </button>
          </div>
        </section>

        <section className="sound-clips" />
      </div>
    );
  }
}
