import React from "react";

const RegistrationCard = () => (
  <div className="registration-card">
    <header>
      <h1>Sign up to see more</h1>
      <p>Access best ideas with a free account</p>
    </header>
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Create a password" />
      <input type="text" placeholder="Age" />
      <button>Continue</button>
    </form>
    <a href="#" className="login-switch">
      Already a member? Log in
    </a>
  </div>
);

export default RegistrationCard;
