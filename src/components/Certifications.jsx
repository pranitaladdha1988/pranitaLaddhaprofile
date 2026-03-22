import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import SectionLabel from "./SectionLabel";

export default function Certifications() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="works-section">
      <SectionLabel index={4} total={4} label="CERTIFICATIONS" />
      <div className="certs-list">
        {t("certifications.list").map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="cert-item"
          >
            <span className="cert-text">{cert}</span>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
