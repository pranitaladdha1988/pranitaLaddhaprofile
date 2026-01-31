import "./App.css";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Products from "./components/Products";
import Education from "./components/Education";
import Certifications from "./components/Certifications";

export default function App() {
  return (
    <main className="container">
      <Header />
      <Summary />
      <Education />
      <Certifications />
      <Skills />
      <Experience />
      <Products />
    </main>
  );
}
