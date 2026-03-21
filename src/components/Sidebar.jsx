import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ theme, toggleTheme }) => {
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'WORKS', path: '/works' },
    { name: 'ABOUT', path: '/about' },
  ];

  const socialItems = [
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com' },
    { icon: <Github size={18} />, url: 'https://github.com' },
    { icon: <Instagram size={18} />, url: 'https://instagram.com' },
    { icon: <Mail size={18} />, url: 'mailto:contact@example.com' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sidebar"
    >
      <div className="sidebar-top">
        <Link to="/" className="sidebar-logo">
          PL.
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <div className="social-links">
          {socialItems.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
              {social.icon}
            </a>
          ))}
        </div>
        
        <div className="copyright">
          © {new Date().getFullYear()} PRANITA LADDHA
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
