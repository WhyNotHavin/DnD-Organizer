import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFirebaseSpell } from "../../store/spells";
import { signIntoFirebase } from "../../store/user";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    console.log(this.state);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.signIn(
      this.state.email,
      this.state.password,
      this.state.username
    );
  }
  render() {
    const { email, username, password } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <label>User Name: </label>
        <input
          className="form-input-username"
          name="username"
          onChange={handleChange}
          value={username}
        />
        <label>Email: </label>
        <input
          className="form-input-email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <label>Password: </label>
        <input
          className="form-input-password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <button className="form-submit" type="submit">
          Sign In
        </button>
        <Link to="/signup">Dont have an account? Sign up here!</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  signIn: (email, password, username) =>
    dispatch(signIntoFirebase(email, password, username, history)),
});

export default connect(null, mapDispatchToProps)(Login);
