import React from 'react';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div id="navbar" className="row">
      <NavLink className="link" to="/">
        <h3>CHAINDORA</h3>
      </NavLink>
      <NavLink className="link" to="/upload">Upload</NavLink>
      <NavLink className="link" to="/record">Record</NavLink>
      <br />
      <NavLink className="link" to="/songs">Listen</NavLink>
    </div>
  );
};

export default Navbar;
