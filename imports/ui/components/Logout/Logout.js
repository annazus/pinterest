import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };
  }
  componentDidMount() {
    this.setState({ loggedIn: Meteor.userId() ? true : false });
  }
  render() {
    return !this.state.loggedIn ? (
      <Redirect to="/Login" />
    ) : (
      <button
        className="logout"
        onClick={e => {
          e.preventDefault();
          Meteor.logout();
          console.log("Logging out");
          this.setState({ loggedIn: false });
        }}
      >
        Logout
      </button>
    );
  }
}
export default Logout;
