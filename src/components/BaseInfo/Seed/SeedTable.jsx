import PropTypes from "prop-types";
import React, { Component } from "react";
//import { Link } from "react-router-dom";
// import Checkbox from '../../common/Checkbox'
import SeedService from "./SeedService";
//import ListGroup from "../common/listGroup";
import Pagination from "../../common/pagination";
import SearchBox from "../../common/searchBox";
import Alert from "../../common/Alert/Alert";
import Table from "../../common/table";
import SeedForm from "./SeedForm";
class SeedTable extends Component {
  state = {
    //data: { username: "", password: "", name: "" },
    // errors: {},
    pageSize: 10,
    currentPage: 1,
    entities: [],
    sortColumn: { path: "SeedId", order: "asc" },
    searchQuery: "",
    showModal: false,
    count: 0,
    currentCellId: 0,
  };

  async componentDidMount() {
    await this.getData({ ...this.state });
  }
  columns = [
    {
      path: "RowNo",
      label: "ردیف",
    },
    // {
    //   path: "LevelId", label: "شناسه"
    // },
    {
      path: "Name",
      label: "نام بذر",
    },
    {
      path: "DesLevel",
      label: "عنوان کمیته",
    },

    {
      path: "StartDate",
      label: "تاریخ شروع",
    },
    {
      path: "EndDate",
      label: "تاریخ پایان",
    },
    {
      key: "ویرایش",
      label: "ویرایش",
      show: this.props.lov ? false : true,
      content: (entity) => (
        <button
          onClick={() => this.onEdit(entity)}
          className="btn btn-outline-primary btn-sm"
        >
          ویرایش
        </button>
      ),
    },

    {
      key: "حذف",
      label: "حذف",
      show: this.props.lov ? false : true,
      content: (entity) => (
        <button
          onClick={() => this.onDelete(entity)}
          className="btn btn-outline-danger btn-sm"
        >
          حذف
        </button>
      ),
    },
    {
      key: "SeedId",
      label: "انتخاب",
      show: this.props.lov ? true : false,
      content: (entity) => (
        <button
          onClick={() => this.props.getValue(entity)}
          className="btn btn-outline-primary btn-sm"
        >
          <i className="pe-7s-check" />
        </button>
      ),
    },
  ];

  onDelete = (entity) => {
    Alert.confirm().then((result) => {
      if (result.value) {
        SeedService.Delete(entity.LevelId)
          .then(() => {
            let list = { ...this.state.entities };
            let filterdList = Object.values(list).filter(
              (item) => item.LevelId !== entity.LevelId
            );
            this.setState({ entities: filterdList });
            Alert.sucsess();
          })
          .catch(() => {
            Alert.error();
          });
      }
    });

    // if (flg) {
    //   let list = { ...this.state.entities };
    //   let filterdList = Object.values(list).filter(item => item.LevelId !== payload.LevelId)
    //   this.setState({ entities: filterdList });
    // }
  };

  onEdit = (entity) => {
    this.setState({ showModal: true, currentCellId: entity.LevelId });
  };

  getData = (payload) => {
  
    if (this.props.lov) {
      if (this.props.CommitteeId) {
       
        SeedService.GetByCommitteeId(
          this.props.CommitteeId,
          payload.currentPage,
          payload.pageSize,
          payload.searchQuery,
          payload.sortColumn.path,
          payload.sortColumn.order
        ).then((response) => {
          let statecp = { ...this.state };
          statecp.sortColumn.path = response.data.SortBy;
          statecp.count = response.data.Count;
          statecp.searchQuery = response.data.Expression;
          statecp.currentPage = response.data.PageNum;
          statecp.entities = response.data.list;
          statecp.sortColumn.order = response.data.SortMethod;
          this.setState(statecp);
        });
      } else {
        return;
      }
    } else {
      SeedService.GetAll(
        payload.currentPage,
        payload.pageSize,
        payload.searchQuery,
        payload.sortColumn.path,
        payload.sortColumn.order
      ).then((response) => {
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
  };

  pageChangeHandle = async (payload) => {
    var data = { ...this.state };
    data.currentPage = payload;
    this.setState({ currentPage: payload });
    this.getData(data);
  };
  searchBoxchange = async (payload) => {
    await this.setState({ searchQuery: payload });
  };
  search = () => {
    let data = { ...this.state };
    this.getData(data);
  };
  sortHandle = (payload) => {
    var data = { ...this.state };
    this.setState({ sortColumn: payload });
    data.sortColumn = payload;
    data.currentPage = 1;
    this.getData(data);
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const editModal = () => {
      if (this.state.showModal)
        return (
          <SeedForm
            key="bbbb"
            show={this.state.showModal}
            id={this.state.currentCellId}
            handleClose={this.handleClose}
          />
        );
    };

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
            {/* </div> */}
            <Pagination
              itemsCount={this.state.count}
              pageSize={this.state.pageSize}
              onPageChange={this.pageChangeHandle}
              currentPage={this.state.currentPage}
            />
          </>
        );
      } else {
        return (
          <h5 style={{ textAlign: "center", width: "100%" }}>
            داده ای برای نمایش وجود ندارد
          </h5>
        );
      }
    };

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

export default SeedTable;
