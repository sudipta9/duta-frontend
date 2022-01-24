import React from "react";
import SignUp from "./components/SignUp";
import {} from "react-router-dom";
import { Route, Routes } from "react-router";
import { createGlobalStyle } from "styled-components";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
// import Cookies from "universal-cookie";

const GlobalStyle = createGlobalStyle`
  
`;
const App = () => {
  // const cookie = useMemo(() => {
  //   return new Cookies();
  // }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = cookie.get("auth-token");
  //   if (token) {
  //     // setIsLoggedIn(true);
  //     navigate("/home");
  //   } else {
  //     navigate("/sign-in");
  //   }
  // }, [cookie, navigate]);
  return (
    <>
      <GlobalStyle />
      <div>
        <Routes>
          <Route
            path="/*"
            exact={true}
            element={<p className="text-center h4">404 not found</p>}
          ></Route>
          <Route path="/sign-up" exact={true} element={<SignUp />}></Route>
          <Route path="/sign-in" exact={true} element={<SignIn />}></Route>
          <Route path="/home" exact={true} element={<Home />}></Route>
          {/* <Route path="/" exact>
            {navigate("/sign-in")}
          </Route> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
