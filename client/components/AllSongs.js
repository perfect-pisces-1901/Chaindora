import React, { Component } from "react";
import { getSongs } from "../reducers/songsReducer";
import { connect } from "react-redux";
import Song from "./Song.js";
import storehash from "../../src/storehash";

class AllSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: {},
      audioTime: 0,
      audioDuration: 0,
      paused: false
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.onInput = this.onInput.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
    this.drawVisualizerFrame = this.drawVisualizerFrame.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.source = {};
    // this.canvas = document.getElementById('canvas');
    // this.canvasCtx = this.refs.canvas.getContext('2d');
    // this.audioRef = React.createRef()
  }

  componentDidMount() {
    this.props.getSongs();
    this.refs.audio.addEventListener('durationchange', () => {
      const duration = parseInt(this.refs.audio.duration, 10);
      this.setState({ audioDuration: duration })
    })
    this.refs.audio.addEventListener('timeupdate', () => {
      const time = parseInt(this.refs.audio.currentTime, 10);
      this.setState({ audioTime: time })
      if (this.state.currentSong.hash) {
        const slider = document.getElementById(
          `playback_control_${this.state.currentSong.hash}`
        );
        slider.value = time;
      }
    })
    this.refs.canvas.addEventListener('resize', this.resizeCanvas, false)
    this.canvasCtx = this.refs.canvas.getContext('2d');
  }

  resizeCanvas() {
    this.refs.canvas.width = window.innerWidth
    this.refs.canvas.height = window.innerHeight
  }

  setupAudio() {
    // let audioVisible = false;
      // const audioCtx = new AudioContext();
      // const analyser = audioCtx.createAnalyser();
      this.refs.audio.crossOrigin = 'anonymous';
      // let source = this.audioCtx.createMediaElementSource(this.refs.audio);
      // let source;
      console.log('SOURCE IS: ', this.source)
      if (!this.source.channelCount) {
        console.log('SOURCE HAS NO CHANNEL COUNT')
        this.source = this.audioCtx.createMediaElementSource(this.refs.audio)
      } else {
        console.log('RYANNNNNN')
        this.source.disconnect()
        console.log('NEW SOURCE: ', this.source)
        // source = this.audioCtx.createMediaElementSource(this.refs.audio)
      }
      // if no mediaSrcElment create
      // else find way to update or reassing to includethis.refs.audio
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination)
      this.analyser.fftSize = 32;
      const bufferLength = this.analyser.frequencyBinCount;
      // const canvas = document.getElementById('canvas');
      // const canvasCtx = canvas.getContext('2d');
      this.drawVisualizerFrame(bufferLength, this.analyser, this.canvasCtx, this.refs.canvas)
  }

  drawVisualizerFrame(bufferLength, analyser, canvasCtx, canvas) {
    // eslint-disable-next-line no-unused-vars
    requestAnimationFrame(() => this.drawVisualizerFrame(bufferLength, analyser, canvasCtx, canvas));
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = '#eff0f4'
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 4;
    canvasCtx.strokeStyle = '#c4f0c5';
    canvasCtx.beginPath();
    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
      if (i === 0) {
        canvasCtx.moveTo(x, y + 100);
      } else {
        canvasCtx.lineTo(x, y + 100);
      }
      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

  onInput(ev) {
    this.refs.audio.currentTime = ev.target.value
    this.setState({ audioTime: ev.target.value })
  }

  async togglePlay(ev, song, uri) {
    this.setupAudio()
    // if (!audioVisible) {
    //   audioVisible = true
    //   document.getElementsByTagName('body')[0].appendChild(audio)
    // }
    if (this.state.currentSong.id && this.state.currentSong.id === song.id) {
      if (this.refs.audio.paused) {
        this.refs.audio.play();
        this.setState({ paused: false });
      } else {
        this.refs.audio.pause();
        this.setState({ paused: true });
      }
    } else {
      this.refs.audio.src = uri;
      this.refs.audio.load();
      this.refs.audio.play();
      try {
        await this.setState({ currentSong: song, paused: false });
        storehash.methods.payArtist(this.state.currentSong.ethAddress).send({
          from: "0x57bCe2c9311Dd15A14Fc5df64aDE56F41B2B5009",
          value: 10 ** 16
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <div>
        <audio controls={true} ref='audio' />
        <canvas height='300' width='2000' id="canvas" ref="canvas" />
        <h2>Chaindora Catalog</h2>
        <table id="songs">
          <tbody>
            <tr id="titles">
              <th />
              <th>Title</th>
              <th>Artist</th>
              {/* <th>Genre</th> */}
            </tr>
            {this.props.songs.map(song => {
              return (
                <Song
                  key={song.id}
                  song={song}
                  togglePlay={this.togglePlay}
                  currentSong={this.state.currentSong}
                  audioTime={this.state.audioTime}
                  audioDuration={this.state.audioDuration}
                  onInput={this.onInput}
                  paused={this.state.paused}
                />
              );
            })}
          </tbody>
        </table>
        <audio id='myAudio' />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  songs: state.songs
});

const mapDispatchToProps = dispatch => ({
  getSongs: () => dispatch(getSongs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSongs);
