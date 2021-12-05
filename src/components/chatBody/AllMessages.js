import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie/es6";
import http from "../../http-config";
import Message from "./Message";

const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow: scroll;
`;
const AllMessages = ({ userId }) => {
  const [message, setMessage] = useState([]);
  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const fetchMessage = async (token, userId) => {
    let res = null;
    try {
      res = await http.post(
        "/chat/get-user-chat",
        { otherPersonId: userId },
        { headers: { Authorization: token } }
      );
      res = res.data;
    } catch (err) {
      res = err.response.data;
    } finally {
      return res;
    }
  };

  useEffect(() => {
    setInterval(() => {
      const token = cookies.get("auth-token");
      fetchMessage(token, userId).then((res) => {
        // console.log(res);
        if (res.success === true) setMessage(res.data);
      });
    }, 300);
  }, [cookies, userId]);
  return (
    <>
      <StyledChat>
        {message.map((obj) => {
          return (
            <Message
              messageBody={obj.messageBody}
              sent={obj.status === "sent" ? true : false}
              key={obj._id}
            />
          );
        })}
        {/* <Message messageBody="Hello" />
        <Message messageBody="Hi" send /> */}
      </StyledChat>
    </>
  );
};

export default AllMessages;
