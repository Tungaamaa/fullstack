import React from "react";
import "./Home.css";
import { Header } from "../../component";
import { useUserContext } from "../../context/UserContext";

export const Home = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  console.log(currentUser);
  return (
    <div>
      <Header />
      from home
    </div>
  );
};
