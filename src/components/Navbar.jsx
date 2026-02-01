import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo"><a href="/">MyWebsite</a></div>

      <nav className={`nav-menu ${open ? "open" : ""}`}>
        <a href="/ai">AI</a>
      </nav>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </header>
  );
}
