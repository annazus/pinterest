import React from "react";
import Meteor from "meteor/meteor";
const Home = () => <div>Current User is {Meteor.user().username}</div>;
