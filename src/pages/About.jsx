import React from "react";
import Summary from "../components/Summary";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Certifications from "../components/Certifications";

const About = () => (
  <div className="page-container">
    <Summary />
    <Skills />
    <Education />
    <Certifications />
  </div>
);

export default About;
