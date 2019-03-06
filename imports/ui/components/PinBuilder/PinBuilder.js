import React, { Component } from "react";
import { Pins } from "../../../api/pins";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import uuid from "uuid";
import ImageLister from "../ImageLister";
class PinBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPictures: false,
      saved: false,
      title: "",
      url: "",
      originURL: "",
      description: "",
      errors: [],
      image: {
        loading: false,
        loaded: false,
        progress: 0,
        tempUrl: "",
        url: ""
      }
    };
  }

  validate = () => {
    let err = [];
    this.setState({ errors: [] });
    if (this.state.image.loading) {
      err.push("Image is still uploading");
    } else if (!this.state.image.loaded) {
      err.push("You must select an image");
    }
    if (this.state.title.trim() === "") {
      err.push("Title is required");
    }

    this.setState({ errors: err.slice() });
    if (err.length > 0) return false;
    else return true;
  };

  addPin = e => {
    console.log("adding pin");
    e.preventDefault();
    if (!this.validate()) return;
    console.log(this.state);
    Pins.insert({
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      originURL: this.state.originURL,
      createdAt: new Date(),
      owner: Meteor.userId
    });

    this.setState({ saved: true });
  };
  updateField = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  fetchPictures = () => {
    if (this.state.originURL !== "") this.setState({ listPictures: true });
  };
  onSelectURL = url => {
    console.log(url);
    this.setState({
      listPictures: false,
      url: url,
      image: {
        loading: false,
        loaded: true,
        progress: 100,
        tempUrl: "",
        url: url
      }
    });
  };
  uploadFile = e => {
    console.log(e.target.value);
    e.preventDefault();
    const metaContext = { id: uuid() };
    let uploader = new Slingshot.Upload("pinterest-uploads", metaContext);
    this.setState({ image: { ...this.state.image, loading: true } });
    this.interval = setInterval(() => {
      const prg = Math.round(uploader.progress() * 100);
      console.log(prg);
      console.log(uploader.url(true));
      this.setState({
        image: {
          ...this.state.image,
          loading: true,
          progress: prg,
          tempUrl: uploader.url(true)
        }
      });

      this.setState({
        saved: false,
        progress: prg,
        tempUrl: uploader.url(true)
      });
    }, 50);

    console.log(uploader);
    uploader.send(e.target.files[0], (err, url) => {
      console.log(this.state);
      clearInterval(this.interval);
      this.setState({
        image: {
          ...this.state.image,
          loading: false,
          loaded: true,
          url: url,
          progress: 100
        }
      });

      // Log service detailed response.
      if (err) {
        console.error("Error uploading", uploader.xhr.response);
        console.log(err);
        return;
      }
      this.setState({
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
    console.log(this.state);
    return this.state.saved ? (
      <Redirect to="/" />
    ) : this.state.listPictures ? (
      <ImageLister url={this.state.originURL} onSelectURL={this.onSelectURL} />
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
        <div className="errors">
          <ul className="errors">
            {this.state.errors.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pin-info">
          <div className="pin-image-selector-frame">
            {this.state.image.loading || this.state.image.loaded ? (
              <div>
                <img
                  src={
                    this.state.image.loaded
                      ? this.state.image.url
                      : this.state.image.tempUrl
                  }
                  className="pin-image"
                />
                <h3 className="pin-label">
                  Progress:{this.state.image.progress}
                </h3>
              </div>
            ) : (
              <div>
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
              </div>
            )}
            <div className="pin-url">
              <input
                className="pin-title"
                type="text"
                name="originURL"
                placeholder="URL"
                value={this.state.originURL}
                onChange={this.updateField}
              />
              <button onClick={this.fetchPictures}>></button>
            </div>
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
