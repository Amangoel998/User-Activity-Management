import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UserActivity from "./User_Activity";
import "bootstrap/dist/css/bootstrap.min.css";

function UserActivityModal(props) {
  const userData = props.activity;
  const [show, setShow] = useState(props.show);

  const toggle = () => setShow(!show);

  return (
    <Modal
      show={show}
      size="xl"
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-90w"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Activity of User:{" " + userData.real_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserActivity data={userData} />
      </Modal.Body>
      <Modal.Footer>
        <h2 className="float-left">{userData.tz}</h2>
        <Button
          onClick={() => {
            toggle();
            return props.close({
              hide: true,
              data: null,
            });
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UserActivityModal;
