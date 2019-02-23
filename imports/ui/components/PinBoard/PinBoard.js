import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PinItem from "../PinItem";
import { Pins } from "../../../api/pins";

class PinBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pin-board">
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
