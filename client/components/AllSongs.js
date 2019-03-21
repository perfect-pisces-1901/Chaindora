import React, { Component } from "react";
import { getSongs } from "../reducers/songsReducer";
import { connect } from "react-redux";
import Song from "./Song.js";
import web3 from "../../src/web3";
import storehash from "../../src/storehash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const audio = document.createElement("audio");
let audioVisible = false;

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
  }

  async togglePlay(ev, song, uri) {
    if (!audioVisible) {
      audioVisible = true;
      document.getElementsByTagName("body")[0].appendChild(audio);
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
      await this.setState({ currentSong: song, paused: false });
      storehash.methods.payArtist(this.state.currentSong.ethAddress).send({
        from: "0x1a5B3De6De5312762D32749a6af1E9D0791490d6",

        value: 10 ** 16
      });
      console.log(this.state.currentSong.ethAddress);
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
                  key={song.id}
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
