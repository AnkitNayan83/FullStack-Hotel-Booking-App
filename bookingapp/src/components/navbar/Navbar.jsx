import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.scss";

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log(user);

  const handelClick = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">BookingApp</div>
        </Link>
        <div className="items">
          {user ? (
            <div className="user">
              <span
                style={{
                  color: "white",
                  marginRight: "10px",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                {user.username}
              </span>
              <Link to="/booking">
                <span
                  style={{
                    color: "white",
                    marginRight: "10px",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  Your Bookings
                </span>
              </Link>
              <button onClick={handelClick}>Sign Out</button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
