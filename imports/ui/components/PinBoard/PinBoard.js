import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PinItem from "../PinItem";
import { Pins } from "../../../api/pins";
import uuid from "uuid/v4";

class PinBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(uuid());
    return (
      <div>
        {this.props.pins.map(item => (
          <PinItem pin={item} />
        ))}
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    pins: Pins.find({}).fetch()
  };
})(PinBoard);
