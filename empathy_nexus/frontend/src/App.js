// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import KindnessPosts from './components/Kindness/KindnessPosts';
import HappinessIndex from './components/Happiness/HappinessIndex';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/kindness" element={<KindnessPosts />} />
          <Route path="/happiness" element={<HappinessIndex />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
