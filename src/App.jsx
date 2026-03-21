import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainLayout from "./components/MainLayout";

// Page Components
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import AI from "./pages/AI";

// Core Components
import ThemeToggle from "./components/ThemeToggle";
import Chatbot from "./components/Chatbot";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <CustomCursor />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </MainLayout>
      
      {/* Floating Chatbot Assistant */}
      <Chatbot isFloating={true} />
    </>
  );
}
