import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

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
      <h2 className="section-label">[ 04 / CAPABILITIES ]</h2>
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
        .works-section {
          padding: 100px 0;
          border-bottom: 1px solid var(--accent-color);
        }

        .section-label {
          font-size: 10px;
          letter-spacing: 3px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 60px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 60px;
        }

        .category-title {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: -0.5px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--accent-color);
        }

        .skill-items {
          list-style: none;
        }

        .skill-items li {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}
