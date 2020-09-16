import Joi from "@hapi/joi";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";

import Form from "../../common/form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LOV from "../../common/LOV/LOV";
import SeedTable from "../Seed/SeedTable";

const SeedForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [valueLov, setValueLov] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>ثبت بذر</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div>
            <Form.Row>
              <Form.Group as={Col} md="5">
                <Form.Label> بذر</Form.Label>
                <LOV
                  tableComponent={SeedTable}
                  value={valueLov}
                  valueToShow={"DesLevel"}
                  cb={(data) => {
                    setValueLov(data);
                  }}
                ></LOV>
              </Form.Group>
            </Form.Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-shadow"
            onClick={props.handleClose}
          >
            بستن
          </Button>
          <input
            type="submit"
            className="btn btn-primary btn-shadow"
            value="ثبت"
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SeedForm;
