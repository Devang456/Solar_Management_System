import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartActivityIcon,
  CadDesignIcon,
  QuotationDocIcon,
  InstallationIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
} from "./LandingIcons";

const SHOWCASE_TABS = [
  {
    id: "monitoring",
    label: "IoT Solar Monitoring",
    icon: <ChartActivityIcon size={16} />,
    module: "SolarMonitoring.jsx",
    route: "/admin/dashboard",
    title: "Live Solar Generation & Inverter Vitals",
    subtitle:
      "Telemetry stream monitoring DC array output, dual MPPT string voltage, AC grid frequency, battery state of charge (ESS), and carbon reduction metrics.",
    keyMetrics: [
      { label: "Active Telemetry Output", value: "7.82 kW" },
      { label: "Inverter Conversion Efficiency", value: "94.6%" },
      { label: "Grid Feed-In Frequency", value: "50.02 Hz" },
      { label: "Lifetime Environmental CO₂ Saved", value: "14.8 Tons" },
    ],
  },
  {
    id: "cad",
    label: "CAD Rooftop Design",
    icon: <CadDesignIcon size={16} />,
    module: "SolarDesign.jsx & SiteSurvey.jsx",
    route: "/admin/solar-design",
    title: "Rooftop Sizing, Azimuth & Payback Simulation",
    subtitle:
      "Calculates solar panel array layouts, shadow casting analysis, DC-to-AC sizing ratio, and predicts financial returns with estimated payback periods.",
    keyMetrics: [
      { label: "Estimated Roof Usable Area", value: "1,450 sq ft" },
      { label: "Recommended System Size", value: "15.4 kWp" },
      { label: "Annual Projected Generation", value: "22,500 kWh" },
      { label: "Payback Period", value: "3.8 Years" },
    ],
  },
  {
    id: "quotations",
    label: "Quotation & GST Engine",
    icon: <QuotationDocIcon size={16} />,
    module: "quotation.jsx",
    route: "/admin/quotations",
    title: "Itemized BOMs, GST Calculations & PDF Export",
    subtitle:
      "Generates itemized equipment schedules for panels, inverters, structures, and wiring with GST tax schedules and instant PDF exports via jsPDF.",
    keyMetrics: [
      { label: "Itemized BOM Equipment", value: "38 Panels / 1 Inverter" },
      { label: "Subtotal Value", value: "₹5,40,000" },
      { label: "GST Tax Schedule (18%)", value: "₹97,200" },
      { label: "Customer Approval Status", value: "Digitally Accepted" },
    ],
  },
  {
    id: "installation",
    label: "Installation Milestones",
    icon: <InstallationIcon size={16} />,
    module: "InstallationManagement.jsx",
    route: "/admin/installations",
    title: "Multi-Stage Site Deployments & Testing",
    subtitle:
      "Manages field deployment phases from civil foundation and structure mounting to inverter cabling, electrical testing (Voc/Isc), and net metering.",
    keyMetrics: [
      { label: "Current Phase", value: "Phase 5: Electrical Testing" },
      { label: "Insulation Resistance", value: "1.2 MΩ (Passed)" },
      { label: "Open Circuit Voltage Voc", value: "42.1V / module" },
      { label: "DISCOM Net Meter Sync", value: "In Progress" },
    ],
  },
];

