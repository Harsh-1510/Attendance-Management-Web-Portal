import React, { useContext, useState } from "react";
import { logoutUser } from "../api/requests";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  const [gettingLogout, setGettingLogout] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setGettingLogout(true);
    await logoutUser();
    await getLoggedIn();
    setGettingLogout(false);
    navigate("/login");
  };
  return (
    <>
      {gettingLogout ? (
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          disabled={true}
        >
          proccessing...
        </button>
      ) : (
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          disabled={false}
          onClick={logout}
        >
          Logout
        </button>
      )}
    </>
  );
}
