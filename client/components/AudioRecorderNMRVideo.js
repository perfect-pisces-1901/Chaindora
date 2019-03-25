import React, { Component } from 'react';
import ReactMediaRecorder from 'react-media-recorder';

export default class AudioRecorder extends Component {
  constructor() {
    super();
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  startRecording() {
    console.log('start recording')
  }

  stopRecording() {
    console.log('stop recording')
  }

  render() {
    return (
      <div className="wrapper">
        <header>Record and upload tracks</header>

        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording, mediaBlob }) => (
            <div>
              <p>{status}</p>
              <button type="button" onClick={startRecording}>Start Recording</button>
              <button type="button" onClick={stopRecording}>Stop Recording</button>
              <video src={mediaBlob} controls />
            </div>
          )}
        />

        <section className="main-controls">
          <canvas className="visualizer" height="60px" />
          <div id="buttons">
            <button id="recordBtn" type="button">Record</button>
            <button id="stopBtn" type="button">Stop</button>
          </div>
        </section>

        <section className="sound-clips" />
      </div>
    );
  }
}
