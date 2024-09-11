import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div>
      <Routes>
        {/*more pages to be added here later*/}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}
