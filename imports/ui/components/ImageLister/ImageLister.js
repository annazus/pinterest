import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
class ImageLister extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  savePic = pix => {
    Meteor.call("saveURL", pix, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("saveURL");

      console.log(result);
      this.props.onSelectURL(result);
    });
  };

  fetchImages = () => {
    Meteor.call("scrapeURL", this.props.url, (err, result) => {
      console.log(result);
      this.setState({ images: result });
    });
  };

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    return this.state.images.length === 0 ? (
      <span>No images found</span>
    ) : (
      <ul>
        {this.state.images.map(item => (
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

export default ImageLister;
