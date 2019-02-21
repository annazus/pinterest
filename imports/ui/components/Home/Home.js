import React from "react";
import { Meteor } from "meteor/meteor";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import Logout from "../Logout";
import PinPage from "../PinPage";
import PinBuilder from "../PinBuilder";

const Home = () => {
  console.log("test");
  console.log(Meteor.userId());
  return Meteor.userId() ? (
    <div>
      <div>
        <Logout />
      </div>
      <div>
        <Switch>
          <Route path="/" component={PinPage} />
          <Route path="/add" component={PinPage} />
        </Switch>
      </div>
    </div>
  ) : (
    <Redirect to="/Login" />
  );
};
export default Home;
