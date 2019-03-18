import React from "react";
import { connect } from "react-redux";
import { login } from "../reducers/users";
import LoginForm from "./AuthForm";

const Login = props => {
  const { handleSubmit } = props;

  return (
    <div className="h100 w100 flex column align-items-center justify-center">
      <h1>Please Loggin'!</h1>
      <div className="flex w50">
        <div className="grow1">
          <LoginForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(login({ email, password })).then(() => {
        ownProps.history.push("/");
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
