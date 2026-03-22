import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import SectionLabel from "./SectionLabel";

export default function Skills() {
  const { t, language } = useContext(LanguageContext);
  
  // Get all categories from translations
  const categoriesData = t("skills.categories");
  const skillCategories = Object.keys(categoriesData).map(key => ({
    key,
    title: categoriesData[key].title,
    items: categoriesData[key].items
  }));

  return (
    <section className="works-section">
      <SectionLabel index={2} total={4} label="CAPABILITIES" />
      <div className="skills-grid">
        {skillCategories.map((group, idx) => (
          <motion.div 
            key={group.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="skill-category"
          >
            <h3 className="category-title">{group.title}</h3>
            <ul className="skill-items">
              {group.items && Array.isArray(group.items) && group.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <style>{`
        .skill-category {
          margin-bottom: 20px;
        }
      `}</style>
    </section>
  );
}
