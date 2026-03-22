import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

export default function Header() {
  const { t } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.header 
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-content">
        <motion.h1 variants={itemVariants} className="hero-title">
          {t("header.title").split(" ").map((word, i) => (
            <span key={i} className="word-block">{word}<br /></span>
          ))}
        </motion.h1>
        
        <motion.div 
          variants={itemVariants} 
          className="hero-subtitle-container"
          style={{ borderTop: '1px solid var(--accent-color)', paddingTop: '40px', borderLeft: 'none' }}
        >
          <p className="hero-subtitle">
            {t("header.subtitle")}
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
