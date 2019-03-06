import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import ImageLister from "../ImageLister";
import { Meteor } from "meteor/meteor";
class SelectURL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      selectedPicture: ""
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  onSelectURL = pic => {
    this.setState({ selectedPicture: pic, url: "", listImages: false });
  };
  onClickURL = () => {};

  render() {
    return (
      <div>
        <div>
          <input
            className="url-list-input"
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.onChange}
          />
          <button
            className="url-list-get"
            onClick={() => {
              this.setState({ listImages: true });
            }}
          >
            >
          </button>
        </div>
        )
      </div>
    );
  }
}
export default SelectURL;
