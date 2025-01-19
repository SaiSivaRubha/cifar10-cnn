import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ color: "yellow", backgroundColor: "black", padding: "10px" }}>
        Welcome to Empathy Nexus
      </h1>
      <p style={{ marginBottom: "20px" }}>Choose a page to explore:</p>
      <div>
        <Link
          to="/kindness"
          style={{
            textDecoration: "none",
            color: "black",
            backgroundColor: "yellow",
            padding: "10px 20px",
            margin: "10px",
            borderRadius: "5px",
            fontSize: "16px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "black";
            e.target.style.color = "yellow";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "yellow";
            e.target.style.color = "black";
          }}
        >
          Kindness Page
        </Link>
        <Link
          to="/happiness"
          style={{
            textDecoration: "none",
            color: "black",
            backgroundColor: "yellow",
            padding: "10px 20px",
            margin: "10px",
            borderRadius: "5px",
            fontSize: "16px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "black";
            e.target.style.color = "yellow";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "yellow";
            e.target.style.color = "black";
          }}
        >
          Happiness Page
        </Link>
      </div>
    </div>
  );
}

export default Home;

