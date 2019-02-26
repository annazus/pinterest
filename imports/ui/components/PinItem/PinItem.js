import React, { Component } from "react";
import { Link } from "react-router-dom";
class PinItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pin } = this.props;

    return (
      <Link to={`/pin/${pin._id}`}>
        <div className="pin-item">
          <img src={pin.url} className="pin-picture" />
          <h3 className="pin-title">{pin.title}</h3>
          <div id="hoverShow" />
        </div>
      </Link>
    );
  }
}
export default PinItem;
