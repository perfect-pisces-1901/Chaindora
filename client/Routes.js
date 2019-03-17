import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import AllSongs from "./components/AllSongs";
import Login from "./components/Login";
import ArtistUpload from "./components/ArtistUpload";
import HomePage from "./components/HomePage";

export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <div id="main">
          <Route exact path="/" component={HomePage} />
          <Route path="/SongsList" component={AllSongs} />
          <Route path="/Login" component={Login} />
          <Route path="/Artist" component={ArtistUpload} />
        </div>
      </HashRouter>
    );
  }
}
