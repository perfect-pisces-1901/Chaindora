import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';
import Song from './Song.js';

const audio = document.createElement('audio');
let audioVisible = false;
const HEIGHT = 300;
const WIDTH = 300;
let canvasCtx;
let bufferLength;
let canvas;
let analyser;

function setup() {
  const audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.fftSize = 2048;
  bufferLength = analyser.frequencyBinCount;
  canvas = document.getElementById('canvas');
  canvasCtx = canvas.getContext('2d');
}

function draw() {
  var drawVisual = requestAnimationFrame(draw);
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  canvasCtx.beginPath();
  var sliceWidth = WIDTH * 1.0 / bufferLength;
  var x = 0;
  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * HEIGHT / 2;

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

class AllSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: {},
      paused: false
    };
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.props.getSongs();
    setup();
    draw();
  }

  togglePlay(ev, song, uri) {
    if (!audioVisible) {
      audioVisible = true;
      document.getElementsByTagName('body')[0].appendChild(audio);
      audio.controls = true;
    }
    if (this.state.currentSong.id && this.state.currentSong.id === song.id) {
      if (audio.paused) {
        audio.play();
        this.setState({ paused: false });
      } else {
        audio.pause();
        this.setState({ paused: true });
      }
    } else {
      audio.src = uri;
      audio.load();
      audio.play();
      this.setState({ currentSong: song, paused: false });
    }
  }

  render() {
    return (
      <div>
        <h2>Chaindora Catalog</h2>
        <canvas width="300" height="300" id="canvas"></canvas>
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
                  key={song.hash}
                  song={song}
                  togglePlay={this.togglePlay}
                  currentSong={this.state.currentSong}
                  paused={this.state.paused}
                />
              );
            })}
          </tbody>
        </table>
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
