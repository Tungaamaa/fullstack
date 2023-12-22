import React from "react";
import "./Home.css";
import { Header } from "../../component";
import { useUserContext } from "../../context/UserContext";
import homepage from "../../images/homepage-background.png";

export const Home = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  console.log(currentUser);
  return (
    <div>
      <Header />
      <div>
      <img className="homepage" src={homepage}/>
      </div>
      from home
    </div>
  );
};
