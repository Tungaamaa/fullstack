import React from "react";
import "./Home.css";
import { Header } from "../../component";
import { useUserContext } from "../../context/UserContext";
import smoothie1 from "../../images/smoothie1.jpeg";
import smoothie2 from "../../images/smoothie2.jpeg";
import smoothie3 from "../../images/smoothie3.jpeg";

export const Home = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  console.log(currentUser);
  return (
    <div>
      <Header />
      <h1 className="homepage-top">🌈 Welcome, 🌱 Sip, Smile, Repeat!</h1>
      <div className="homepage-main">
     
      <img className="homepage" src={smoothie2}/>
      <img className="homepage" src={smoothie1}/>
      <img className="homepage" src={smoothie3}/>
      </div>
    </div>
  );
};
