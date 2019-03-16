import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';
import Song from './Song.js'

class AllSongs extends Component {
  componentDidMount() {
    this.props.getSongs();
  }
  render() {
    const { songs } = this.props;
    return (
      <div>
        <ul>
          {songs.map(song => {
            return (
              <li key={song.hash}>
                <Song song={song} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  songs: state.songs,
});

const mapDispatchToProps = dispatch => ({
  getSongs: () => dispatch(getSongs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSongs);
