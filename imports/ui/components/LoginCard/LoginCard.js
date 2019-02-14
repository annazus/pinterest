import React from "react";

const LoginCard = () => (
  <div className="registration-card">
    <header>
      <h1>Welcome back!</h1>
    </header>
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Continue</button>
    </form>
    <a href="#" className="login-switch">
      Need an account? Sign up now.
    </a>
  </div>
);

export default LoginCard;
