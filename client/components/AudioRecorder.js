import React from 'react'
import { ReactMic } from 'react-mic';
import storehash from '../../src/storehash';
import ipfs from '../../src/ipfs';
import web3 from '../../src/web3';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAddress: '',
      ipfsHash: '',
      transactionHash: '',
      record: false,
      clips: [],
      recorded: [],
      open: false
    }
    this.onStop = this.onStop.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.deleteClipBtn = this.deleteClipBtn.bind(this)
    this.uploadClipBtn = this.uploadClipBtn.bind(this)
    this.uploadClipToCloud = this.uploadClipToCloud.bind(this)
  }

  startRecording = () => {
    this.setState({
      record: true,
      open: true
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
    if (confirm("Are you sure you want to delete this clip?")) {
    this.setState((prevState) => ({...prevState, clips: prevState.clips.filter(c => c.id !== clipId)}))
    }
  }

  uploadClipBtn(clipId) {
    const clip = this.state.clips.find(c => c.id === clipId)
    console.log('uploadClip ', clip, clip.blob)
    this.setState((prevState) => ({...prevState, recorded: [...prevState.recorded, clip.id]}))
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div id="record-div">
        <h1 id="record-title">Let's Record!</h1>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#C4F0C5"
          backgroundColor="#EFF0F4"
        />
        <div>
          <button disabled={this.state.record} className="start" onClick={this.startRecording} type="button">Record</button>
          <button disabled={!this.state.record} className="stop" onClick={this.stopRecording} type="button">Stop</button>
        </div>
        <section className="sound-clips">
        <div id="your-clips">
          <h2>Your clips:</h2>
        </div>
        {
          this.state.clips.map((clip, idx) => {
            return (
              <article key={clip.id} className="clip">
                <audio id="record-audio" controls={true} src={clip.url} />
                <p className="clipLabel">Clip {idx+1}:  {clip.name}</p>
                <button disabled={this.state.recorded.includes(clip.id)} type="button" className="upload" onClick={() => this.uploadClipBtn(clip.id)}>
                  Upload
                </button>
                <button type="button" className="delete" onClick={() => this.deleteClipBtn(clip.id)}>
                  Delete
                </button>
              </article>
            )
          })
        }
        </section>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Recording...</span>}
        />
      </div>
    );
  }
}
