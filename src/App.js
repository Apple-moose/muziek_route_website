import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import HomePage from "./pages/HomePage";
import HomePageMobile from "./pages/HomeMobile";

export default function App() {
  return (
    <div>
      {isMobile ? (
        <Routes>
          <Route path="/" element={<HomePageMobile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      )}
    </div>
  );
}
