import React, { Component } from "react";
import { Pins } from "../../../api/pins";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import uuid from "uuid";
class Pin extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    console.log(props);
    if (props.pin.length === 0) return;
    this.state = {
      saved: false,
      title: props.pin[0].title,
      url: props.pin[0].url,
      description: props.pin[0].description
    };
  }

  updatePin = e => {
    console.log("updating pin");
    e.preventDefault();
    console.log(this.state);
    Pins.update(
      {
        _id: this.props._id
      },
      {
        $set: {
          title: this.state.title,
          description: this.state.description,
          updatedAt: new Date()
        }
      }
    );

    this.setState({ saved: true });
  };

  deletePin = e => {
    Pins.remove({ _id: this.props._id });
    this.setState({ saved: true });
  };

  cancelPin = e => {
    this.setState({ saved: true });
  };
  updateField = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    console.log(this.state);
  };

  componentDidUpdate() {
    if (this.interval && this.state.progress > 100)
      clearInterval(this.interval);
  }
  componentDidUpdate() {}
  componentDidMount() {}
  render() {
    console.log("render");

    console.log(this.props);
    if (this.props.pin.length === 0) return "";
    const pin = this.props.pin[0];

    return this.state.saved ? (
      <Redirect to="/" />
    ) : (
      <form className="pin-builder">
        <div className="pin-builder-button-row">
          <button
            value="Delete"
            className="pin-builder-delete"
            onClick={this.deletePin}
          >
            Delete
          </button>
          <button className="pin-builder-cancel" onClick={this.cancelPin}>
            Cancel
          </button>
          <button
            value="Save"
            className="pin-builder-update"
            onClick={this.updatePin}
          >
            Save
          </button>
        </div>
        <div className="pin-info">
          <div className="pin-image-frame">
            <img src={pin.url} className="pin-image" />
          </div>

          <div className="pin-details">
            <input
              className="pin-title"
              type="text"
              name="title"
              placeholder="Add a title"
              value={this.state.title}
              required
              onChange={this.updateField}
            />
            <textarea
              className="pin-description"
              name="description"
              rows="4"
              required
              cols="50"
              value={this.state.description}
              placeholder="Say more about this Pin"
              onChange={this.updateField}
            />
          </div>
        </div>
      </form>
    );
  }
}
export default withTracker(props => {
  console.log("withTracker");
  const { match } = props;
  console.log(match);

  const { _id } = match.params;
  console.log(_id);
  pin = Pins.find({ _id: _id }).fetch();

  return {
    currentUser: Meteor.user(),
    pin: pin,
    _id: _id
  };
})(Pin);
