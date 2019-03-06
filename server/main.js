import { Meteor } from "meteor/meteor";
import "../imports/api/users/users";
import "../imports/api/pins.js";
import "./imageScraper";
import "../imports/api/slingshot";
Meteor.startup(() => {});
// imageScraper("https://www.1stdibs.com");
