import { Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import * as yup from "yup";
import http from "../../http-config";

const SignIn = () => {
  const initialValues = {
    mobileNumber: "",
    password: "",
  };

  // * from validation
  const validationSchema = yup.object().shape({
    mobileNumber: yup
      .number()
      .required("Please enter your mobile number")
      .max(9999999999, "Mobile Number can not be greater than 10 digit"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const [data, setData] = useState(initialValues);
  const [hasError, setHasError] = useState("");
  const navigate = useNavigate();
  const cookie = useMemo(() => {
    return new Cookies();
  }, []);

  const isComponentLoaded = useRef(true);

  const signIn = async (data) => {
    let res = null;
    try {
      res = await http.post("/user/sign-in", data);
    } catch (err) {
      res = err.response;
    } finally {
      return res.data;
    }
  };

  useEffect(() => {
    if (isComponentLoaded.current) isComponentLoaded.current = false;
    else {
      signIn(data).then((res) => {
        if (res.success === true) {
          cookie.set("auth-token", res.token);
          navigate("/home");
        }
        if (res.success === false) setHasError(res.message);
      });
    }
  }, [cookie, data, navigate]);

  return (
    <Container>
      <Row>
        <div className="col-md-6 offset-md-3">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setData(values);
            }}
          >
            {({
              values,
              errors,
              isSubmitting,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form
                className="mt-5 border p-4 bg-light "
                onSubmit={handleSubmit}
              >
                <h4 className="mb-5 text-secondary">Sign in to your Account</h4>
                {hasError ? (
                  <p className="p-0 m-0 text-danger text-center">{hasError}</p>
                ) : null}
                <FormGroup className="mb-3 col-12">
                  <FormLabel className="">
                    Mobile Number <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="text"
                    placeholder="10 digit mobile number"
                    name="mobileNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobileNumber}
                    className={
                      touched.mobileNumber && errors.mobileNumber
                        ? "border-danger"
                        : ""
                    }
                  />
                  {touched.mobileNumber && errors.mobileNumber ? (
                    <small className="form-text text-danger">
                      {errors.mobileNumber}
                    </small>
                  ) : (
                    ""
                  )}
                </FormGroup>

                <FormGroup className="mb-3 col-12">
                  <FormLabel className="">
                    Password <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      touched.password && errors.password ? "border-danger" : ""
                    }
                  />
                  {touched.password && errors.password ? (
                    <small className="form-text text-danger">
                      {errors.password}
                    </small>
                  ) : (
                    ""
                  )}
                </FormGroup>

                <FormLabel className="mt-3">
                  <FormCheckInput name="remember me" /> Remember me
                </FormLabel>

                <div className="mt-3">
                  <Button variant="primary col-12" type="submit">
                    Sign up
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-3">
            <Link to="/forget-password" className="text-decoration-none">
              Forget Password?
            </Link>
          </p>
          <p className="text-center mt-3">
            Don't have a account?
            <Link to="/sign-up" className="text-decoration-none">
              &nbsp;Sign UP
            </Link>
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default SignIn;
