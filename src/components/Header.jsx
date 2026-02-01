import { useContext } from "react";
import { useTheme } from "../theme/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faEnvelope, faPhone, faLink } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useContext(LanguageContext);

  return (
    <header className="header">
      {/* Centered block */}
      <div className="header-center">
        <h1>{t("header.title")}</h1>
        <p className="title">
          {t("header.subtitle")}
        </p>
      </div>

      {/* Top right toggle */}
      <div className="header-top">
        <button className="theme-toggle fixed-toggle" onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} style={{ fontSize: "16px" }} />
        </button>

      </div>

      {/* Left aligned contact */}
      <div className="contact">
        <a href="mailto:laddha.pranita1988@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} className="icon" style={{ fontSize: "16px" }} /> laddha.pranita1988@gmail.com
        </a>

        <a href="tel:+919623243042">
          <FontAwesomeIcon icon={faPhone} className="icon" style={{ fontSize: "16px" }} /> +91 9623243042
        </a>

        <a
          href="https://linkedin.com/in/pranita-laddha-2a035b94"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLink} className="icon" style={{ fontSize: "16px" }} /> linkedin.com/in/pranita-laddha-2a035b94
        </a>
      </div>
    </header>
  );
}
