import "./App.css";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Products from "./components/Products";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import { Routes, Route } from "react-router-dom";
import AI from "./components/AI";

export default function App() {
  return (
    <main className="container">
      {/* Navbar */}
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Summary />
            <Education />
            <Certifications />
            <Skills />
            <Experience />
            <Products />
          </>
        } />
        <Route path="/ai" element={<AI />} />
      </Routes>
      
      {/* Floating Chatbot Assistant */}
      <Chatbot isFloating={true} />
    </main>
  );
}
