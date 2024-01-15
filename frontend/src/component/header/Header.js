import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();
  const { setProducts } = useProductContext();

  const handleLogOut = () => {
    signOut();
    setProducts([]);
  }

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  if (!userContextLoading && currentUser) {
    return (
      <div className="header-main">
        <div className="header">
          <span className="header-item">
            <Link to="/">Home</Link>
          </span>

          <span className="header-items">
            <Link to="/products">Recipes</Link>
          </span>
          <span className="header-items" onClick={handleLogOut}>Logout</span>
        </div>
      </div>
    );
  }

  return (
    <div className="header-main">
      <div className="header">
        <span className="header-item">
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
