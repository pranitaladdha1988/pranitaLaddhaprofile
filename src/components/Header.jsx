import { useTheme } from "../theme/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      {/* Centered block */}
      <div className="header-center">
        <h1>Pranita Laddha</h1>
        <p className="title">
          Principal Frontend Architect | Enterprise & AI-Enabled Platforms
        </p>
      </div>

      {/* Top right toggle */}
      <div className="header-top">
        <button className="theme-toggle fixed-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>

      {/* Left aligned contact */}
      <div className="contact">
        <a href="mailto:laddha.pranita1988@gmail.com">
          📧 laddha.pranita1988@gmail.com
        </a>

        <a href="tel:+919623243042">
          📞 +91 9623243042
        </a>

        <a
          href="https://linkedin.com/in/pranita-laddha-2a035b94"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 linkedin.com/in/pranita-laddha-2a035b94
        </a>
      </div>
    </header>
  );
}
