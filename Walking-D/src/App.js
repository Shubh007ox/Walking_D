import React, { useContext } from "react";
import LoginPage from "./Components/Client/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/Client/authForm";
import FacebookPage from "./Components/Client/facebookPage";
import AuthContext from "./Components/Server/auth-context"; // Corrected import
import Welcome from "./welcome";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/authForm" element={<AuthForm />} />
        <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/welcome" element={authCtx.isLoggedIn ? <Welcome /> : <Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
