import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to the backend API
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      
      console.log(response.data); // Debugging: check the response data
      alert(response.data.message);  // Show login success message

      // If login is successful, redirect to /home (Home page)
      navigate("/home");
    } catch (err) {
      console.error(err);  // Log the error in the console
      const errorMessage = err.response?.data?.message || "Unknown error";
      alert("Login failed: " + errorMessage);

      // If the error message is "User not found", redirect to /register
      if (errorMessage === "User not found") {
        navigate("/register");
      }
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block" }}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "10px", padding: "10px", width: "200px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px", padding: "10px", width: "200px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "yellow",
            color: "black",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
