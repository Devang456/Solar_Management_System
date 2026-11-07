import React from "react";
import { useNavigate } from "react-router-dom";
import { PORTFOLIO_CONFIG } from "./portfolioConfig";
import { ArrowRightIcon, ExternalLinkIcon, SolarSunIcon } from "./LandingIcons";

export default function CTASection() {
  const navigate = useNavigate();

  const handleBackToPortfolio = () => {
    if (PORTFOLIO_CONFIG.portfolioUrl && PORTFOLIO_CONFIG.portfolioUrl !== "#portfolio") {
      window.open(PORTFOLIO_CONFIG.portfolioUrl, "_blank", "noopener,noreferrer");
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="solar-cta-section">
      <div className="solar-cta-container">
        {/* Ambient Gradient Glows */}
        <div className="solar-cta-glow solar-cta-glow--left" />
        <div className="solar-cta-glow solar-cta-glow--right" />

        <div className="solar-cta-card">
          <div className="solar-cta-pill">
            <SolarSunIcon size={16} />
            <span>Developer Portfolio Project Showcase</span>
          </div>

          <h2 className="solar-cta-title">
            Ready to Explore Solar Intelligence?
          </h2>

          <p className="solar-cta-description">
            Experience the complete solar energy operations SaaS in action.
            Explore the live dashboard, examine the IoT telemetry feeds, or inspect the
            engineering architecture in my developer portfolio.
          </p>

          <div className="solar-cta-buttons">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="solar-cta-btn solar-cta-btn--primary"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRightIcon size={18} />
            </button>

            <button
              onClick={handleBackToPortfolio}
              className="solar-cta-btn solar-cta-btn--secondary"
            >
              <span>Back to Developer Portfolio</span>
              <ExternalLinkIcon size={16} />
            </button>
          </div>

          <div className="solar-cta-footer-note">
            <span>Production-grade full-stack project • Built with React 19, Recharts & Node.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}

