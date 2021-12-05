import { Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormControl, InputGroup, Tab, Button, Form } from "react-bootstrap";
import AllMessages from "./AllMessages";
import * as yup from "yup";
import http from "../../http-config";
import Cookies from "universal-cookie";

const ChatBody = ({ idKey, name }) => {
  const initialValues = {
    text: "",
  };
  const validationSchema = yup.object().shape({
    text: yup.string().required(),
  });

  const [text, setText] = useState("");
  const isComponentLoaded = useRef(true);
  const cookie = useMemo(() => {
    return new Cookies();
  }, []);

  const sendChat = async (text, receiverId, token) => {
    let res = null;
    const data = {
      receiverId: receiverId,
      message: text,
    };
    try {
      res = await http.post("/chat/send", data, {
        headers: { Authorization: token },
      });
      res = res.data;
    } catch (err) {
      res = err.response;
    } finally {
      return res;
    }
  };
  useEffect(() => {
    if (isComponentLoaded.current) isComponentLoaded.current = false;
    else {
      const token = cookie.get("auth-token");
      sendChat(text, idKey, token);
    }
    // return () => (isComponentLoaded.current = true);
  }, [cookie, idKey, text]);

  return (
    <Tab.Pane eventKey={`#${idKey}`}>
      <div className="px-4 py-2">
        <h5 className="mb-2 py-1">{name}</h5>
      </div>
      <AllMessages userId={idKey} />
      <div className="px-4 py-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // console.log(values);
            setText(values.text);
            resetForm();
          }}
        >
          {({ errors, values, handleChange, handleSubmit, handleReset }) => (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <FormControl
                  placeholder="Type Here"
                  value={values.text}
                  name="text"
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" type="submit">
                  Button
                </Button>
              </InputGroup>
            </Form>
          )}
        </Formik>
      </div>
    </Tab.Pane>
  );
};

export default ChatBody;
