import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Pin from "./components/Pin";

import LoginCard from "./components/LoginCard";
import Nowhere from "./components/Nowhere";
import RegistrationCard from "./components/RegistrationCard";
import Home from "./components/Home";
import Logout from "./components/Logout";
import { Route, Switch, Link } from "react-router-dom";
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
    // Meteor.logout(() => {
    //   console.log("logout");
    // });

    // console.log(Meteor.userId());
    // Meteor.loginWithPassword("skovoor", "password", () => {
    //   console.log("lgoeedin");
    // });
    // console.log(Meteor.userId());
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/Pin" component={Pin} /> */}

        <Route path="/Login" component={LoginCard} />
        <Route path="/SignOn" component={RegistrationCard} />
        <Route component={Nowhere} />
      </Switch>
    );
  }
}
export default App;
