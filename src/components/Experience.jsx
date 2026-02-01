import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Experience() {
  const { t } = useContext(LanguageContext);
  const positions = t("experience.positions");

  return (
    <section>
      <h2>{t("experience.title")}</h2>

      {positions.map((position, idx) => (
        <div className="card" key={idx}>
          <h3>{position.company}</h3>
          <p className="role">{position.role}</p>
          <ul>
            {position.responsibilities.map((responsibility, ridx) => (
              <li key={ridx}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
