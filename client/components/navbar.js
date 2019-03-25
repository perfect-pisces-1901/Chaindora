import React from "react";
import {NavLink} from "react-router-dom"
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {logout} from '../reducers/userReducer'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar" className="row">
    <NavLink className="link" to="/">
        <h3>CHAINDORA</h3>
    </NavLink>
    <nav>
      {isLoggedIn ? (
        <div className="row">
          <NavLink className="link" to="/upload">Upload</NavLink>
          <br />
          <NavLink className="link" to="/songs">Listen</NavLink>
          <br />
          <NavLink className="link" to="/record">Record</NavLink>
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
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
