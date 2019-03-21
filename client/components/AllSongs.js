import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';
import Song from './Song.js';

const audio = document.createElement('audio');
let audioVisible = false;

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
  }

  componentDidMount() {
    this.props.getSongs();
    audio.addEventListener('durationchange', () => {
      const duration = parseInt(audio.duration, 10);
      this.setState({ audioDuration: duration })
    })

    audio.addEventListener('timeupdate', () => {
      const time = parseInt(audio.currentTime, 10);
      this.setState({ audioTime: time })
      if (this.state.currentSong.hash) {
        const slider = document.getElementById(`playback_control_${this.state.currentSong.hash}`)
        slider.value = time
      }
    })
  }

  onInput(ev) {
    audio.currentTime = ev.target.value
    this.setState({ audioTime: ev.target.value })
  }

  togglePlay(ev, song, uri) {
    if (!audioVisible) {
      audioVisible = true
      document.getElementsByTagName('body')[0].appendChild(audio)
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
                audioTime={this.state.audioTime}
                audioDuration={this.state.audioDuration}
                onInput={this.onInput}
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
