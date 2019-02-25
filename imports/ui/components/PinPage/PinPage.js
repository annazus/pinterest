import React, { Component } from "react";

import PinBoard from "../PinBoard";
import Pin from "../Pin";
import PinBuilder from "../PinBuilder";
import SecureRoute from "../SecureRoute";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
class PinPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <Switch>
              <SecureRoute exact path="/pin-builder" component={PinBuilder} />
              <SecureRoute path="/pin/:_id" component={Pin} />
              <SecureRoute component={PinBoard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default PinPage;
