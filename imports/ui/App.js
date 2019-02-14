import React, { Component } from "react";
import Meteor from "meteor/meteor";
import Login from "./components/Login";
import LoginCard from "./components/LoginCard";
import RegistrationCard from "./components/RegistrationCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  toggleLogin = () => {
    this.setState({ login: !this.state.login });
  };
  render() {
    return (
      <div>
        {Meteor.userId ? (
          <Home />
        ) : this.state.login ? (
          <LoginCard toggleLogin={this.toggleLogin} />
        ) : (
          <RegistrationCard toggleLogin={this.toggleLogin} />
        )}
      </div>
    );
  }
}
export default App;
