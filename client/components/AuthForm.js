import React from "react";
import { connect } from "react-redux";
// import PropTypes from 'prop-types'
import { auth } from "../reducers/userReducer";
import TextField from "@material-ui/core/TextField";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <form onSubmit={ev => handleSubmit(ev, name)} name={name}>
        <h1 className="title">Please {displayName}</h1>
        {displayName === "Login" ? (
          <div style="display:flex; flex-direction:column">
            <TextField
              required
              type="text"
              name="email"
              id="standard-name"
              label="email"
              margin="normal"
            />
            <TextField
              required
              type="password"
              name="password"
              id="standard-name"
              label="password"
              margin="normal"
            />
          </div>
        ) : (
          <div style="display: flex; flex-direction: column">
            <TextField
              required
              type="text"
              name="name"
              id="standard-name"
              label="name"
              margin="normal"
            />
            <TextField
              required
              type="text"
              name="email"
              id="standard-name"
              label="email"
              margin="normal"
            />
            <TextField
              required
              type="password"
              name="password"
              id="standard-name"
              label="password"
              margin="normal"
            />
          </div>
        )}

        <div>
          <Button type="submit" variant="contained" color="primary">
            {displayName}&ensp;
            <SvgIcon>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <Button type="submit" variant="outlined" color="secondary" style="">
        <a href="/auth/google">{displayName} with Google</a>
      </Button>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login"
    // error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up"
    // error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, name) {
      evt.preventDefault();
      console.log(evt.target.name, "*****");
      const formName = name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const username = evt.target.name.value;

      dispatch(auth(username, email, password, formName));
    }
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm);
