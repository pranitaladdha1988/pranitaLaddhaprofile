import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/LanguageSelector.css";

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" }
  ];

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${language === lang.code ? "active" : ""}`}
          onClick={() => setLanguage(lang.code)}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
