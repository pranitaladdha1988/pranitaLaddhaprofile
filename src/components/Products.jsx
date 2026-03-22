import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import SectionLabel from "./SectionLabel";

const ProductItem = ({ project, index, total }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="product-item"
    >
      <div className="item-index">[ {formattedIndex} / {formattedTotal} ]</div>
      <div className="item-main">
        <h3 className="product-name">{project.name}</h3>
        <p className="product-desc">{project.description}</p>
        <div className="highlights">
          {project.highlights.map((highlight, i) => (
            <span key={i} className="highlight-tag">{highlight}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Products() {
  const { t } = useContext(LanguageContext);
  const projects = t("products.projects");

  return (
    <section className="works-section">
      <SectionLabel index={1} total={2} label="PRODUCTS" />
      <div className="products-list">
        {projects.map((project, idx) => (
          <ProductItem key={idx} project={project} index={idx} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
