import React, { Component } from 'react';

export default class AudioRecorder extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="wrapper">
        <header>Record and upload tracks</header>

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
