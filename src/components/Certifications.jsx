import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Certifications() {
  const { t } = useContext(LanguageContext);
  
  return (
    <section>
      <h2>{t("certifications.title")}</h2>
      <ul className="certs">
        {t("certifications.list").map((cert, idx) => (
          <li key={idx}>{cert}</li>
        ))}
      </ul>
    </section>
  );
}
