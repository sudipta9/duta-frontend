import React from "react";
import { ListGroup } from "react-bootstrap";

const Contacts = ({ name, idKey, unreadCount }) => {
  return (
    <>
      <ListGroup.Item
        action
        href={`#${idKey}`}
        className="rounded-0 d-flex justify-content-between"
      >
        {name}
        {unreadCount && unreadCount >= 0 ? (
          <p
            className="bg-danger text-center text-white justify-content-center align-items-center"
            style={{
              height: "25px",
              width: "25px",
              borderRadius: "50%",
              padding: "0",
              margin: "0",
            }}
          >
            {unreadCount}
          </p>
        ) : null}
      </ListGroup.Item>
    </>
  );
};

export default Contacts;
