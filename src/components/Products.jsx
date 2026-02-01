import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Products() {
  const { t } = useContext(LanguageContext);
  const projects = t("products.projects");

  return (
    <section>
      <h2>{t("products.title")}</h2>

      {projects.map((project, idx) => (
        <div className="card" key={idx}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <ul>
            {project.highlights.map((highlight, hidx) => (
              <li key={hidx}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
