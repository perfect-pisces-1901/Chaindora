import React from 'react'
import { ReactMic } from 'react-mic';
import storehash from '../../src/storehash';
import ipfs from '../../src/ipfs';
import web3 from '../../src/web3';
import axios from 'axios';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAddress: '',
      ipfsHash: '',
      transactionHash: '',
      record: false,
      clips: []
    }
    this.onStop = this.onStop.bind(this)
    this.deleteClipBtn = this.deleteClipBtn.bind(this)
    this.uploadClipBtn = this.uploadClipBtn.bind(this)
    this.uploadClipToCloud = this.uploadClipToCloud.bind(this)
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

  // eslint-disable-next-line no-unused-vars
  onData(_recordedBlob) {
    //console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    // eslint-disable-next-line no-alert
    const clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip') || 'My clip'
    const url = recordedBlob.blobURL
    const id = url.slice(url.lastIndexOf('/') + 1) // blob:http://<hostname>/<id>
    const clip = { id: id, name: clipName, url: url, blob: recordedBlob.blob }
    this.setState((prevState) => ({...prevState, clips: [...prevState.clips, clip]}))
  }

  deleteClipBtn(clipId) {
    this.setState((prevState) => ({...prevState, clips: prevState.clips.filter(c => c.id !== clipId)}))
  }

  uploadClipBtn(clipId) {
    const clip = this.state.clips.find(c => c.id === clipId)
    console.log('uploadClip ', clip, clip.blob)
    const reader = new FileReader()
    reader.onload = async () => {
      const buffer = await Buffer.from(reader.result)
      await this.uploadClipToCloud(clip.name, buffer)
    }
    reader.readAsArrayBuffer(clip.blob)
  }

  async uploadClipToCloud(name, buffer) {
    console.log('uploadClipToCloud', buffer)
    const accounts = await web3.eth.getAccounts();
    console.log('uploadClipToCloud accounts', accounts);
    //obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    console.log('uploadClipToCloud ethadd', ethAddress)
    // eslint-disable-next-line handle-callback-err
    await ipfs.add(buffer, async (err, ipfsHash) => {
      console.log('uploadClipToCloud ipfsHash err [', 'moo', ']');
      this.setState({ ipfsHash: ipfsHash[0].hash });
      storehash.methods.setHash(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          console.log(error);
          this.setState({ transactionHash });
        }
      );
      const song = {
        ipfsHash,
        title: name,
        genre: 'GENRE',
        ethAddress: accounts[0]
      };
      await axios.post(`/api/songs`, song);
    });

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
                <button type="button" className="delete" onClick={() => this.deleteClipBtn(clip.id)}>
                  Delete
                </button>
                <button type="button" className="upload" onClick={() => this.uploadClipBtn(clip.id)}>
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
