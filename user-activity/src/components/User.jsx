import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

function User(props) {
  const [open, setOpen] = useState(false);
  const data = props.user;
  return (
    <div>
      <span className="m-2">{data.real_name}</span>
      <Button
        className="float-right"
        variant="primary"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        Details
      </Button>
      <Collapse in={open}>
        <div className="mt-3 ml-5">
          <span>
            User Id: {data.id}
            <p></p>
            Timezone: {data.tz}
          </span>
          <Button
            className="float-right"
            variant="success"
            onClick={() => {
              return props.showActivity({
                hide: !props.hide,
                data: data,
              });
            }}
          >
            View Activity
          </Button>
        </div>
      </Collapse>
    </div>
  );
}
export default User;
