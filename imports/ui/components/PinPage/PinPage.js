import React, { Component } from "react";

import PinBoard from "../PinBoard";
import Pin from "../Pin";
import PinBuilder from "../PinBuilder";

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
            <Link to="/pin-builder">Add Pin</Link>
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={PinBoard} />
              <Route exact path="/pin-builder" component={PinBuilder} />
              <Route path="/pin/:_id" component={Pin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default PinPage;
