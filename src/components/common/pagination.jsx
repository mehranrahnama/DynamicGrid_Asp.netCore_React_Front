import PropTypes from "prop-types";
import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const pages = this.getPageNumbersArray();
    if (!pages) {
      return null;
    }

    

    return (
      <nav style={{marginRight:"auto",marginLeft:"auto"}}>
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === this.props.currentPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                onClick={() => this.props.onPageChange(page)}
                style={{ cursor: "pointer" }}
                className="page-link"
                href="#"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  getPageNumbersArray() {
    const { itemsCount, pageSize } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) {
      return null;
    }

    const pages = new Array();
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return pages;
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
