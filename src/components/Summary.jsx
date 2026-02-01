import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Summary() {
  const { t } = useContext(LanguageContext);
  
  return (
    <section>
      <h2>{t("summary.title")}</h2>
      <p>
        {t("summary.description")}
      </p>
    </section>
  );
}
