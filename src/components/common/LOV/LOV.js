import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import Form from 'react-bootstrap/Form';

const LOV = (props) => {
    const [show, setShow] = useState(false);
    const { value, valueToShow, cb } = props;
    const LovComponent = props.tableComponent;
    //const [modalValue, setModalValue] = useState({ id: 0, text: "" });
    function openLOV() {
        setShow(true);
    }
    function closeLov() {
        setShow(false);
    }
    function getValue(payload) {
        // setModalValue({ id: payload.id, text: payload.text });
        cb(payload);
        closeLov();
    }

    function lovButton() {
        if (value) {
            return (<button className="btn btn-outline-danger" onClick={() => cb(null)} >
                <i className="pe-7s-close"></i>
            </button >);
        }
        else {
            return (<button className="btn btn-outline-primary" onClick={openLOV}><i className="pe-7s-search"></i></button>);
        }
    }

    return (
        <>
            <Modal size="lg" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton onClick={closeLov}>
                    <Modal.Title>لیست انتخاب</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LovComponent {...props} lov getValue={getValue} />
                </Modal.Body>

            </Modal>
            <div className="input-group">
                <Form.Control type="text" style={{ textAlign: "right" }}
                    required value={value && valueToShow ? value[valueToShow] : ""}  onChange={()=>{}}  />
                {lovButton()}
                <Form.Control.Feedback type="invalid">فیلد اجباری</Form.Control.Feedback>
            </div>
        </>
    );
}
export default LOV;