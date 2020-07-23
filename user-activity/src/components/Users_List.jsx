import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import User from "./User";

function UsersList(props) {
  const [users, setUsers] = useState({
    done: false,
    members: [],
  });
  useEffect(() => {
    setUsers({ done: false });
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setUsers({ members: data.members, done: true }));
  }, [setUsers]);

  return (
    <div>
      <ListGroup>
        {users.done
          ? users.members.map((user) => {
              return (
                <ListGroup.Item key={user.id}>
                  <User hide={props.hide} showActivity={props.show} user={user} />
                </ListGroup.Item>
              );
            })
          : `Loading`}
      </ListGroup>
    </div>
  );
}
export default UsersList;
