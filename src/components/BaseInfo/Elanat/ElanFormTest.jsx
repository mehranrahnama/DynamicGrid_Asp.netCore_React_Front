import React from "react";
import Form from "../../common/form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ElanService from "./ElanService";
import ElanList from "./ElanList";


class ElanFormTest extends Form {

      state = {
        message: { messageTopic: "", messageText: "" }
      };

  async componentDidMount() {
  }

  handleSave = () => {
    ElanService.saveElanat({messageTopic:this.state.message.messageTopic,
      messageText:this.state.message.messageText})
   .then(json => {  
  alert("Data Save Successfully");   
  this.props.history.push('/ElanList')  
})  
  };

  handleChange = ({ currentTarget: input }) => 
  {
    const message = { ...this.state.message }; //cloning an object
    message[input.name] = input.value;
    this.setState({ message });
  };
 
  render() {
    const { message } = this.state;
    return (
      <div>
       
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
     
         <form >
       
        <div className="form-group">
          <label htmlFor="messageTopic">messageTopic</label>
          <input id="messageTopic"  name="messageTopic"  value={message.messageTopic}
           onChange={this.handleChange} type="text" className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="messageText">messageText</label>
          <input id="messageText"  name="messageText"   value={message.messageText}
            onChange={this.handleChange} type="text" className="form-control" 
          />
        </div> 
        <button className="btn btn-primary"  onClick={this.handleSave}>Save</button>
        </form>


          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              close
            </Button>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ElanFormTest;
