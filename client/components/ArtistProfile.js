import React, { Component } from 'react';
import { connect } from 'react-redux';
import { me } from '../reducers/userReducer';
import { getSongs } from '../reducers/songsReducer';

class ArtistProfile extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getSongs();
  }
  render() {
    const {name, email, imageUrl} = this.props.user;
    console.log(this.props.songs);
    const userSongs = this.props.songs.filter(song => song.artist === name);
    console.log("These are the User Songs:", userSongs);
    return (
      <div id="profile-div">
        <div id="artist-profile-div">
          <img id="artist-image" src={imageUrl} />
          <div>
          <h3>Artist Name:</h3>
          <p>{name}</p>
          <h3>Artist Email:</h3>
          <p>{email}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Cover Art</th>
              <th>Song Title</th>
              <th>Genre</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {userSongs.map(song => {
              return (
                <tr key={song.id} id="artist-upload-history">
                  <td><img id="user-song-img" src={song.imageUrl} /></td>
                  <td>{song.title}</td>
                  <td>{song.genre}</td>
                  <td><a className="songHash" href={`https://gateway.ipfs.io/ipfs/${song.hash}`}>{song.hash}</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    songs: state.songs
  }
};

const mapDispatch = dispatch => ({
  getUser(){
    dispatch(me())
  },
  getSongs(){dispatch(getSongs())
  }
});

export default connect(
  mapState,
  mapDispatch
)(ArtistProfile);
