import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
const Menu = () => {
  return (
    <Fragment>
      <div className="menu-row">
        <img src="images/logo.svg" alt="logo" className="logo" />
        <div className="menu-end">
          <Link to="/pin-builder" className="add-pin">
            <img src="images/add.svg" alt="add pin" />
          </Link>
          <Logout className="logout" />
        </div>
      </div>{" "}
      <div className="menu-border" />
    </Fragment>
  );
};
export default Menu;
