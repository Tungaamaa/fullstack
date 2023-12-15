import React from "react";
import { Home, Product, Products } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { useUserContext } from "./context/UserContext";

export const App = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
        path="/login"
        element={!currentUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/sign-up"
        element={!currentUser ? <SignUp /> : <Navigate to="/" />}
      />
        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/:id"
          element={currentUser ? <Product /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
