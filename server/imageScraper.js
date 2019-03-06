import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";
import request from "request";
import AWS from "aws-sdk";
import uuid from "uuid";

var requestSync = Meteor.wrapAsync(function(url, callback) {
  request(url, function(error, response, body) {
    callback(error, { response: response, body: body });
  });
});

Meteor.methods({
  saveURL(
    pictureURL = "https://a.1stdibscdn.com/cms/generic/CMS_GENERIC_IMAGE/1550874170_ctue1/1.jpg"
  ) {
    let resourceURL = "";
    const bucketName = "appliedar-pinterest";
    const a = pictureURL.match(/[0-9a-z]*.[a-z]+$/);
    const key = uuid() + a[0];

    resourceURL =
      "https://s3-us-west-2.amazonaws.com/" + bucketName + "/" + key;
    if (!Meteor.isServer) return;
    // let { response, body } = await request.get({
    //   url: pictureURL,
    //   encoding: null
    // });
    // console.log(response);
    // console.log(body);
    let r_url = "";
    console.log(pictureURL);

    let { response, body } = requestSync({ url: pictureURL, encoding: null });
    console.log(body);
    console.log("5");

    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      accessKeyId: Meteor.settings.aws_s3.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.aws_s3.AWSSecretAccessKey,
      region: "us-west-2"
    });
    // Create object upload promise
    var objectParams = {
      Bucket: bucketName,
      Key: key,
      Body: response.body
    };
    var uploadPromise = s3.putObject(objectParams).promise();
    r_url = uploadPromise.then(function(data) {
      console.log("Successfully uploaded data to " + bucketName + "/" + key);
      console.log("3");

      console.log(resourceURL);
      return resourceURL;
    });
    return r_url;
  },
  scrapeURL(url) {
    console.log("calling");
    if (!Meteor.isServer) return;
    const result = HTTP.call(
      "GET",
      url
      //   (err, result) => {
      //     console.log(result.content);
      //     // callbck(err, result);
      //   }
    );
    // console.log(result.content);
    var re_img = new RegExp("https+://[0-9a-zA-Z./_]+jpg", "g");
    arr = result.content.match(re_img);
    if (arr) {
      //   console.log(arr.length);
      //   for (var i = 0; i < arr.length; i++) {
      //     console.log(arr[i]);
      // }
      return arr;
    } else {
      console.log("no match");
      return [];
    }
    return arr;
  }
});
