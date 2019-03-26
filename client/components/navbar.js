import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../reducers/userReducer";
import { withRouter } from "react-router-dom";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="navbar" className="navbar">
    <NavLink className="link1" to="/">
      <img height='100' src='/chaindora-logo.png'/>
    </NavLink>
    {isLoggedIn ? (
      <div className="row">
        <NavLink className="link" to="/upload">Upload</NavLink>
        <br />
        <NavLink className="link" to="/songs">Listen</NavLink>
        <br />
        <NavLink className="link" to="/user-profile">Profile</NavLink>
        <br />
        <a href="#" className="link" onClick={handleClick}>
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
