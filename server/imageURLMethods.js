import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";
import AWS from "aws-sdk";
import uuid from "uuid";

Meteor.methods({
  saveImageFromURL(imageURL) {
    if (!Meteor.isServer) return;

    const imageName = imageURL.match(/[0-9a-z]*.[a-z]+$/)[0];

    const key = uuid() + imageName;

    const resourceURL =
      Meteor.settings.aws_s3.BucketLocation +
      Meteor.settings.aws_s3.BucketName +
      "/" +
      key;

    let promise = new Promise(function(resolve, reject) {
      let result = HTTP.call("GET", imageURL, {
        npmRequestOptions: { encoding: null }
      });
      resolve(result.content);
    });

    return promise
      .then(data => {
        const s3 = new AWS.S3({
          apiVersion: "2006-03-01",
          accessKeyId: Meteor.settings.aws_s3.AWSAccessKeyId,
          secretAccessKey: Meteor.settings.aws_s3.AWSSecretAccessKey,
          region: Meteor.settings.aws_s3.Region
        });

        const objectParams = {
          Bucket: Meteor.settings.aws_s3.BucketName,
          Key: key,
          Body: data
        };

        return s3.putObject(objectParams).promise();
      })
      .then(data => {
        console.log("Successfully uploaded data to " + resourceURL);
        return resourceURL;
      });
  }
});
