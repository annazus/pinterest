import React, { Component } from "react";

class PinItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pin } = this.props;
    return (
      <div>
        <h1>{pin.title}</h1>
        <p>{pin.description}</p>
      </div>
    );
  }
}
export default PinItem;
