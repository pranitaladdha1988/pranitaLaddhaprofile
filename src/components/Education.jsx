import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import SectionLabel from "./SectionLabel";

export default function Education() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="works-section">
      <SectionLabel index={3} total={4} label="EDUCATION" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="education-content"
      >
        <h3 className="degree-title">{t("education.degree")}</h3>
        <p className="university-name">{t("education.university")}</p>
      </motion.div>

    </section>
  );
}
