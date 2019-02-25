import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../Login";
import { Meteor } from "meteor/meteor";

const SecureRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Meteor.userId() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default SecureRoute;
