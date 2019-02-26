import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link, Redirect } from "react-router-dom";
class RegistrationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      age: "",
      loggedIn: false,
      errors: []
    };
  }

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  validate = () => {
    let err = [];
    this.setState({ errors: this.state.errors.splice(0) });

    console.log(err);

    if (this.state.email.trim() === "") {
      err.push("Email is required.");
    } else {
      var re = /\S+@\S+\.\S+/;
      if (!re.test(this.state.email)) {
        err.push("Email is invalid.");
      }
    }
    if (this.state.password.trim() === "") {
      err.push("Password is required.");
    }
    if (this.state.age.trim() === "") {
      err.push("Age is required.");
    } else {
      if (isNaN(this.state.age)) {
        err.push("Age must be a number.");
      } else if (parseInt(this.state.age) < 18) {
        err.push("You must be an adult 18+.");
      } else if (parseInt(this.state.age) > 120) {
        err.push("Age is invalid.");
      }
    }
    this.setState({ errors: err });
    if (err.length > 0) {
      return false;
    }
    return true;
  };

  registerUser = e => {
    e.preventDefault();
    this.setState({ errors: [] });
    if (!this.validate()) return;
    Meteor.call(
      "user.register",
      {
        email: this.state.email,
        password: this.state.password
      },
      err => {
        if (err) {
          this.setState({ errors: this.state.errors.concat([err.reason]) });
          return;
        }
        Meteor.loginWithPassword(
          this.state.email,
          this.state.password,
          err1 => {
            if (err1) {
              console.log("error");
              console.log(err1);
              this.setState({ errors: this.state.errors.concat([err.reason]) });
              return;
            }
            this.setState({ loggedIn: true });
          }
        );
      }
    );
  };
  render() {
    const { toggleLogin } = this.props;

    return this.state.loggedIn ? (
      <Redirect to="/" />
    ) : (
      <div className="registration-card">
        <header>
          <img src="/images/logo.svg" />
          <h1>Sign up to see more</h1>
          <p>Access best ideas with a free account</p>
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
            placeholder="Create a password"
            onChange={e => this.onChange(e)}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={this.state.age}
            onChange={e => this.onChange(e)}
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
