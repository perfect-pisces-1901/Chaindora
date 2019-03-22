import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = props => {
  return (
    <div id="navbar" className="row">
      <NavLink className="link" to="/">
        <h3>CHAINDORA</h3>
      </NavLink>
      <NavLink className="link" to="/upload">Upload</NavLink>
      <br/>
      <NavLink className="link" to="/songs">Listen</NavLink>
      <br/>
      <NavLink className="link" to="/login">Login</NavLink>
      <br/>
      <NavLink className="link" to="/signup">Sign Up</NavLink>
    </div>
  );
};

export default Navbar;