export default function ShowcaseSection() {
  const [activeTabId, setActiveTabId] = useState("monitoring");
  const navigate = useNavigate();

  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];

  return (
    <section id="showcase" className="solar-showcase-section">
      <div className="solar-showcase-container">
        {/* Section Header */}
        <div className="solar-section-header">
          <span className="solar-section-pill">
            <span>Application Module Gallery</span>
          </span>
          <h2 className="solar-section-title">
            Deep-Dive Into the Actual Core Modules
          </h2>
          <p className="solar-section-subtitle">
            Explore authentic workflows built inside the application. Every screen is designed
            with high ergonomic clarity for solar engineers, accountants, and field teams.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="solar-showcase-tabs">
          {SHOWCASE_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`solar-showcase-tab-btn ${activeTabId === tab.id ? "active" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Module Showcase Card */}
        <div className="solar-showcase-card">
          {/* Left Column: Module Description & Key Highlights */}
          <div className="solar-showcase-details">
            <div className="showcase-module-tag">
              <span className="dot dot--pine" />
              <span>Module: {activeTab.module}</span>
            </div>

            <h3 className="showcase-detail-title">{activeTab.title}</h3>
            <p className="showcase-detail-desc">{activeTab.subtitle}</p>

            {/* Key Metrics Grid */}
            <div className="showcase-metrics-grid">
              {activeTab.keyMetrics.map((km, i) => (
                <div key={i} className="showcase-metric-box">
                  <span className="showcase-metric-label">{km.label}</span>
                  <span className="showcase-metric-value">{km.value}</span>
                </div>
              ))}
            </div>

            {/* Direct CTA */}
            <div className="showcase-cta-row">
              <button
                onClick={() => navigate(activeTab.route)}
                className="showcase-launch-btn"
              >
                <span>Launch {activeTab.label} in App</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Realistic UI Viewport Mockup */}
          <div className="solar-showcase-viewport">
            <div className="viewport-browser-bar">
              <div className="viewport-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <span className="viewport-url">
                app.solarflow.io{activeTab.route}
              </span>
            </div>

            <div className="viewport-screen">
              {activeTabId === "monitoring" && (
                <div className="viewport-monitoring-preview">
                  <div className="vp-header-row">
                    <h6>Solar Array Generation Curve (Live)</h6>
                    <span className="vp-badge vp-badge--live">● 7.82 kW Active</span>
                  </div>
                  <div className="vp-mock-curve">
                    <div className="curve-bar bar-1" style={{ height: "25%" }} />
                    <div className="curve-bar bar-2" style={{ height: "45%" }} />
                    <div className="curve-bar bar-3" style={{ height: "70%" }} />
                    <div className="curve-bar bar-4" style={{ height: "92%" }} />
                    <div className="curve-bar bar-5" style={{ height: "100%" }} />
                    <div className="curve-bar bar-6" style={{ height: "88%" }} />
                    <div className="curve-bar bar-7" style={{ height: "65%" }} />
                    <div className="curve-bar bar-8" style={{ height: "35%" }} />
                  </div>
                  <div className="vp-stats-strip">
                    <div className="vp-stat-chip">
                      <span>DC Voltage</span>
                      <strong>418.4 V</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>Efficiency</span>
                      <strong>94.6%</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>Battery ESS</span>
                      <strong>94%</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>Inverter Temp</span>
                      <strong>34.2 °C</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === "cad" && (
                <div className="viewport-cad-preview">
                  <div className="vp-header-row">
                    <h6>Rooftop Array Geometric Sizing</h6>
                    <span className="vp-badge vp-badge--cad">Azimuth: 180° South • Tilt: 22°</span>
                  </div>
                  <div className="vp-cad-grid">
                    <div className="cad-roof-box">
                      <div className="cad-panel-grid">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="cad-cell" title={`Panel #${i + 1} (540W Mono)`} />
                        ))}
                      </div>
                      <span className="cad-roof-label">Roof Section A (Main South Ridge)</span>
                    </div>
                  </div>
                  <div className="vp-stats-strip">
                    <div className="vp-stat-chip">
                      <span>Modules</span>
                      <strong>24x 540W</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>Capacity</span>
                      <strong>12.96 kWp</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>Est. ROI</span>
                      <strong>26.4% / yr</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === "quotations" && (
                <div className="viewport-quote-preview">
                  <div className="vp-header-row">
                    <h6>Quotation #QT-2026-042 (Solar Rooftop)</h6>
                    <span className="vp-badge vp-badge--green">Accepted by Client</span>
                  </div>
                  <div className="vp-quote-items">
                    <div className="vp-quote-item-row header">
                      <span>Component</span>
                      <span>Qty</span>
                      <span>Rate</span>
                      <span>Amount</span>
                    </div>
                    <div className="vp-quote-item-row">
                      <span>540W Mono PERC Solar Panels</span>
                      <span>28</span>
                      <span>₹11,500</span>
                      <span>₹3,22,000</span>
                    </div>
                    <div className="vp-quote-item-row">
                      <span>15kW 3-Phase Grid-Tied Inverter</span>
                      <span>1</span>
                      <span>₹1,15,000</span>
                      <span>₹1,15,000</span>
                    </div>
                    <div className="vp-quote-item-row">
                      <span>Aluminum Mounting Structure & BOS</span>
                      <span>1 Lot</span>
                      <span>₹55,000</span>
                      <span>₹55,000</span>
                    </div>
                  </div>
                  <div className="vp-stats-strip">
                    <div className="vp-stat-chip">
                      <span>Subtotal</span>
                      <strong>₹4,92,000</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>GST (18%)</span>
                      <strong>₹88,560</strong>
                    </div>
                    <div className="vp-stat-chip">
                      <span>Total</span>
                      <strong>₹5,80,560</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === "installation" && (
                <div className="viewport-installation-preview">
                  <div className="vp-header-row">
                    <h6>Installation Milestones & Verification</h6>
                    <span className="vp-badge vp-badge--amber">Stage 5 / 7</span>
                  </div>
                  <div className="vp-milestone-list">
                    <div className="vp-milestone-row done">
                      <span className="icon">✓</span>
                      <span>Civil Foundation & Structure Anchor</span>
                      <span className="date">Oct 28</span>
                    </div>
                    <div className="vp-milestone-row done">
                      <span className="icon">✓</span>
                      <span>Solar Module Rail Mounting & Clamping</span>
                      <span className="date">Nov 02</span>
                    </div>
                    <div className="vp-milestone-row done">
                      <span className="icon">✓</span>
                      <span>DC String Cabling & Combiner Box (AJB)</span>
                      <span className="date">Nov 04</span>
                    </div>
                    <div className="vp-milestone-row current">
                      <span className="icon">⚡</span>
                      <span>Electrical Insulation & Voc/Isc Testing</span>
                      <span className="date">Today (75%)</span>
                    </div>
                    <div className="vp-milestone-row pending">
                      <span className="icon">○</span>
                      <span>DISCOM Bi-Directional Net Meter Sync</span>
                      <span className="date">Pending</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
