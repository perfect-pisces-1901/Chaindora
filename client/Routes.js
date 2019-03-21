import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AllSongs from "./components/AllSongs";
import { Login, Signup } from "./components/AuthForm";
import ArtistUpload from "./components/ArtistUpload";
import HomePage from "./components/HomePage";
import AudioRecorder from "./components/AudioRecorder";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/SongsList" component={AllSongs} />
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={Signup} />
        <Route path="/Artist" component={ArtistUpload} />
        <Route path="/Record" component={AudioRecorder} />
      </Switch>
    );
  }
}
