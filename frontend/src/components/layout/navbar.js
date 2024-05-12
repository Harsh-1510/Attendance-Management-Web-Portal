import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import LogoutBtn from "../auth/logoutBtn";

function Navbar() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-light bg-light"
        style={{
          color: "white",
          fontSize: "20px",
          background:
            "linear-gradient(90deg, rgba(190,45,59,1) 0%, rgba(220,53,69,1) 42%, rgba(255,255,255,1) 100%)",
        }}
      >
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "white", fontSize: "24px" }}
        >
          Home
        </Link>{" "}
        <span className="sr-only">(current)</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {loggedIn === false && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "white" }}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

            {loggedIn === true && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/attendence"
                    style={{ color: "white" }}
                  >
                    Attendence
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Major
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Computer Science
                    </a>
                    <a class="dropdown-item" href="#">
                      Physics
                    </a>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Attendence
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      <strong>Standing -- % Attendence </strong>
                    </a>
                    <a class="dropdown-item" href="#">
                      Good -- 70%
                    </a>
                    <a class="dropdown-item" href="#">
                      Avg -- 20%
                    </a>
                    <a class="dropdown-item" href="#">
                      Low -- 10%
                    </a>
                  </div>
                </div>
              </>
            )}
          </ul>
          {loggedIn === true && <LogoutBtn />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
