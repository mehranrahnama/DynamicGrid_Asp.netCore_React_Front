import PropTypes from "prop-types";
import React, { Component } from "react";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";


class Table extends Component {
 
  render() {
    const { columns, sortColumn, onSort, data, currentPage } = this.props;
    function tableBody() {
      if (data)
        return (
          <>
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              onSort={onSort}
            />
            <TableBody
              columns={columns}
              data={data}
              currentPage={currentPage}
            />
          </>
        );
      else {
        return (
          <h5 style={{ float: "right", textAlign: "center", width: "100%" }}>
            داده ای برای نمایش وجود ندارد
          </h5>
        );
      }
    }
    return (
      <table className="table hover table-sm table-bordered table-resizable ">
        {tableBody()}
      </table>
    );
  }
}

Table.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
