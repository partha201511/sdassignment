import React from "react";
import { useParams, Link } from "react-router-dom";

// Adjust this import path exactly to your Profile.js location
import parthaImg from "./images/partha.jpg"; // <-- CHANGE if Profile.js is in subfolder

import "./Profile.css";

function Profile() {
  const { name } = useParams();

  return (
    <div className="profile-container">
      <h1 className="profile-title">Author Profile: {name}</h1>

      {name.toLowerCase() === "partha" ? (
        <div className="partha-profile">
          <img src={parthaImg} alt="Partha Protim Biswas" className="partha-img" />
          <div className="partha-info">
            <p>Partha Protim Biswas</p>
            <p>Department of CSE, AUST</p>
            <p>2nd Year, 2nd Semester</p>
          </div>
        </div>
      ) : (
        <p className="profile-text">
          Welcome to the page of <b>{name}</b>.
        </p>
      )}

      <Link to="/" className="back-btn">
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default Profile;
