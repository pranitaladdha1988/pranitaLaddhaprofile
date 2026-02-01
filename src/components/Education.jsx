import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Education() {
  const { t } = useContext(LanguageContext);
  
  return (
    <section>
      <h2>{t("education.title")}</h2>
      <div className="card">
        <h3>{t("education.degree")}</h3>
        <p>{t("education.university")}</p>
      </div>
    </section>
  );
}
