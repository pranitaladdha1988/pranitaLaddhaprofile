import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

export default function Summary() {
  const { t } = useContext(LanguageContext);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="summary-section"
    >
      <h2 className="section-label">[ 01 / SUMMARY ]</h2>
      <div className="summary-content">
        <p className="summary-text">
          {t("summary.description")}
        </p>
      </div>
    </motion.section>
  );
}
