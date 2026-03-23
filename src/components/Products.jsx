import React, { useContext, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="works-section">
      <SectionLabel index={1} total={2} label="PRODUCTS" />
      
      <div className="products-container-wrapper">
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="scroll-arrow left"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="products-list" ref={scrollRef}>
          {projects.map((project, idx) => (
            <ProductItem key={idx} project={project} index={idx} total={projects.length} />
          ))}
        </div>

        <AnimatePresence>
          {showRightArrow && (
            <motion.button 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="scroll-arrow right"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
