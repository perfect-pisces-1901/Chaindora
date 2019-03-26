import React, { Component } from 'react';
//import ReactMediaRecorder from 'react-media-recorder';
import ReactMediaRecorder from './rmr-index.js';

export default class AudioRecorder extends Component {

  constructor() {
    super()
    this.state = {
      clips: []
    }
    this.addClip = this.addClip.bind(this)
  }


  addClip(clip) {
    this.setState((prevState) => ({
      ...prevState,
      clips: [...prevState.clips, clip]
    }))
  }

  render() {
    return (
      <div className="wrapper">
        <header>Record and upload tracks</header>

        <ReactMediaRecorder
          audio
          render={({ status, startRecording, stopRecording, mediaBlob}) => (
            <div>
              <p>{status}</p>
              <button
                type="button"
                onClick={() => startRecording(document.getElementById('visualizer'))}>
                Record
              </button>
              <button
                type="button" onClick={
                () => stopRecording(this.addClip)
                }>Stop
              </button>
              <audio src={mediaBlob} controls />
            </div>
          )}
        />

        <section className="main-controls">
          <canvas id="visualizer" className="visualizer" height="60px" />
        </section>

        <section className="sound-clips">
        {
          this.state.clips.map(clip => {
            console.log('MOOO: ', clip, clip.audioURL)
            return (
              <article key={clip.id} className="clip">
                <p className="clipLabel">{clip.name}</p>
                <button type="button" className="delete">
                  Delete
                </button>
              </article>
            )
          })
        }
        </section>

      </div>
    );
  }
}
