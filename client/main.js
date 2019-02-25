import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import App from "../imports/ui/App";
// import "../imports/api/slingshot";
import { BrowserRouter } from "react-router-dom";
Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("render-target")
  );
});
