import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../reducers/userReducer";
import { withRouter } from "react-router-dom";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="navbar" className="navbar">
    <NavLink className="link1" to="/">
      <h3>LOGO</h3>
    </NavLink>
<<<<<<< HEAD
    <nav>
      {isLoggedIn ? (
        <div className="row">
          <NavLink className="link" to="/upload">Upload</NavLink>
          <br />
          <NavLink className="link" to="/songs">Listen</NavLink>
          <br />
          <NavLink className="link" to="/user-profile">Profile</NavLink>
          <br />
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="row">
          <NavLink className="link" to="/login">Login</NavLink>
          <br />
          <NavLink className="link" to="/signup">Sign Up</NavLink>
        </div>
      )}
    </nav>
    <hr />
=======

    {isLoggedIn ? (
      <div className="row">
        <NavLink className="linkUpload" to="/upload">
          Upload
        </NavLink>
        <br />
        <NavLink className="link" to="/songs">
          Listen
        </NavLink>
        <br />
        <a href="#" onClick={handleClick} className="link">
          Logout
        </a>
      </div>
    ) : (
      <div className="row">
        <NavLink className="link2" to="/login">
          Login
        </NavLink>
        <br />
        <NavLink className="link3" to="/signup">
          Sign Up
        </NavLink>
      </div>
    )}
>>>>>>> master
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Navbar)
);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
