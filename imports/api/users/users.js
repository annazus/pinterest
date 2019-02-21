import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "user.register"(data, callback) {
    Accounts.createUser({ email: data.email, password: data.password }),
      callback;
  },
  "user.login"(data, callback) {
    Meteor.loginWithPassword();
  }
});
