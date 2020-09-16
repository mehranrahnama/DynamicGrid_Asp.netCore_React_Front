import PropTypes from "prop-types";
import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.items.map(item => (
          <li
            key={item[this.props.valueProperty]}
            className={
              item === this.props.selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => this.props.onItemSelect(item)}
          >
            {item[this.props.textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default ListGroup;
