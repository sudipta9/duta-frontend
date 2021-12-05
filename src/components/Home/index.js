import React, { useEffect, useMemo, useState } from "react";
import { Col, ListGroup, Row, Tab, TabContainer } from "react-bootstrap";
import ChatBody from "../chatBody";
import Contacts from "../chatBody/Contacts";
import HomeStyle from "./HomeStyle";
import http from "../../http-config";
import Cookies from "universal-cookie/es6";

const Home = () => {
  const [allContacts, setAllContacts] = useState([]);

  const cookie = useMemo(() => {
    return new Cookies();
  }, []);
  const token = cookie.get("auth-token");

  const getUserList = async (token) => {
    let res = null;
    try {
      res = await http.get("/user/all-user", {
        headers: { Authorization: token },
      });
      res = res.data;
    } catch (err) {
      res = err.response;
    } finally {
      return res;
    }
  };

  // const getChatList = async (token) => {
  //   let res = null;
  //   try {
  //     res = await http.get("/chat/get-all", {
  //       headers: { Authorization: token },
  //     });
  //     res = res.data;
  //   } catch (err) {
  //     res = err.response;
  //   } finally {
  //     return res;
  //   }
  // };

  // const getName = async (token, userId) => {
  //   let res = null;
  //   try {
  //     res = await http.get("/user/find", {
  //       headers: { Authorization: token },
  //       params: {
  //         userId: userId,
  //       },
  //     });
  //   } catch (err) {
  //     res = err.response;
  //   } finally {
  //     console.log(res);
  //   }
  // };

  // useEffect(() => {
  //   getChatList(token).then((res) => {
  //     if (res.success === true) setAllContacts(res.data);
  //     console.log(res.data);
  //   });
  // }, [token]);

  useEffect(() => {
    getUserList(token).then((res) => {
      if (res.success === true) setAllContacts(res.data);
    });
  }, [token]);

  return (
    <>
      <HomeStyle />
      <TabContainer id="list-group-tabs-example" defaultActiveKey="">
        <Row style={{ width: "100%" }}>
          <Col sm={4}>
            <div className="bg-gray px-4 py-2 bg-light">
              <h5 className="mb-0 py-1">Recent</h5>
            </div>
            <ListGroup style={{ overflow: "scroll", height: "85vh" }}>
              {allContacts.map((obj) => {
                return (
                  <Contacts
                    idKey={obj.userId}
                    name={obj.name}
                    key={obj._id}
                  ></Contacts>
                );
              })}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {allContacts.map((obj) => {
                return (
                  <ChatBody
                    idKey={obj.userId}
                    name={obj.name}
                    key={obj._id}
                  ></ChatBody>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </TabContainer>
    </>
  );
};

export default Home;
