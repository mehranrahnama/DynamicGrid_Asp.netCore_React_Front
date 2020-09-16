import PropTypes from "prop-types";
import React, { Component } from "react";
import { constrainPoint } from "fullcalendar";
import $ from "jquery";
import  "./sizable.css";
class TableHeader extends Component {

  componentDidMount() {

    $(function() {
         var startX,
         startWidth,
         $handle,
         $table,
         pressed = false;
      
      $(document).on({
        mousemove: function(event) {
          if (pressed) {
            $handle.width(startWidth + (event.pageX - startX));
          }
        },
        mouseup: function() {
          if (pressed) {
            $table.removeClass('resizing');
            pressed = false;
          }
        }
      }).on('mousedown', '.table-resizable th', function(event) {
        $handle = $(this);
        pressed = true;
        startX = event.pageX;
        startWidth = $handle.width();
        
        $table = $handle.closest('.table-resizable').addClass('resizing');
      }).on('dblclick', '.table-resizable thead', function() {
        // Reset column sizes on double click
        $(this).find('th[style]').css('width', '');
      });
    });
   }



  raiseSort = path => {
    if (!path || path=="RowNo") {
      return;
    }

    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {

      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";

    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";

    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }

    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => {
          
            if(column.show==false)
            return ;
            else
            return (
              <th 
                key={index}
                style={{ }}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            )
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired
};

export default TableHeader;
