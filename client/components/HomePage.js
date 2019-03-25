import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  componentDidMount() {
    const home = ReactDOM.findDOMNode(this.refs.home);
    const users = ReactDOM.findDOMNode(this.refs.users);
    const moveTitle = () => {
      if (home.classList.contains("home-down")) {
        home.classList.remove("home-down");
        home.classList.add("home-up");
      }
    };
    const moveUsers = () => {
      if (users.classList.contains("home-down")) {
        users.classList.remove("home-down");
        users.classList.add("home-up");
      }
    };
    window.setTimeout(moveTitle, 100);
    window.setTimeout(moveUsers, 500);
  }

  render() {
    return (
      <div id="home-bg">
        <div id="home-div" className="home-down" ref="home">
          <h1 id="home">Welcome To Chaindora</h1>
        </div>
        <div id="users" className="home-down" ref="users">
          <p
            className="user-button"
            onClick={() => this.props.history.push("/upload")}
          >
            {" "}
            Create
            {/* <Link className='user-link' to="/upload">Create</Link> */}
          </p>
          <p
            className="user-button"
            onClick={() => this.props.history.push("/songs")}
          >
            Listen
            {/* <Link className='user-link' to="/songs">Listen</Link> */}
          </p>
        </div>
      </div>
    );
  }
}
