import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";
import request from "request";
import AWS from "aws-sdk";
import uuid from "uuid";
Meteor.methods({
  saveURL(
    pictureURL = "https://a.1stdibscdn.com/cms/generic/CMS_GENERIC_IMAGE/1550874170_ctue1/1.jpg"
  ) {
    if (!Meteor.isServer) return;
    console.log(pictureURL);
    request.get({ url: pictureURL, encoding: null }, (e, r, b) => {
      //   console.log(r.headers["content-type"]);
      //   console.log(r.headers["content-disposition"]);
      //   console.log(r.headers["content-length"]);
      //   bin = Buffer.from(b, "binary");
      const bucketName = "appliedar-pinterest";
      const a = pictureURL.match(/[0-9a-z]*.[a-z]+$/);
      var objectParams = {
        Bucket: bucketName,
        // ContentEncoding: "base64",

        // ContentType: r.headers["content-type"],
        // ContentDisposition: r.headers["content-disposition"],
        // ContentLength: r.headers["content-length"],

        Key: uuid() + a[0],
        Body: b
      };
      // Create object upload promise
      var uploadPromise = new AWS.S3({
        apiVersion: "2006-03-01",
        accessKeyId: Meteor.settings.aws_s3.AWSAccessKeyId,
        secretAccessKey: Meteor.settings.aws_s3.AWSSecretAccessKey,
        region: "us-west-2"
      })
        .putObject(objectParams)
        .promise();
      uploadPromise.then(function(data) {
        console.log(data);
        console.log("Successfully uploaded data to " + bucketName + "/");
      });
    });

    //   .on("response", function(response) {
    //     console.log(response.statusCode); // 200
    //     console.log(response.headers["content-type"]); // 'image/png'
    //   })
    //   .pipe(fs.createWriteStream(doode.pngç));
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
