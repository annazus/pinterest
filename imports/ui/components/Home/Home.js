import React, { Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import PinPage from "../PinPage";
import Pin from "../Pin";
import SecureRoute from "../SecureRoute";
import PinBuilder from "../PinBuilder";
import Menu from "../Menu";
import SelectURL from "../ImageLister";

const Home = () => {
  return Meteor.userId() ? (
    <Fragment>
      <Menu />
      <SelectURL />

      <Switch>
        <SecureRoute exact path="/" component={PinPage} />
        <SecureRoute path="/pin-builder" component={PinBuilder} />
        <SecureRoute path="/pin/:_id" component={Pin} />
        <SecureRoute component={PinPage} />
      </Switch>
    </Fragment>
  ) : (
    <Redirect to="/Login" />
  );
};
export default Home;
