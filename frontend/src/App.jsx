import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Currency from "./pages/Currency";
import Crypto from "./pages/Crypto";
import Commodities from "./pages/Commodities";
import Layout from "./components/Layout";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/currency" element={<Currency darkMode={darkMode} />} />
          <Route path="/crypto" element={<Crypto darkMode={darkMode} />} />
          <Route path="/commodities" element={<Commodities darkMode={darkMode} />} />
        </Routes>
      </Layout>
    </Router>
  );
}
