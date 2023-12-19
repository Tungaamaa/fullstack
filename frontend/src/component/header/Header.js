import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  if (!userContextLoading && currentUser) {
    return (
      <div className="header-main">
        <div className="header">
          <span className="header-items">
            <Link to="/">Home</Link>
          </span>

          <span className="header-items">
            <Link to="/products">Products</Link>
          </span>
          <span className="header-items" onClick={signOut}>Logout</span>
        </div>
      </div>
    );
  }

  return (
    <div className="header-main">
      <div className="header">
        <span className="header-items">
          <Link to="/">Home</Link>
        </span>

        <span className="header-items">
          <Link to="/login">sign-in</Link>
        </span>
        <span className="header-items">
          <Link to="/sign-up">sign-up</Link>
        </span>
      </div>
    </div>
  );
};
