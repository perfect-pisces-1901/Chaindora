import React, { Component } from 'react';
import { connect } from 'react-redux';
import me from '../reducers/userReducer';
import getSongs from '../reducers/songsReducer';

class ArtistProfile extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getSongs();
  }
  render() {
    console.log(this.props)
    const {name, email, imageUrl} = this.props;
    return (
      <div id="artist-profile-div">
        <div id="artist-image-div">
          <img id="artist-image" src={imageUrl} />
        </div>
        <div>
          <h3>Artist Name:</h3>
          <br />
          <p>{name}</p>
          <br />
          <h3>Artist Email:</h3>
          <br />
          <p>{email}</p>
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
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    user: state.user,
    songs: state.songs
  }
};

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getSongs: () => dispatch(getSongs())
});

export default connect(
  mapState,
  mapDispatch
)(ArtistProfile);
