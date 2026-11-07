import React from "react";
import { Link } from "react-router-dom";
import { PORTFOLIO_CONFIG } from "./portfolioConfig";
import { SolarBrandLogo, ExternalLinkIcon } from "./LandingIcons";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="solar-footer">
      <div className="solar-footer-container">
        {/* Top Footer Grid */}
        <div className="solar-footer-grid">
          {/* Brand & Mission Column */}
          <div className="solar-footer-brand-col">
            <div className="solar-footer-brand">
              <SolarBrandLogo size={36} />
              <div className="solar-footer-brand-text">
                <span className="brand-name">SolarOps</span>
                <span className="brand-badge">SaaS Platform</span>
              </div>
            </div>

            <p className="solar-footer-desc">
              An enterprise-grade solar energy management SaaS designed to monitor solar
              energy production, track real-time inverter performance, manage field installations,
              and streamline clean-energy business operations.
            </p>

            <div className="solar-footer-tags">
              <span className="tag">React 19</span>
              <span className="tag">Recharts</span>
              <span className="tag">Vite 6</span>
              <span className="tag">Node.js</span>
              <span className="tag">TimescaleDB</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="solar-footer-col">
            <h5 className="solar-footer-heading">Product Navigation</h5>
            <ul className="solar-footer-links">
              <li>
                <a href="#overview" onClick={(e) => { e.preventDefault(); scrollTo("overview"); }}>
                  System Overview
                </a>
              </li>
              <li>
                <a href="#dashboard-preview" onClick={(e) => { e.preventDefault(); scrollTo("dashboard-preview"); }}>
                  Interactive Dashboard
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>
                  Core Features (28 Modules)
                </a>
              </li>
              <li>
                <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollTo("showcase"); }}>
                  Application UI Gallery
                </a>
              </li>
              <li>
                <a href="#tech-stack" onClick={(e) => { e.preventDefault(); scrollTo("tech-stack"); }}>
                  Technology Stack
                </a>
              </li>
            </ul>
          </div>

          {/* System Modules Column */}
          <div className="solar-footer-col">
            <h5 className="solar-footer-heading">Implemented Modules</h5>
            <ul className="solar-footer-links">
              <li><span>IoT Solar Monitoring & Telemetry</span></li>
              <li><span>Rooftop Site Survey & CAD</span></li>
              <li><span>Installation Milestones</span></li>
              <li><span>Dynamic Quotation & GST</span></li>
              <li><span>PM Surya Ghar Subsidy</span></li>
              <li><span>AMC & Electrical Testing</span></li>
            </ul>
          </div>

          {/* Developer Portfolio Column */}
          <div className="solar-footer-col">
            <h5 className="solar-footer-heading">Developer Links</h5>
            <ul className="solar-footer-links">
              <li>
                <Link to="/admin/login">
                  Admin Sign In Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard">
                  Launch Live Dashboard
                </Link>
              </li>
              {PORTFOLIO_CONFIG.portfolioUrl && (
                <li>
                  <a
                    href={PORTFOLIO_CONFIG.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link-item"
                  >
                    <span>Developer Portfolio</span>
                    <ExternalLinkIcon size={12} />
                  </a>
                </li>
              )}
              {PORTFOLIO_CONFIG.githubRepoUrl && (
                <li>
                  <a
                    href={PORTFOLIO_CONFIG.githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link-item"
                  >
                    <span>GitHub Codebase</span>
                    <ExternalLinkIcon size={12} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="solar-footer-bottom">
          <p className="copyright-text">
            © {currentYear} Solar Management System (SPMS). Designed & developed for portfolio showcase.
          </p>

          <div className="footer-badges">
            <span className="status-indicator">
              <span className="dot" /> Platform Telemetry: Online
            </span>
            <span className="version-tag">{PORTFOLIO_CONFIG.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

