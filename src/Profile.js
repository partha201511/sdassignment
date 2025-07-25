import React from "react";
import { useParams, Link } from "react-router-dom";

function Profile() {
  const { name } = useParams();

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2c3e50",
      }}
    >
      <h1
        style={{
          borderBottom: "3px solid #2980b9",
          paddingBottom: "12px",
          marginBottom: "20px",
        }}
      >
        Author Profile: {name}
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "40px" }}>
        Welcome to the page of <b>{name}</b>.
      </p>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#2980b9",
          padding: "10px 20px",
          borderRadius: "6px",
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default Profile;
