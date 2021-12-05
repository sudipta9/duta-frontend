import React from "react";
import SignUp from "./components/SignUp";
import {} from "react-router-dom";
import { Route, Routes } from "react-router";
import { createGlobalStyle } from "styled-components";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

const GlobalStyle = createGlobalStyle`
  
`;
const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Routes>
          <Route
            path="/*"
            exact={true}
            element={<p className="text-center">404 not found</p>}
          ></Route>
          <Route path="/sign-up" exact={true} element={<SignUp />}></Route>
          <Route path="/sign-in" exact={true} element={<SignIn />}></Route>
          <Route path="/home" exact={true} element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
