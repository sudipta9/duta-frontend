import React from "react";

const Message = ({ messageBody, sent }) => {
  return (
    <>
      <div
        className={`text-white rounded-3 p-2 ${
          sent ? "bg-primary" : "bg-danger"
        }`}
        style={
          sent
            ? { maxWidth: "30vw", marginLeft: "auto" }
            : { maxWidth: "30vw", marginRight: "auto" }
        }
      >
        {messageBody}
      </div>
    </>
  );
};

export default Message;
