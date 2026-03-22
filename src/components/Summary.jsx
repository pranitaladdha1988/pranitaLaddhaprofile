import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import SectionLabel from "./SectionLabel";

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
      <SectionLabel index={1} total={4} label="SUMMARY" />
      <div className="summary-content">
        <p className="summary-text">
          {t("summary.description")}
        </p>
      </div>
    </motion.section>
  );
}
