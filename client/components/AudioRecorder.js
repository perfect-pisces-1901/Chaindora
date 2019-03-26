import React from 'react'
import { ReactMic } from 'react-mic';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      clips: []
    }
    this.onStop = this.onStop.bind(this)
    this.deleteClip = this.deleteClip.bind(this)
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    // eslint-disable-next-line no-alert
    const clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip') || 'My clip'
    const url = recordedBlob.blobURL
    const id = url.slice(url.lastIndexOf('/') + 1) // blob:http://<hostname>/<id>
    const clip = { id: id, name: clipName, url: url }
    this.setState((prevState) => ({...prevState, clips: [...prevState.clips, clip]}))
  }

  deleteClip(clipId) {
    this.setState((prevState) => ({...prevState, clips: prevState.clips.filter(c => c.id !== clipId)}))
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
        /> {/*backgroundColor="#FF4081"*/}
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>

        <section className="sound-clips">
        {
          this.state.clips.map(clip => {
            return (
              <article key={clip.id} className="clip">
                <audio controls={true} src={clip.url} />
                <p className="clipLabel">{clip.name}</p>
                <button type="button" className="delete" onClick={() => this.deleteClip(clip.id)}>
                  Delete
                </button>
                <button type="button" className="upload" onClick={() => this.upload(clip.id)}>
                  Upload
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
