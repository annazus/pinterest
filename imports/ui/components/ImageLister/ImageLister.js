import React, { Component } from "react";
import imageScraper from "../../../api/imageScraper";
import { Link, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
class ImageLister extends Component {
  constructor(props) {
    super(props);
  }

  savePic = pix => {
    Meteor.call("saveURL", pix, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    });
  };

  render() {
    // imageScraper("https://www.1stdibs.com", this.callbck);

    return (
      <ul>
        {this.props.images.map(item => (
          <li>
            <div onClick={() => this.savePic(item)}>
              <img src={item} />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

class SelectURL extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "", images: [] };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  Fetch = () => {
    Meteor.call("scrapeURL", this.state.url, (err, result) => {
      console.log(result);
      this.setState({ images: result });
    });
  };
  render() {
    return (
      <div>
        {/* <button onClick={this.savePic}>Save Pic</button> */}
        <input
          type="text"
          name="url"
          value={this.state.url}
          onChange={this.onChange}
          onBlur={this.Fetch}
        />
        <ImageLister images={this.state.images} />
      </div>
    );
  }
}
export default SelectURL;
