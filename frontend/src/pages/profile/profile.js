import React from "react";
import "./profile.css";
import profile from "../../images/homepage.jpeg";
import { Header } from "../../component";

export const Profile = () => {

   

  return (
    <div>
      <div className="profile-page">
        <Header />
        <div class="profile-container">
          <div className="profile-top">
            <img src={profile} alt="Profile Image" class="profile-image" />
            <span className="profile-edit-button">
              <button>Edit profile</button>
            </span>
          </div>

          <div class="username">John</div>
          <div class="email">john.doe@example.com</div>
        </div>
      </div>
    </div>
  );
};
