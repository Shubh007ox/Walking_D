import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/Client/authForm";
import AuthContext from "./Components/Server/auth-context";
import Welcome from "./Components/Client/welcome";
import MainNavigation from "./Components/Client/navbar";


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
        <MainNavigation />
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/welcome" element={authCtx.isLoggedIn ? <Welcome /> : <Navigate to="/" />} />
      </Routes>

    </React.Fragment>
  );
}

export default App;
