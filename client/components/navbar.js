import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = props => {
<<<<<<< HEAD
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
=======
  return <div id="navbar" className="row" />;
>>>>>>> a5ae78d49c6fff5445161f7189906917d1705fe1
};

export default Navbar;
