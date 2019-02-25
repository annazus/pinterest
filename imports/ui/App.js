import React, { Component } from "react";
import SecureRoute from "./components/SecureRoute";
import LoginCard from "./components/LoginCard";
import RegistrationCard from "./components/RegistrationCard";
import Home from "./components/Home";

import { Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Login" component={LoginCard} />
        <Route path="/SignOn" component={RegistrationCard} />

        <SecureRoute component={Home} />
      </Switch>
    );
  }
}
export default App;
