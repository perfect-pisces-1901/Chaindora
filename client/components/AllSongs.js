import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';
import Song from './Song.js';

const audio = document.createElement('audio');
let audioVisible = false;

class AllSongs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSong: {},
      audioTime: 0,
      audioDuration: 0,
      paused: false
    }
    this.togglePlay = this.togglePlay.bind(this)
  }

  componentDidMount() {
    this.props.getSongs();
    audio.addEventListener('durationchange', () => {
      const duration = parseInt(audio.duration, 10);
      console.log('durationchange: ', duration)
      this.setState({ audioDuration: duration })
    })

    audio.addEventListener('timeupdate', () => {
      const time = parseInt(audio.currentTime, 10);
      console.log('timeupdate: ', time, this.state.currentSong)
      this.setState({ audioTime: time })
      if (this.state.currentSong.hash) {
        const slider = document.getElementById(`playback_control_${this.state.currentSong.hash}`)
        slider.value = time
      }
    })
  }

  togglePlay(ev, song, uri) {
    if (!audioVisible) {
      audioVisible = true
      document.getElementsByTagName('body')[0].appendChild(audio)
    }
    if (this.state.currentSong.id && (this.state.currentSong.id === song.id)) {
      if (audio.paused) {
        audio.play();
        this.setState({ paused: false })
      } else {
        audio.pause();
        this.setState({ paused: true })
      }
    } else {
      audio.src = uri
      audio.load();
      audio.play();
      this.setState({ currentSong: song, paused: false })
    }
  }

  render() {
    return (
      <div>
        <h1>Chaindora Catalog</h1>
        <table id="songs">
          <tbody>
            <tr>
              <td />
              <td>Title</td>
              <td>Artist</td>
              <td>&nbsp;</td>  {/* for player controls */}
            </tr>
            {
              this.props.songs.map(song => {
                return (
                  <Song
                    key={song.hash}
                    song={song}
                    togglePlay={this.togglePlay}
                    currentSong={this.state.currentSong}
                    audioTime={this.state.audioTime}
                    audioDuration={this.state.audioDuration}
                    paused={this.state.paused}
                  />
                )})
            }
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
  getSongs: () => dispatch(getSongs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSongs);
