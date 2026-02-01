import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useContext(LanguageContext);

  return (
    <header className="navbar">
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} style={{ fontSize: "16px" }} />
      </button>

      <div className="logo"><a href="/">{t("nav.myWebsite")}</a></div>

      <nav className={`nav-menu ${open ? "open" : ""}`}>
        <button 
          className="close-menu-btn"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: "16px" }} />
        </button>
        <a href="/ai" onClick={() => setOpen(false)}>{t("nav.ai")}</a>
      </nav>

      <div className="navbar-right">
        <LanguageSelector />
      </div>
    </header>
  );
}
