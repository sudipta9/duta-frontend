import { Formik } from "formik";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Container,
  Form,
  FormGroup,
  Row,
  Button,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import http from "../../http-config";
import Cookies from "universal-cookie";

const SignUp = () => {
  const initialValues = {
    name: "",
    userName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };
  // * from validation
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your name")
      .min(2, "Name must be 2 character long")
      .max(50, "Name can not be greater than 50 character"),
    userName: yup
      .string()
      .required("Please pick an userName")
      .lowercase("Username can contain only lowercase value"),
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
    confirmPassword: yup
      .string()
      .required("Please enter your password again")
      .test("match", "Password do no matches", function (password) {
        return password === this.parent.password;
      }),
  });

  const [data, setData] = useState({
    name: "",
    mobileNumber: "",
    password: "",
    userName: "",
  });
  const [hasError, setHasError] = useState("");
  const navigate = useNavigate();
  const cookie = useMemo(() => {
    return new Cookies();
  }, []);

  const isComponentLoaded = useRef(true);

  const signUP = async (data) => {
    let res = null;
    try {
      res = await http.post("/user/sign-up", data);
      // console.log(res);
    } catch (err) {
      res = err.response;
      // console.log("Something Went wrong");
    } finally {
      return res.data;
      // console.log(res.data);
    }
  };
  useEffect(() => {
    if (isComponentLoaded.current) isComponentLoaded.current = false;
    else {
      signUP(data).then((res) => {
        if (res.success === true) {
          cookie.set("auth-token", res.token);
          navigate("/home");
        }
        if (res.success === false) setHasError(res.message);
      });
    }
  }, [cookie, data, navigate]);

  return (
    <>
      <Container>
        <Row>
          <div className="col-md-6 offset-md-3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setData({
                  name: values.name,
                  mobileNumber: values.mobileNumber,
                  userName: values.userName,
                  password: values.password,
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
                isSubmitting,
              }) => (
                <Form
                  className="mt-5 border p-4 bg-light row"
                  onSubmit={handleSubmit}
                >
                  <h4 className="mb-5 text-secondary col-12">Sign up</h4>
                  {hasError ? (
                    <p className="p-0 m-0 text-danger text-center">
                      {hasError}
                    </p>
                  ) : null}
                  <FormGroup className="mb-3 col-12">
                    <FormLabel className="">
                      Full Name <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={
                        touched.name && errors.name ? "border-danger" : ""
                      }
                    />
                    {touched.name && errors.name ? (
                      <small className="form-text text-danger">
                        {errors.name}
                      </small>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3 col-12">
                    <FormLabel className="">
                      Pick a Username <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl
                      type="text"
                      placeholder="userName"
                      name="userName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userName}
                      className={
                        touched.userName && errors.userName
                          ? "border-danger"
                          : ""
                      }
                    />
                    {touched.userName && errors.userName ? (
                      <small className="form-text text-danger">
                        {errors.userName}
                      </small>
                    ) : (
                      ""
                    )}
                  </FormGroup>
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

                  <FormGroup className="mb-3 col-md-6">
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
                        touched.password && errors.password
                          ? "border-danger"
                          : ""
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

                  <FormGroup className="mb-3 col-md-6">
                    <FormLabel className="">
                      Confirm Password <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      className={
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-danger"
                          : ""
                      }
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <small className="form-text text-danger">
                        {errors.confirmPassword}
                      </small>
                    ) : (
                      ""
                    )}
                  </FormGroup>

                  <div className="mt-3">
                    <Button variant="primary col-12" type="submit">
                      Sign up
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <p className="text-center mt-3 text-secondary">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-decoration-none">
                Sign In
              </Link>
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
