import PropTypes from "prop-types";
import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) {
      classes += "-o";
    }
    return (
      <i
        className={classes}
        onClick={this.props.onClick}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
      ></i>
    );
  }
}

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Like;
