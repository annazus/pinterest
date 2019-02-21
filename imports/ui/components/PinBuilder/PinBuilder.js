import React, { Component } from "react";
import { Pins } from "../../../api/pins";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import uuid from "uuid";
class PinBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { saved: false };
  }

  addPin = e => {
    console.log("adding pin");
    e.preventDefault();
    Pins.insert({
      title: "new",
      description: "new one",
      createdAt: new Date(),
      owner: Meteor.userId
    });

    this.setState({ saved: true });
  };

  uploadFile = e => {
    console.log(e.target.value);
    e.preventDefault();
    const metaContext = { id: uuid() };
    let uploader = new Slingshot.Upload("pinterest-uploads", metaContext);
    this.interval = setInterval(() => {
      const prg = Math.round(uploader.progress() * 100);
      console.log(prg);
      console.log(uploader.url(true));
      this.setState({
        saved: false,
        progress: prg,
        url: uploader.url(true)
      });
    }, 50);

    console.log(uploader);
    uploader.send(e.target.files[0], function(err, url) {
      if (this.interval) interval.clear();
      // Log service detailed response.
      if (err) {
        console.error("Error uploading", uploader.xhr.response);
        console.log(err);
        return;
      }

      console.log(url);
    });
  };
  render() {
    return this.state.saved ? (
      <Redirect to="/" />
    ) : (
      <div>
        <h1>Pin Builder</h1>
        <h3>Progress:{this.state.progress}</h3>
        <img src={this.state.url} />
        <form>
          <button onClick={this.addPin}>Save</button>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg,image/jpg"
            onChange={this.uploadFile}
          />

          <input type="text" name="title" placeholder="Enter title" />
          <textarea name="description" rows="4" />
        </form>
      </div>
    );
  }
}
export default PinBuilder;
