import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFirebaseSpell } from "../../store/spells";
import { signIntoFirebase } from "../../store/user";

function Login(props) {
  const [form, setValues] = useState({
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
    props.signIn(form.email, form.password, form.username);
  };
  return (
    <form className="flex-container" onSubmit={handleSubmit}>
      <div className="login-container">
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
            Sign In
          </button>
          <div>
            <Link className="login-submit" to="/signup">
              Dont have an account? Sign up here!
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch, { history }) => ({
  signIn: (email, password, username) =>
    dispatch(signIntoFirebase(email, password, username, history)),
});

export default connect(null, mapDispatchToProps)(Login);
