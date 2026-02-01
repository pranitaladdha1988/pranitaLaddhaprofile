import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Skills() {
  const { t } = useContext(LanguageContext);
  
  const skillCategories = [
    {
      key: "frontendArchitecture",
      title: t("skills.categories.frontendArchitecture.title"),
      items: t("skills.categories.frontendArchitecture.items")
    },
    {
      key: "aiAnalytics",
      title: t("skills.categories.aiAnalytics.title"),
      items: t("skills.categories.aiAnalytics.items")
    },
    {
      key: "cloudDevops",
      title: t("skills.categories.cloudDevops.title"),
      items: t("skills.categories.cloudDevops.items")
    },
    {
      key: "leadership",
      title: t("skills.categories.leadership.title"),
      items: t("skills.categories.leadership.items")
    }
  ];

  return (
    <section>
      <h2>{t("skills.title")}</h2>

      <div className="skills-matrix">
        {skillCategories.map((group) => (
          <div className="skill-block" key={group.key}>
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
