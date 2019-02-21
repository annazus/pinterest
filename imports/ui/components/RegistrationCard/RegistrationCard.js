import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link, Redirect } from "react-router-dom";
class RegistrationCard extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", age: "", loggedIn: false };
  }

  onChange = (evt, input) => {
    console.log(input);
    console.log(this.state);

    this.setState({ ...this.state, [input]: evt.target.value });
  };

  registerUser = e => {
    e.preventDefault();
    Meteor.call(
      "user.register",
      {
        email: this.state.email,
        password: this.state.password
      },
      err => {
        if (err) alert(err);
        Meteor.loginWithPassword(
          this.state.email,
          this.state.password,
          err1 => {
            if (err1) {
              console.log("error");
              console.log(err1);
              return;
            }
            this.setState({ ...this.state, loggedIn: true });
          }
        );
      }
    );
  };
  render() {
    console.log(this.state);
    const { toggleLogin } = this.props;

    return this.state.loggedIn ? (
      <Redirect to="/" />
    ) : (
      <div className="registration-card">
        <header>
          <h1>Sign up to see more</h1>
          <p>Access best ideas with a free account</p>
        </header>
        <form>
          <input
            type="email"
            placeholder="Email"
            onChange={e => this.onChange(e, "email")}
          />
          <input
            type="password"
            placeholder="Create a password"
            onChange={e => this.onChange(e, "password")}
          />
          <input
            type="text"
            placeholder="Age"
            onChange={e => this.onChange(e, "age")}
          />
          <button onClick={this.registerUser}>Continue</button>
        </form>
        <Link to="/Login" className="login-switch">
          Already a member? Log in
        </Link>
      </div>
    );
  }
}

export default RegistrationCard;
