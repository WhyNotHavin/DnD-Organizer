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
        Sign Up!
      </button>
      <Link to="/login">Already have an account? Sign in here</Link>
    </form>
  );
}

const mapDispatchToProps = (dispatch, { history }) => ({
  signUp: (email, password, username) =>
    dispatch(signUpFirebase(email, password, username, history)),
});

export default connect(null, mapDispatchToProps)(SignUp);
