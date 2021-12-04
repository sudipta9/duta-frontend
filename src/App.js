import React from "react";
import SignUp from "./components/SignUp";
import {} from "react-router-dom";
import { Route, Routes } from "react-router";
import { createGlobalStyle } from "styled-components";
import SignIn from "./components/SignIn";

const GlobalStyle = createGlobalStyle`
  
`;
const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Routes>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
