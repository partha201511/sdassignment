import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Profile.css"; // ✅ Import CSS

function Profile() {
  const { name } = useParams();

  return (
    <div className="profile-container">
      <h1 className="profile-title">Author Profile: {name}</h1>
      <p className="profile-text">
        Welcome to the page of <b>{name}</b>.
      </p>
      <Link to="/" className="back-btn">
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default Profile;
