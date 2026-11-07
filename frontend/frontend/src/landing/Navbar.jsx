import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SolarBrandLogo, ArrowRightIcon } from "./LandingIcons";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`solar-nav ${isScrolled ? "solar-nav--scrolled" : ""}`}>
      <div className="solar-nav-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="solar-nav-brand" onClick={(e) => scrollToSection(e, "hero")}>
          <div className="solar-nav-logo-wrapper">
            <SolarBrandLogo size={34} />
            <span className="solar-nav-live-dot" title="Platform Online" />
          </div>
          <div className="solar-nav-brand-text">
            <span className="solar-nav-brand-title">SolarOps</span>
            <span className="solar-nav-brand-tag">Enterprise SaaS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="solar-nav-links">
          <a href="#hero" onClick={(e) => scrollToSection(e, "hero")}>
            Overview
          </a>
          <a href="#dashboard-preview" onClick={(e) => scrollToSection(e, "dashboard-preview")}>
            Dashboard
          </a>
          <a href="#features" onClick={(e) => scrollToSection(e, "features")}>
            Features
          </a>
          <a href="#architecture" onClick={(e) => scrollToSection(e, "architecture")}>
            Architecture
          </a>
          <a href="#tech-stack" onClick={(e) => scrollToSection(e, "tech-stack")}>
            Tech Stack
          </a>
          <a href="#showcase" onClick={(e) => scrollToSection(e, "showcase")}>
            Showcase
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="solar-nav-actions">
          <Link to="/admin/login" className="solar-nav-btn solar-nav-btn--outline">
            Sign In
          </Link>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="solar-nav-btn solar-nav-btn--primary"
          >
            <span>Explore Dashboard</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="solar-nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`solar-hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
          <span className={`solar-hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="solar-nav-mobile-menu">
          <div className="solar-nav-mobile-links">
            <a href="#hero" onClick={(e) => scrollToSection(e, "hero")}>
              Overview
            </a>
            <a href="#dashboard-preview" onClick={(e) => scrollToSection(e, "dashboard-preview")}>
              Interactive Dashboard
            </a>
            <a href="#features" onClick={(e) => scrollToSection(e, "features")}>
              Core Features (28 Modules)
            </a>
            <a href="#architecture" onClick={(e) => scrollToSection(e, "architecture")}>
              Engineering Architecture
            </a>
            <a href="#tech-stack" onClick={(e) => scrollToSection(e, "tech-stack")}>
              Technology Stack
            </a>
            <a href="#showcase" onClick={(e) => scrollToSection(e, "showcase")}>
              Application UI Gallery
            </a>
          </div>

          <div className="solar-nav-mobile-actions">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/admin/dashboard");
              }}
              className="solar-nav-btn solar-nav-btn--primary solar-nav-btn--full"
            >
              <span>Explore Dashboard</span>
              <ArrowRightIcon size={16} />
            </button>

            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="solar-nav-btn solar-nav-btn--outline solar-nav-btn--full"
            >
              Sign In to Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

