import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import ImageLister from "../ImageLister";
import { Meteor } from "meteor/meteor";
class SelectURL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      selectedPicture:
        "https://s3-us-west-2.amazonaws.com/appliedar-pinterest/75c30c01-1656-4424-8dc9-8f0a88c016492.jpg",
      listImages: false
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  onSelectURL = pic => {
    this.setState({ selectedPicture: pic, url: "", listImages: false });
  };

  render() {
    return (
      <div>
        {/* <button onClick={this.savePic}>Save Pic</button> */}

        {!this.state.listImages ? (
          <div>
            <input
              className="url-list-input"
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.onChange}
              //   onBlur={this.Fetch}
            />
            <button
              className="url-list-get"
              onClick={() => {
                this.setState({ listImages: true });
              }}
            >
              >
            </button>

            <img src={this.state.selectedPicture} />
          </div>
        ) : (
          <ImageLister url={this.state.url} onSelectURL={this.onSelectURL} />
        )}
      </div>
    );
  }
}
export default SelectURL;
