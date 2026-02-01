import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useContext(LanguageContext);

  return (
    <header className="navbar">
      <div className="logo"><a href="/">{t("nav.myWebsite")}</a></div>

      <nav className={`nav-menu ${open ? "open" : ""}`}>
        <a href="/ai">{t("nav.ai")}</a>
      </nav>

      <div className="navbar-right">
        <LanguageSelector />
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
