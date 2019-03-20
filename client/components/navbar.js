import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = props => {
  return (
    <div id="navbar" className="row">
      <NavLink className="link" to="/">
        <h3>CHAINDORA</h3>
      </NavLink>
      <NavLink className="link" to="/Artist">Upload</NavLink>
      <br/>
      <NavLink className="link" to="/SongsList">Listen</NavLink>
    </div>
  );
};

export default Navbar;
