import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'project'
  const springConfig = { damping: 30, stiffness: 250 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      const projectCard = target.closest('.project-card') || target.closest('.product-item');
      const interactive = target.closest('a') || target.closest('button') || target.classList.contains('interactive');

      if (projectCard) {
        setCursorType('project');
      } else if (interactive) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "var(--fg-color)",
      mixBlendMode: "difference"
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "var(--fg-color)",
      mixBlendMode: "difference"
    },
    project: {
      width: 100,
      height: 100,
      backgroundColor: "#ffffff",
      mixBlendMode: "normal",
      color: "#000000"
    }
  };

  return (
    <motion.div
      className="custom-cursor"
      animate={cursorType}
      variants={variants}
      style={{
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {cursorType === 'project' && (
        <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px' }}>
          VIEW
        </span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
