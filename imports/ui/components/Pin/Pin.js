import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };
  }

  render() {
    return <div>Pin</div>;
  }
}
export default Pin;
