import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch, error, loading } = useContext(AuthContext);

  const handelLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/auth/login",
        { username, password }
      );
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FALIURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="LGcontainer">
        <div className="LGwrapper">
          <div className="LGlogo"> Login</div>

          <div className="LGform">
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              required
              placeholder="username"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
            />
          </div>
          <button className="LGbutton" onClick={handelLogin}>
            Login
          </button>
          {loading && <span>Please Wait...</span>}
          {error && <span style={{ color: "red" }}>{error.message}</span>}
          <div style={{ fontSize: "14px", color: "grey" }}>
            Click here to{" "}
            <Link
              to="/register"
              style={{ color: "blue", textDecoration: "underline blue" }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
