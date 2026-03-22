import React from 'react';
import { motion } from 'framer-motion';

const SectionLabel = ({ index, total, label }) => {
  const formattedIndex = String(index).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="section-label"
    >
      [ {formattedIndex} / {formattedTotal} ] {label}
    </motion.div>
  );
};

export default SectionLabel;
