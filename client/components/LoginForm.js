import React from "react";

const LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex column">
        <div className="flex column m1">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="input" />
        </div>
        <div className="flex column m1">
          <label htmlFor="email">Password</label>
          <input type="password" name="password" className="input" />
        </div>
        <div className="m1">
          <button type="submit" className="btn bg-blue white p1 rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
