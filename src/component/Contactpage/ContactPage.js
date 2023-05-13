import React from "react";
import { useSelector } from "react-redux";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { setSelectedData, deleteSelectedData } from "../Redux/formData";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./index.scss";
import { NavBar } from "../NavBar/NavBar";

function ContactPage() {
  const tableData = useSelector((state) => state?.reducer?.selectedData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [status, setStatus] = useState("");
  const [validateFirstName, setValidateFirstName] = useState(false);
  const [validateLastName, setValidateLastName] = useState(false);
  const imgurl = require("../assets/profile.jpg");
  const crossurl = require("../assets/remove.png");

  const handleClose = () => setShow(false);
  const handelOpen = () => {
    setfirstName("");
    setlastName("");
    setStatus("");
    setShow(true);
  };
  const deleteForm = (indexx) => {
    let data = [];
    data = tableData.filter((item, index) => index !== indexx);
    dispatch(deleteSelectedData(data));
  };
  const EditForm = (data, index) => {
    setfirstName(data.firstName);
    setlastName(data.lastName);
    setStatus(data.status);
    setShow(true);

    deleteForm(index);
  };

  const submitForm = () => {
    if (firstName.length < 2 && lastName.length < 2) {
      setValidateFirstName(true);
      setValidateLastName(true);
    } else if (lastName.length < 2) {
      setValidateLastName(true);
    } else if (firstName.length < 2) {
      setValidateFirstName(true);
    } else {
      dispatch(setSelectedData({ firstName, lastName, status }));
      setShow(false);
    }
  };

  return (
    <>
      <div className="main-conatiner">
        <div className="container-left">
          <NavBar />
        </div>

        <div className="container-right">
          <div className="nav-bar">
            <div>
              <h4>Contact Page</h4>
            </div>
          </div>
          <hr class="solid" />

          <div class="contain-center">
            <Button variant="primary" onClick={(e) => handelOpen()}>
              Create Contact
            </Button>
            <br />
            <br />
            {tableData?.length > 0 ? (
              <div>
                <Row xs={1} md={3} className="g-4 item-center">
                  {tableData.map((data, index) => (
                    <Col>
                      <Card>
                        <Card.Img variant="top" src={imgurl} />
                        <Card.Body>
                          <Card.Title>
                            First Name : {data?.firstName}
                          </Card.Title>
                          <Card.Text>Last Name : {data?.lastName}</Card.Text>
                          <Card.Text>Status : {data?.status}</Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => EditForm(data, index)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteForm(index)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <Row xs={1} md={3} className="g-4 item-center">
                <Col>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={crossurl}
                      style={{
                        width: "110px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>No Contact Found </Card.Title>
                      <Card.Text>
                        Please add contact from Create Contact Button
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Contact Screen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required="true"
                value={firstName}
                placeholder="Hussain"
                onChange={(e) => {
                  setfirstName(e.target.value);
                  setValidateFirstName(false);
                }}
                autoFocus
              />
              {validateFirstName && (
                <Form.Label style={{ color: "red" }}>
                  Please Enter minimum 2 character
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hussain"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                  setValidateLastName(false);
                }}
                autoFocus
              />
              {validateLastName && (
                <Form.Label style={{ color: "red" }}>
                  Please Enter minimum 2 character
                </Form.Label>
              )}
              <br />
              <Form.Label>Status :</Form.Label>
              <Form.Check
                type="radio"
                id="status"
                name="group1"
                value="Active"
                checked={eval(status == "Active" ? true : false)}
                onClick={(e) => setStatus(e.target.value)}
                label="Active"
              />
              <Form.Check
                type="radio"
                id="status"
                name="group1"
                checked={eval(status == "Inactive" ? true : false)}
                value="Inactive"
                onClick={(e) => setStatus(e.target.value)}
                label="Inactive"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitForm}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContactPage;
