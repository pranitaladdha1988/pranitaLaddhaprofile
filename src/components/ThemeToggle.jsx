import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-switch-container">
      <button 
        className="theme-switch" 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        <motion.div 
          className="theme-switch-knob"
          initial={false}
          animate={{
            x: theme === 'light' ? 0 : 33
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25
          }}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
