import PropTypes from "prop-types";
import React, { Component } from "react";

class TableBody extends Component {
  getPropValue(obj, path) {
    if (!path) {
      return obj;
    }

    const properties = path.split(".");
    return this.getPropValue(obj[properties.shift()], properties.join("."));
  }

  renderCell = (item, column) => {

    if (column.content) {

      return column.content(item);
    }
    //console.log(item)
    //console.log(column.path)
    return this.getPropValue(item, column.path);
  };

  createKey = (item, column) => {
    return item.elanatId + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map(column => {
              if (column.show == false)
                return;
              if (column.path == "RowNo") {
                
                return (
                  <td key={this.createKey(item, column)}>
                    {index+1+((this.props.currentPage-1)*10)}
                  </td>
                )
              }
              else
                return (
                  <td key={this.createKey(item, column)}>
                    {this.renderCell(item, column)}
                  </td>
                )
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default TableBody;
