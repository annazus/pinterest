import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  scrapeURL(url) {
    if (!Meteor.isServer) return;
    const result = HTTP.call("GET", url);
    var re_img = new RegExp("https+://[0-9a-zA-Z./_]+jpg", "g");
    arr = result.content.match(re_img);
    if (arr) {
      return arr;
    } else {
      console.log("no match");
      return [];
    }
  }
});
