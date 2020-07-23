import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import UserActivityModal from ".//User_Activity_Modal";
import UsersList from "./Users_List";

function Home() {
  const [showActivity, setShow] = useState({
    hide: true,
    data: null,
  });

  return (
    <div>
      {!showActivity.hide ? (
        <UserActivityModal
          show={!showActivity.hide}
          close={setShow}
          activity={showActivity.data}
          // onShow={()=>{console.log("heyheye")}}
          onHide={() => setShow({ hide: true, data: null })}
        />
      ) : null}
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "100%" }} className="mt-5 mb-5">
              <Card.Body>
                <Card.Title>
                  <h1>Welcome to User Activity System</h1>
                </Card.Title>
                <Card.Text>
                  A user interface that allows a user to view a list of users
                  from a mock API server. On clicking on any user, a modal
                  should open which displays all the time ranges during which
                  they were active on that day, with an option to view all the
                  periods of activity for different days using a calendar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <UsersList hide={showActivity.hide} show={setShow} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
