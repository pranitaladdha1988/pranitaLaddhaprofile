import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

export default function AI() {
  const { t } = useContext(LanguageContext);
  const aiProjects = t("ai.projects") || [];

  return (
    <section className="works-section">
      <h2 className="section-label">[ 07 / AI PROJECTS ]</h2>
      <div className="ai-list">
        {aiProjects.map((project, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="ai-item"
          >
            <h3 className="ai-name">{project.name}</h3>
            <p className="ai-desc">{project.description}</p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}