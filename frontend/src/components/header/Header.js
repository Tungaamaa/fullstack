import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header-main">
      <div className="header">
        <span>
          <Link to="/">Home</Link>
        </span>

        <span>
          <Link to="/products">Products</Link>
        </span>
      </div>
    </div>
  );
};
