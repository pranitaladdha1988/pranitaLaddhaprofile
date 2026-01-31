const skills = [
  {
    title: "Frontend Architecture & Platform Ownership",
    items: [
      "Angular (1–20), TypeScript, JavaScript (ES6+)",
      "Modular & scalable frontend system design",
      "Reusable UI libraries & shared frameworks",
      "Performance, maintainability & scalability governance",
      "Angular modernization & upgrade leadership",
    ],
  },
  {
    title: "AI-Enabled & Analytics-Driven UX",
    items: [
      "Frontend design for AI & analytics powered features",
      "Intelligent discovery & insights-driven workflows",
      "Explainability-ready UI & user trust considerations",
      "User behavior analytics (FullStory)",
    ],
  },
  {
    title: "Cloud, DevOps & Platform Integration",
    items: [
      "AWS, Azure, Docker, Kubernetes (hands-on exposure)",
      "CI/CD pipelines (Jenkins)",
      "Cloud-aligned frontend architecture",
      "REST API integration & collaboration",
    ],
  },
  {
    title: "Leadership, Governance & Delivery",
    items: [
      "Architecture reviews & final PR authority",
      "Agile / Scrum process ownership",
      "Estimation, release planning & roadmap alignment",
      "Cross-functional leadership (UI, Backend, DevOps)",
    ],
  },
];

export default function Skills() {
  return (
    <section>
      <h2>Core Capabilities</h2>

      <div className="skills-matrix">
        {skills.map((group) => (
          <div className="skill-block" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
