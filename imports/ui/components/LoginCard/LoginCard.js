import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { timingSafeEqual } from "crypto";
class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      logginIn: false,
      errors: []
    };
  }

  validate = () => {
    let err = [];
    console.log(this.state.errors);
    this.setState({ errors: this.state.errors.splice(0) });

    console.log(err);

    if (this.state.email.trim() === "") {
      console.log("email");

      err.push("Email is required.");
      console.log(err);
    } else {
      var re = /\S+@\S+\.\S+/;
      if (!re.test(this.state.email)) {
        err.push("Email is invalid.");
      }
    }
    if (this.state.password.trim() === "") {
      err.push("Password is required.");
    }
    this.setState({ errors: err });
    console.log(err.length);
    if (err.length > 0) {
      console.log(" errors");
      return false;
    }
    return true;
  };
  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  login = e => {
    e.preventDefault();
    console.log("login");
    if (!this.validate()) {
      console.log("returnign");

      return;
    }
    this.setState({ loggingIn: true });

    Meteor.loginWithPassword(
      this.state.email,
      this.state.password,

      err => {
        if (err) {
          console.log(err);
          this.setState({ errors: this.state.errors.concat(err.reason) });

          this.setState({ loggedIn: false, loggingIn: false });
          return;
        }

        this.setState({ loggedIn: true, loggingIn: false });
      }
    );
  };

  render() {
    console.log(this.state.errors);
    return !this.state.loggingIn ? (
      this.state.loggedIn ? (
        <Redirect to="/" />
      ) : (
        <div className="registration-card">
          <header>
            <img src="/images/logo.svg" />
            <h1>Welcome back!</h1>
            <ul className="errors">
              {this.state.errors.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </header>
          <form>
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={e => this.onChange(e)}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={e => this.onChange(e)}
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
