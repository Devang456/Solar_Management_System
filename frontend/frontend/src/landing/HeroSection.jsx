import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, BoltIcon, CheckCircleIcon } from "./LandingIcons";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="solar-hero">
      {/* Background ambient lighting effects (Linear/Stripe style) */}
      <div className="solar-hero-glow solar-hero-glow--primary" />
      <div className="solar-hero-glow solar-hero-glow--secondary" />
      <div className="solar-hero-grid-pattern" />

      <div className="solar-hero-container">
        {/* Release / Capability Pill */}
        <div className="solar-hero-pill-wrapper">
          <div className="solar-hero-pill">
            <span className="solar-hero-pill-badge">
              <BoltIcon size={13} className="solar-hero-pill-bolt" />
              <span>Full-Stack SaaS</span>
            </span>
            <span className="solar-hero-pill-text">
              28 Integrated Modules • Real-Time IoT Telemetry • 7 RBAC Roles
            </span>
            <span className="solar-hero-pill-arrow">→</span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="solar-hero-title">
          Smarter Solar Management.
          <br />
          <span className="solar-hero-title-gradient">A Brighter Future.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="solar-hero-description">
          A modern solar management platform designed to monitor solar energy production,
          track performance, manage installations, and visualize energy insights through an
          intuitive dashboard.
        </p>

        {/* Action CTAs */}
        <div className="solar-hero-actions">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="solar-hero-btn solar-hero-btn--primary"
          >
            <span>Explore Dashboard</span>
            <ArrowRightIcon size={18} />
          </button>

          <button
            onClick={() => handleScrollTo("features")}
            className="solar-hero-btn solar-hero-btn--secondary"
          >
            <span>View Project Features</span>
          </button>
        </div>

        {/* Trust & Capability Highlights */}
        <div className="solar-hero-highlights">
          <div className="solar-hero-highlight-item">
            <CheckCircleIcon size={16} className="solar-hero-highlight-icon" />
            <span>Real-Time Generation Curves</span>
          </div>
          <div className="solar-hero-highlight-item">
            <CheckCircleIcon size={16} className="solar-hero-highlight-icon" />
            <span>Roof CAD & Sizing Engine</span>
          </div>
          <div className="solar-hero-highlight-item">
            <CheckCircleIcon size={16} className="solar-hero-highlight-icon" />
            <span>Field Milestones & Net Metering</span>
          </div>
          <div className="solar-hero-highlight-item">
            <CheckCircleIcon size={16} className="solar-hero-highlight-icon" />
            <span>GST Billing & Subsidies</span>
          </div>
        </div>
      </div>
    </section>
  );
}

