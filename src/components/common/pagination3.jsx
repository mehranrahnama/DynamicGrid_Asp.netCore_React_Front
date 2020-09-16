import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

class Pagination3 extends Component {

    fetchPageNumbers = () => {

        const totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
      //  console.log("totalPages in Pagination3 : " + totalPages );// = 25  totalRecords =100 , pageLimit = 4
   
        const currentPage = this.props.currentPage;
        const pageNeighbours = 2;// this.pageNeighbours;
    
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = 7;//(this.pageNeighbours * 2) + 3;
        //console.log("totalNumbers in  Pagination3 : " + totalNumbers );

        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
    
          const startPage = Math.max(2, currentPage - pageNeighbours);
          const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
          
          let pages = range(startPage, endPage);
    
          /**
           * hasLeftSpill: has hidden pages to the left
           * hasRightSpill: has hidden pages to the right
           * spillOffset: number of hidden pages either to the left or to the right
           */
          const hasLeftSpill = startPage > 2;
          const hasRightSpill = (totalPages - endPage) > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
              const extraPages = range(startPage - spillOffset, startPage - 1);
              pages = [LEFT_PAGE, ...extraPages, ...pages];
              break;
            }
    
            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
              const extraPages = range(endPage + 1, endPage + spillOffset);
              pages = [...pages, ...extraPages, RIGHT_PAGE];
              break;
            }
    
            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
              pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
              break;
            }
          }
    
          return [1, ...pages, totalPages];
    
        }
    
        return range(1, totalPages);
    
      }


    render() {
        const  currentPage  = this.props.currentPage;
       // console.log("currentPage  in pagination3 in render :  "  + currentPage);
        const pages = this.fetchPageNumbers();

     //const pages = this.getPageNumbersArray();
        if (!pages) {
        return null;
        }
        
    return (

        <Fragment>
            <nav aria-label="Countries Pagination">
              <ul className="pagination">
                {pages.map((page, index) => {
                  if (page === LEFT_PAGE)
                    return (
                      <li key={index} className="page-item">
                     
                        <Link  className="page-link"
                        to="#"
                        aria-label="Previous"
                          onClick={this.props.handleMoveLeft}
                        > 
                       <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                      </Link>

                      </li>
                    );
    
                  if (page === RIGHT_PAGE)
                    return (
                      <li key={index} className="page-item">
                       

                        <Link  className="page-link"
                        to="#"
                        aria-label="Next"
                        onClick={this.props.handleMoveRight}
                        > 
                       <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                      </Link>


                      </li>
                    );
    
                  return (
                    <li
                      key={index}
                      className={`page-item${
                        currentPage === page ? " active" : ""
                      }`}
                    >
                       <Link  className="page-link"
                        to="#"
                        onClick={() => this.props.onPageChanged(page)}
                      > {page}
                      </Link>
                      
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Fragment>


    );
  }




  getPageNumbersArray() {

   // const { itemsCount, pageSize } = this.props;
    const totalRecords = this.props.totalRecords;
    const pageSize = 10;// this.props.pageLimit;
   // console.log("totalRecords  in pagination3 :  "  + totalRecords);
    const pagesCount = Math.ceil(totalRecords / pageSize);
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

Pagination3.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  //pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
 // onPageChange: PropTypes.func.isRequired
};

export default Pagination3;
