import PropTypes from "prop-types";
import React, { Component } from "react";
import ElanService from "./ElanService";
import ElanForm from "./ElanForm";

import Pagination3 from "../../common/pagination3";
import SearchBox from "../../common/searchBox";
import Alert from '../../common/Alert/Alert'
import Table from "../../common/table";

class ElanTable extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    entities: [],
    sortColumn: { path: "LevelId", order: "asc" },
    searchQuery: '',
    showModal: false,
    count: 0,
    currentCellId: 0
  };
  async componentDidMount() {

    await this.getData({ ...this.state });
  }

  columns = [
    {
      path: "RowNo",
      label: "RowNo"
    },
    {
      path: "messageTopic",
      label: "messageTopic"
    },
    { path: "messageText", label: "messageText" },
    { path: "dateFrom", label: "dateFrom" },
    { path: "dateTo", label: "dateTo" },
    
     {
      key: "edit",
      label: "edit",
      show: this.props.lov ? false : true,
      content: entity => (
        <button
          onClick={() => this.onEdit(entity)}
          className="btn btn-outline-primary btn-sm"
        >
          Edit
        </button>
      )
    },

    {
      key: "delete",
      label: "delete",
      show: this.props.lov ? false : true,
      content: entity => (
        <button
          onClick={() => this.onDelete(entity)}
          className="btn btn-outline-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  onEdit = (entity) => {
    // console.log(entity);
    let statecopy = { ...this.state };
    statecopy.showModal = true;
    statecopy.currentCellId = entity.ElanatId;
       
        this.setState(statecopy);
    //this.setState({ showModal: true, currentCellId: entity.tblElanatId });
   
  }


  onDelete = (entity) => {
    Alert.confirm().then((result) => {
      if (result.value) {
        ElanService.Delete(entity.ElanatId).then(() => {
          let list = { ...this.state.entities };
          let filterdList = Object.values(list).filter(item => item.ElanatId !== entity.ElanatId)
          this.setState({ entities: filterdList });
          Alert.sucsess();
        }).catch(() => {
          Alert.error();
        });
      }
    });

  
  }

 


  getData = (payload) => {

    ElanService.GetAll(payload.currentPage, payload.pageSize, payload.searchQuery, payload.sortColumn.path, payload.sortColumn.order)
      .then((response) => {
        let statecp = { ...this.state };
        statecp.sortColumn.path = response.data.SortBy;
        statecp.count = response.data.Count;
        statecp.searchQuery = response.data.Expression;
        statecp.currentPage = response.data.PageNum;
        statecp.entities = response.data.list;
        statecp.sortColumn.order = response.data.SortMethod;
        this.setState(statecp);
      });

  }



  pageChangeHandle = async (payload) => {
    var data = { ...this.state };
    data.currentPage = payload;
    this.setState({ currentPage: payload });
    this.getData(data);

  }
  searchBoxchange = async (payload) => {
    await this.setState({ searchQuery: payload });
  }
  search = () => {
    let data = { ...this.state }
    this.getData(data);
  }
  sortHandle = (payload) => {

    var data = { ...this.state }
    this.setState({ sortColumn: payload });
    data.sortColumn = payload;
    data.currentPage = 1;
    this.getData(data);
  }
  handleClose = () => {
    this.setState({ showModal: false });

  };

  render() {
    const editModal = () => {
     
      if (this.state.showModal)
      {
      
        return (
          < ElanForm key="bbbb"
            show={this.state.showModal}
            id={this.state.currentCellId}
            handleClose={this.handleClose} />
        )
      }
    }


    const grid = () => {
      if (this.state.entities) {
        return (
          <>
            {/* <div style={{overflowY:"scroll"}}> */}
            <Table
              columns={this.columns}
              currentPage={this.state.currentPage}
              sortColumn={this.state.sortColumn}
              onSort={this.sortHandle}
              data={this.state.entities}
            />
          
             <Pagination3
                totalRecords={this.state.count}
                pageLimit={10}
                pageNeighbours={2}
                onPageChanged={this.pageChangeHandle}
                currentPage={this.state.currentPage}
                handleMoveLeft = {this.handleMoveLeft}
                handleMoveRight = {this.handleMoveRight}
              />
          </>
        )
      }
      else {
        return (<h5 style={{ textAlign: "center", width: '100%' }}>no data to show</h5>)
      }

    }

    return (
      <>
        {editModal()}
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.searchBoxchange}
          search={this.search}
        />
        {grid()}
      </>
    );
  }
}

ElanTable.propTypes = {
 
};



export default ElanTable;
