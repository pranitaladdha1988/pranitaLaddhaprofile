import { useContext } from "react";
import { useTheme } from "../theme/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

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
          {theme === "light" ? t("header.themeToggle.light") : t("header.themeToggle.dark")}
        </button>

      </div>

      {/* Left aligned contact */}
      <div className="contact">
        <a href="mailto:laddha.pranita1988@gmail.com">
          {t("header.email")}
        </a>

        <a href="tel:+919623243042">
          {t("header.phone")}
        </a>

        <a
          href="https://linkedin.com/in/pranita-laddha-2a035b94"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("header.linkedin")}
        </a>
      </div>
    </header>
  );
}
