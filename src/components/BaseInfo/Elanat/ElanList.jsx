import React, { Component } from "react";
import ElanService from "./ElanService";
import ElanTable from "./ElanTable";
import ElanForm from "./ElanForm";
import ElanFormTest from "./ElanFormTest";

class ElanList extends Component {
  state = {
    showModal: false,
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleSaveChangeNew = () => {
    alert('handleSaveChangeNew');
  };
  
  handleEdit = (payload, callback) => {
  
    ElanService.Delete(payload.LevelId).then(() => {
      
      if (typeof callback == "function") {
        callback();
      }
    })
  }
  render() {


    return (
      <>
        {/* <ElanForm key="a" handleClose={this.handleClose} show={this.state.showModal} /> */}
        <ElanForm show={this.state.showModal} handleClose={this.handleClose} />
        <div className="row">
          <div className="col my-3">
            <button variant="primary" className="btn btn-primary btn-shadow" style={{ float: "left" , margin_right:50 }} onClick={this.handleShow}>
              New
            </button>
          </div>
          <ElanTable onEdit={this.handleEdit} />
        </div>

      </>
    );
  }

}

export default ElanList;
