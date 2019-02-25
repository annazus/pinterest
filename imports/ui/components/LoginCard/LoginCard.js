import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", loggedIn: false, logginIn: false };
  }

  onChange = (evt, input) => {
    console.log(input);
    console.log(this.state);

    this.setState({ ...this.state, [input]: evt.target.value });
  };

  login = e => {
    this.setState({ ...this.state, loggingIn: true });
    e.preventDefault();
    console.log("login");

    Meteor.loginWithPassword(
      this.state.email,
      this.state.password,

      err => {
        console.log("siccess");
        console.log(this.state);
        if (err) {
          console.log(err);
          return;
        }
        console.log("siccess");
        console.log(this.state);
        this.setState({ ...this.state, loggedIn: true, loggingIn: false });
      }
    );
  };

  render() {
    console.log(Meteor.userId());
    console.log(Meteor.loggingIn());
    console.log(this.state);
    return !this.state.loggingIn ? (
      this.state.loggedIn ? (
        <Redirect to="/" />
      ) : (
        <div className="registration-card">
          <header>
            <img src="/images/logo.svg" />
            <h1>Welcome back!</h1>
          </header>
          <form>
            <input
              type="email"
              placeholder="Email"
              onChange={e => this.onChange(e, "email")}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.onChange(e, "password")}
            />
            <button onClick={this.login}>Continue</button>
          </form>
          <Link to="/SignOn" className="login-switch">
            Need an account? Sign up now.
          </Link>
        </div>
      )
    ) : (
      "Logging In"
    );
  }
}

export default LoginCard;
