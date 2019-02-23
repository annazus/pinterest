import React, { Component } from "react";
import { Link } from "react-router-dom";
class PinItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="pin-item">
        {/* <h1>{pin.title}</h1>
        <p>{pin.description}</p> */}
        <Link to={`/pin/${pin._id}`}>
          <img src={pin.url} className="pin-picture" />
        </Link>
      </div>
    );
  }
}
export default PinItem;
