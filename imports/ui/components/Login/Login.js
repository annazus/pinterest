import React from "react";
import "./Login.css";
const Login = ({ onLoginSubmit }) => {
  return (
    <button onClick={onLoginSubmit} className="button">
      Log in
    </button>
  );
};

export default Login;
