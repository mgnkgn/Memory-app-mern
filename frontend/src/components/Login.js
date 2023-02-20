import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MainContext } from "../store/context-main";

const Login = () => {
  const navigate = useNavigate();
  const { adminLogIn, guestLogIn } = useContext(MainContext);
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passChangeHandler = (event) => {
    setPass(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://swmemoryapp.onrender.com/api/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            username: username,
            password: pass,
          }),
        }
      );

      if (!response.ok) {
        return null;
      }
      navigate("/api/spacer");

      adminLogIn(response.ok);

      setUsername("");
      setPass("");
    } catch (err) {
      console.log(err);
    }
  };

  const guestLogInHandler = async () => {
    guestLogIn(true);
  };

  return (
    <div>
      <form className="login-form" onSubmit={submitHandler}>
        <div className="login-input">
          <div className="login-input-row">
            <label htmlFor="username">User:</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={usernameChangeHandler}
              value={username}
            />
          </div>
          <div className="login-input-row">
            <label htmlFor="pass">Pass:</label>
            <input
              type="password"
              id="pass"
              autoComplete="off"
              onChange={passChangeHandler}
              value={pass}
            />
          </div>
        </div>
        <button type="submit" className="login-submit" onClick={submitHandler}>
          Login
        </button>
        <button className="login-submit" onClick={guestLogInHandler}>
          I'm a Guest
        </button>
      </form>
    </div>
  );
};

export default Login;
