import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFirebaseSpell } from "../../store/spells";
import { signIntoFirebase, signUpFirebase } from "../../store/user";

function SignUp(props) {
  const [form, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setValues({
      ...form,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.signUp(form.email, form.password, form.username);
  };
  return (
    <form className="flex-container" onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="login-inner-container">
          <label className="login-labels">User Name: </label>
          <input
            className="login-input"
            name="username"
            onChange={handleChange}
            value={form.username}
          />
        </div>
        <div className="login-inner-container">
          <label>Email: </label>
          <input
            className="login-input"
            name="email"
            onChange={handleChange}
            value={form.email}
          />
        </div>
        <div className="login-inner-container">
          <label>Password: </label>
          <input
            className="login-input"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <div className="login-inner-buttons">
          <button className="login-submit" type="submit">
            Sign Up!
          </button>
          <div>
            <Link className="login-submit" to="/login">
              Already have an account? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch, { history }) => ({
  signUp: (email, password, username) =>
    dispatch(signUpFirebase(email, password, username, history)),
});

export default connect(null, mapDispatchToProps)(SignUp);
