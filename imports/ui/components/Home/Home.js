import React from "react";
import { Meteor } from "meteor/meteor";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import Logout from "../Logout";
import PinPage from "../PinPage";
import Pin from "../Pin";
import SecureRoute from "../SecureRoute";
import PinBuilder from "../PinBuilder";
import Menu from "../Menu";

const Home = () => {
  return Meteor.userId() ? (
    <div>
      <div>
        <Menu />
        <Logout />
      </div>
      <div>
        <Switch>
          <SecureRoute exact path="/" component={PinPage} />
          <SecureRoute path="/pin-builder" component={PinBuilder} />
          <SecureRoute path="/pin/:_id" component={Pin} />
        </Switch>
      </div>
    </div>
  ) : (
    <Redirect to="/Login" />
  );
};
export default Home;
