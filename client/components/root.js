import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';

class AllSongs extends Component {
  componentDidMount() {
    this.props.getSongs();
  }
  render() {
    const { songs } = this.props;
    return (
      <div>
        <ul>
          {songs.map(hash => {
            return (
              <li key={hash}>
                <a href={`https://gateway.ipfs.io/ipfs/${hash}`}>Click to play {hash.slice(0, 5)}...</a>
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
