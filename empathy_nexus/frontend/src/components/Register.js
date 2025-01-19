import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", {
        email,
        password,
      });
      alert(response.data.message);
    } catch (err) {
      alert("Registration failed! " + err.response.data.message);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={{ display: "inline-block" }}>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
