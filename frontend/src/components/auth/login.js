import React, { useContext } from 'react'
import { useState } from 'react';
import { loginUser } from "../api/requests"
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { getLoggedIn } = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState(false)
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoggingIn(true)
    try {
      await loginUser(inputs);
      await getLoggedIn();
      navigate("/attendence");
    } catch (err) {
      alert(err.response.data.errorMessage)
    }
    setLoggingIn(false)
  }
  return (

    <div className="form-container">

      {/******************** Login **************************/}
      <form className="register-form form-style-10" onSubmit={handleSubmit}>

        <h1>Login</h1>

        {/* Section 1 */}
        <div className="section">
          <span>*</span>Email and Password
        </div>
        <div className="inner-wrap">
          <input
            type="email"
            name="email"
            className="form-field"
            placeholder='Email'
            value={inputs.email || ""}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            className="form-field"
            name="password"
            placeholder='Password'
            value={inputs.password || ""}
            onChange={handleChange}
          />
          <br />
        </div>

        {/* ------------------------------------ */}

        <div className="button-section">
          {
            loggingIn ?
              <button
                disabled={true}
                className="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-4  z-depth-1"
              >
                Getting Logged In...

              </button>
              :
              <button
                disabled={false}
                className="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-4  z-depth-1"
                type="submit"
              >
                Login

              </button>
          }
        </div>
      </form>
    </div>

  );
}
