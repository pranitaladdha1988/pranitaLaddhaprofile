import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

const ExperienceItem = ({ position, index, total }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="experience-item"
    >
      <div className="item-index">[ {formattedIndex} / {formattedTotal} ]</div>
      <div className="item-main">
        <h3 className="company-name">{position.company}</h3>
        <p className="role-title">{position.role}</p>
        <div className="responsibilities">
          <ul>
            {position.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const { t } = useContext(LanguageContext);
  const positions = t("experience.positions");

  return (
    <section className="works-section">
      <h2 className="section-label">[ 02 / EXPERIENCE ]</h2>
      <div className="experience-list">
        {positions.map((pos, idx) => (
          <ExperienceItem key={idx} position={pos} index={idx} total={positions.length} />
        ))}
      </div>
    </section>
  );
}
