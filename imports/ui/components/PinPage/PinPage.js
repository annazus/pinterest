import React, { Component } from "react";

import PinBoard from "../PinBoard";
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
            <Link to="/add">Add Pin</Link>
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={PinBoard} />
              <Route path="/add" component={PinBuilder} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default PinPage;
