import React, { Component } from "react";
import { Pins } from "../../../api/pins";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import uuid from "uuid";
class PinBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { saved: false, title: "", url: "", description: "" };
  }

  addPin = e => {
    console.log("adding pin");
    e.preventDefault();
    console.log(this.state);
    Pins.insert({
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      createdAt: new Date(),
      owner: Meteor.userId
    });

    this.setState({ saved: true });
  };
  updateField = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    console.log(this.state);
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
        ...this.state,
        saved: false,
        progress: prg,
        tempUrl: uploader.url(true)
      });
    }, 50);

    console.log(uploader);
    uploader.send(e.target.files[0], (err, url) => {
      console.log(this.state);
      clearInterval(this.interval);
      // Log service detailed response.
      if (err) {
        console.error("Error uploading", uploader.xhr.response);
        console.log(err);
        return;
      }
      this.setState({
        ...this.state,
        progress: 100,
        url: url
      });
      console.log(url);
    });
  };
  componentDidUpdate() {
    if (this.interval && this.state.progress > 100)
      clearInterval(this.interval);
  }

  render() {
    console.log(this.props);
    return this.state.saved ? (
      <Redirect to="/" />
    ) : (
      <form className="pin-builder">
        <div className="pin-builder-save-row">
          <button
            value="Save"
            className="pin-builder-save"
            onClick={this.addPin}
          >
            Save
          </button>
        </div>
        <div className="pin-info">
          <div className="pin-image-selector-frame">
            <input
              required
              className="pin-image-selector-input "
              type="file"
              id="pin-image"
              name="pin-image"
              accept="image/png, image/gif/,image/jpeg,image/jpg"
              onChange={this.uploadFile}
            />
            <label for="pin-image" className="pin-image-selector">
              Click to upload
            </label>
            {/* <img src={this.state.tempUrl} />
            <h3>Progress:{this.state.progress}</h3> */}
          </div>

          <div className="pin-details">
            <input
              className="pin-title"
              type="text"
              name="title"
              placeholder="Add a title"
              required
              onChange={this.updateField}
            />
            <textarea
              className="pin-description"
              name="description"
              rows="4"
              required
              cols="50"
              placeholder="Say more about this Pin"
              onChange={this.updateField}
            />
          </div>
        </div>
      </form>
    );
  }
}
export default PinBuilder;
