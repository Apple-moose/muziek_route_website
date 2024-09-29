import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import HomePage from "./pages/HomePage";
import HomePageMobile from "./pages/HomeMobile";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <div>
      {isMobile ? (
        <Routes>
          <Route path="/" element={<HomePageMobile />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
}
