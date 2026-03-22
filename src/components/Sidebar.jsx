import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'WORKS', path: '/works' },
    { name: 'ABOUT', path: '/about' },
  ];

  const socialItems = [
    { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/pranita-laddha-2a035b94/' },
    { icon: <Github size={18} />, url: 'https://github.com/pranitaladdha1988?tab=repositories' },
    // { icon: <Instagram size={18} />, url: 'https://instagram.com' },
    { icon: <Mail size={18} />, url: 'mailto:laddha.pranita1988@gmail.com' },
  ];

  return (
    <motion.aside
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sidebar-container"
    >
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <Link to="/">PL.</Link>
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

          <div className="social-links">
            {socialItems.map((social, index) => {
              const isEmail = social.url.startsWith('mailto:');
              return (
                <a 
                  key={index} 
                  href={social.url} 
                  target={isEmail ? "_self" : "_blank"} 
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              );
            })}
          </div>

        <ResumeDownload />

        <div className="sidebar-footer">
          © {new Date().getFullYear()} PRANITA LADDHA
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
