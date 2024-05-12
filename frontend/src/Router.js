import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/auth/login";
import Attendence from "./components/attendence";
import NoPage from "./components/noPage";
import Navbar from "./components/layout/navbar";
import AuthContext from "./context/authContext";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {loggedIn === false ? (
          <>
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/attendence" element={<Attendence />} />
          </>
        )}
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
