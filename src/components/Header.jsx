import { useState } from "react";
import logo from "../assets/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="wrap nav">
        <a href="#home" className="brand">
          <img src={logo} alt="DeCircle Solar logo" />
          <span className="brand-word">DeCircle Solar</span>
        </a>
        <nav
          className="links"
          style={
            menuOpen
              ? {
                  display: "flex",
                  position: "fixed",
                  top: "80px",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  flexDirection: "column",
                  padding: "20px 28px",
                  borderBottom: "1px solid var(--border)",
                  gap: "18px",
                  zIndex: 99,
                }
              : undefined
          }
        >
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#pillars" onClick={() => setMenuOpen(false)}>
            Platform
          </a>
          <a href="#team" onClick={() => setMenuOpen(false)}>
            Team
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="nav-right">
          <a href="#contact" className="btn btn-primary">
            Get in Touch
          </a>
          <button
            className="burger"
            id="burger"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
