import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';
import Song from './Song.js'

const audio = document.createElement('audio');

class AllSongs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSong: {}
    }
    this.playSong = this.playSong.bind(this)
  }

  componentDidMount() {
    this.props.getSongs();
  }

  playSong(ev, song, uri) {
    console.log('play song ', uri, song, ev)
    this.setState({ currentSong: song })
    audio.src = uri
    audio.load();
    audio.play();
  }

  render() {
    return (
      <div>
        <table id="songs">
          <tbody>
            <tr>
              <td />
              <td>Title</td>
              <td>Artist</td>
              <td>Hash</td>
            </tr>
            {
              this.props.songs.map(song => {
                return (
                  <Song
                    key={song.hash}
                    song={song}
                    playSong={this.playSong}
                    currentSong={this.state.currentSong} />
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
