import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFirebaseSpell } from "../../store/spells";
import { signIntoFirebase } from "../../store/user";

function Login(props) {
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
    props.signIn(form.email, form.password, form.username);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>User Name: </label>
      <input
        className="form-input-username"
        name="username"
        onChange={handleChange}
        value={form.username}
      />
      <label>Email: </label>
      <input
        className="form-input-email"
        name="email"
        onChange={handleChange}
        value={form.email}
      />
      <label>Password: </label>
      <input
        className="form-input-password"
        name="password"
        onChange={handleChange}
        value={form.password}
      />
      <button className="form-submit" type="submit">
        Sign In
      </button>
      <Link to="/signup">Dont have an account? Sign up here!</Link>
    </form>
  );
}

const mapDispatchToProps = (dispatch, { history }) => ({
  signIn: (email, password, username) =>
    dispatch(signIntoFirebase(email, password, username, history)),
});

export default connect(null, mapDispatchToProps)(Login);
