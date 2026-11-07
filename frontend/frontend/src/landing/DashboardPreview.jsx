import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartActivityIcon,
  ArrowRightIcon,
} from "./LandingIcons";
import dashboardScreenshot from "../assets/images/project-dashboard.png";
import projectDemoImg from "../assets/images/solar-rooftop-site.jpg";

// Fully populated monthly clean yield vs self-consumption dataset
// Peak in November matches user's exact dashboard (1.2 MWh Clean Solar Yield / 0.5 MWh Self-Consumption)
const monthlyYieldData = {
  "3M": [
    { month: "Sep", yield: 1040, consumption: 460 },
    { month: "Oct", yield: 1120, consumption: 490 },
    { month: "Nov", yield: 1200, consumption: 540 },
  ],
  "6M": [
    { month: "Jun", yield: 760, consumption: 340 },
    { month: "Jul", yield: 850, consumption: 380 },
    { month: "Aug", yield: 940, consumption: 420 },
    { month: "Sep", yield: 1040, consumption: 460 },
    { month: "Oct", yield: 1120, consumption: 490 },
    { month: "Nov", yield: 1200, consumption: 540 },
  ],
  "12M": [
    { month: "Dec", yield: 620, consumption: 480 },
    { month: "Jan", yield: 680, consumption: 450 },
    { month: "Feb", yield: 750, consumption: 420 },
    { month: "Mar", yield: 860, consumption: 400 },
    { month: "Apr", yield: 980, consumption: 430 },
    { month: "May", yield: 1090, consumption: 470 },
    { month: "Jun", yield: 760, consumption: 340 },
    { month: "Jul", yield: 850, consumption: 380 },
    { month: "Aug", yield: 940, consumption: 420 },
    { month: "Sep", yield: 1040, consumption: 460 },
    { month: "Oct", yield: 1120, consumption: 490 },
    { month: "Nov", yield: 1200, consumption: 540 },
  ],
};

// Fully populated multi-channel Lead Sources matching the Donut chart
const leadSourcesData = [
  { name: "Direct Site Surveys", value: 35, count: 1, color: "#0b3d3a" },
  { name: "Organic Inquiries", value: 30, count: 1, color: "#10b981" },
  { name: "Customer Referrals", value: 20, count: 0, color: "#e8a33d" },
  { name: "Commercial Partners", value: 15, count: 0, color: "#2563eb" },
];

// 8 KPI Cards matching user's exact screenshot layout, values and border colors
const KPI_CARDS = [
  {
    title: "TOTAL LEADS",
    value: "2",
    topColor: "#3b82f6", // Blue
    bgColor: "#eff6ff",
    iconColor: "#2563eb",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "ACTIVE CUSTOMERS",
    value: "2",
    topColor: "#10b981", // Green
    bgColor: "#ecfdf5",
    iconColor: "#059669",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "PENDING QUOTES",
    value: "0",
    topColor: "#f97316", // Orange
    bgColor: "#fff7ed",
    iconColor: "#ea580c",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "PIPELINE VALUE",
    value: "₹4,20,000",
    topColor: "#8b5cf6", // Purple
    bgColor: "#f5f3ff",
    iconColor: "#7c3aed",
    icon: (
      <span style={{ fontSize: "19px", fontWeight: "700" }}>₹</span>
    ),
  },
  {
    title: "TOTAL INSTALLATIONS",
    value: "2",
    topColor: "#06b6d4", // Teal
    bgColor: "#ecfeff",
    iconColor: "#0891b2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    title: "TOTAL REVENUE",
    value: "₹5,19,200",
    topColor: "#f59e0b", // Yellow/Amber
    bgColor: "#fefce8",
    iconColor: "#d97706",
    icon: (
      <span style={{ fontSize: "19px", fontWeight: "700" }}>₹</span>
    ),
  },
  {
    title: "OUTSTANDING PAYMENTS",
    value: "₹0",
    topColor: "#ef4444", // Red
    bgColor: "#fef2f2",
    iconColor: "#dc2626",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "SETTLED INVOICES",
    value: "2",
    topColor: "#ec4899", // Pink
    bgColor: "#fdf2f8",
    iconColor: "#db2777",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <polyline points="7 15 9 17 13 13" />
      </svg>
    ),
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="solar-chart-tooltip">
        <p className="solar-chart-tooltip-label">{label} 2026 Production</p>
        <p className="solar-chart-tooltip-gen">
          <span className="dot dot--solar" /> Clean Solar Yield: <strong>{payload[0]?.value} kWh</strong>
        </p>
        {payload[1] && (
          <p className="solar-chart-tooltip-cons">
            <span className="dot dot--cons" /> Self-Consumption: <strong>{payload[1]?.value} kWh</strong>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function DashboardPreview() {
  const [viewMode, setViewMode] = useState("interactive"); // "interactive" or "screenshot"
  const [timeframe, setTimeframe] = useState("6M");
  const navigate = useNavigate();

  return (
    <section id="dashboard-preview" className="solar-preview-section">
      <div className="solar-preview-container">
        {/* Section Header — Clean, grounded, and aligned with project */}
        <div className="solar-section-header">
          <span className="solar-section-pill">
            <ChartActivityIcon size={14} />
            <span>Live Application Showcase</span>
          </span>
          <h2 className="solar-section-title">
            Solar <span className="solar-gradient-text">PV Management</span> System
          </h2>
          <p className="solar-section-subtitle">
            Live dashboard preview — tracking solar generation (1.2 MWh), customer pipeline (₹4.20L), and verified field installations.
          </p>
        </div>

        {/* View Mode Toggle: Interactive UI vs Real Screenshot */}
        <div className="solar-preview-tabs-bar">
          <button
            className={`solar-preview-tab-btn ${viewMode === "interactive" ? "active" : ""}`}
            onClick={() => setViewMode("interactive")}
          >
            <span className="btn-beacon" />
            <span>Live Site Preview</span>
          </button>
          <button
            className={`solar-preview-tab-btn ${viewMode === "screenshot" ? "active" : ""}`}
            onClick={() => setViewMode("screenshot")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Actual System Screenshot</span>
          </button>
        </div>

        {/* Browser Chrome Container */}
        <div className="solar-browser-frame">
          {/* Top Browser Bar */}
          <div className="solar-browser-header">
            <div className="solar-browser-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>

            <div className="solar-browser-address-bar">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>app.solarmanagement.io/admin/dashboard</span>
              <span className="solar-browser-secure-badge">Production v1.0.0</span>
            </div>

            <div className="solar-browser-status">
              <span className="solar-browser-live-beacon" />
              <span>Clean Solar Yield: <strong>1.2 MWh (45% Self-Sufficiency)</strong></span>
            </div>
          </div>

          {/* Browser Inner Workspace */}
          <div className="solar-browser-content">
            {viewMode === "screenshot" ? (
              /* ACTUAL SYSTEM SCREENSHOT — Project Dashboard Replica (KPI Cards + Charts) */
              <div className="solar-actual-dashboard-replica">
                {/* Project-styled Topbar inside dashboard */}
                <div className="solar-replica-topbar">
                  <div className="replica-topbar-left">
                    <h3 className="replica-welcome-title">Solar Operations Overview</h3>
                    <p className="replica-welcome-subtitle">
                      Active Telemetry: 2 Commercial Sites • 1.2 MWh Clean Yield • ₹5,19,200 Revenue Settled
                    </p>
                  </div>
                  <div className="replica-topbar-right">
                    <div className="replica-system-status-chip">
                      <span className="dot dot--green" />
                      <span>System Online (v1.0.0)</span>
                    </div>
                  </div>
                </div>

                {/* 8 KPI STAT CARDS */}
                <div className="solar-actual-kpi-grid">
                  {KPI_CARDS.map((card, idx) => (
                    <div
                      key={idx}
                      className="solar-actual-kpi-card"
                      style={{ borderTop: `3.5px solid ${card.topColor}` }}
                    >
                      <div
                        className="kpi-icon-pill"
                        style={{ backgroundColor: card.bgColor, color: card.iconColor }}
                      >
                        {card.icon}
                      </div>
                      <div className="kpi-text-col">
                        <span className="kpi-title-label">{card.title}</span>
                        <span className="kpi-main-number">{card.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MAIN ANALYTICS SECTION */}
                <div className="solar-actual-analytics-grid">
                  {/* Left: Solar PV Energy Monitoring Card */}
                  <div className="solar-actual-yield-card">
                    <div className="yield-card-top">
                      <div>
                        <h4 className="yield-card-title">
                          Solar PV Energy Monitoring & Generation Yield
                        </h4>
                        <p className="yield-card-sub">
                          Monthly Clean Solar Generation Yield (kWh) vs Self-Consumption (kWh)
                        </p>
                      </div>
                      <div className="yield-top-controls">
                        <span className="self-sufficiency-badge">45% Self-Sufficiency</span>
                        <div className="timeframe-switch-pills">
                          {["3M", "6M", "12M"].map((tf) => (
                            <button
                              key={tf}
                              className={`tf-pill-btn ${timeframe === tf ? "active" : ""}`}
                              onClick={() => setTimeframe(tf)}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="yield-pills-row">
                      <span className="metric-pill metric-pill--yield">
                        <span className="dot dot--green" /> 1.2 MWh Clean Solar Yield
                      </span>
                      <span className="metric-pill metric-pill--cons">
                        <span className="dot dot--orange" /> 0.5 MWh Self-Consumption
                      </span>
                    </div>
                    <div style={{ width: "100%", height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyYieldData[timeframe]} margin={{ top: 15, right: 15, left: -10, bottom: 0 }} barGap={6}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} unit=" kWh" domain={[0, 1200]} ticks={[0, 300, 600, 900, 1200]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="yield" fill="#059669" radius={[4, 4, 0, 0]} name="Clean Solar Yield" maxBarSize={28} />
                          <Bar dataKey="consumption" fill="#d97706" radius={[4, 4, 0, 0]} name="Self-Consumption" maxBarSize={28} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="yield-bottom-legend">
                      <span className="legend-chip"><span className="dot dot--green" /> Clean Solar Yield (kWh)</span>
                      <span className="legend-chip"><span className="dot dot--orange" /> Self-Consumption (kWh)</span>
                    </div>
                  </div>

                  {/* Right: Lead Sources Donut Chart Card */}
                  <div className="solar-actual-leads-card">
                    <h4 className="leads-card-title">Lead Sources</h4>
                    <div className="donut-chart-wrapper">
                      <div style={{ width: "100%", height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={leadSourcesData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                              {leadSourcesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="donut-center-label">
                        <span className="donut-main-number">2</span>
                        <span className="donut-sub-text">Total Leads</span>
                      </div>
                    </div>
                    <div className="lead-sources-footer-tags">
                      {leadSourcesData.map((src, i) => (
                        <div key={i} className="source-tag-item">
                          <span className="source-color-dot" style={{ backgroundColor: src.color }} />
                          <span className="source-name">{src.name}</span>
                          <span className="source-pct">{src.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* INTERACTIVE LIVE UI — Clean project-dashboard screenshot view */
              <div className="solar-site-hero-view">
                {/* Full-bleed solar site image with clean overlay info */}
                <div className="solar-site-img-wrapper">
                  <img
                    src={projectDemoImg}
                    alt="Commercial Rooftop Solar Installation — Managed by Solar PV Management System"
                    className="solar-site-hero-img"
                  />
                  {/* Subtle dark overlay at bottom for readability */}
                  <div className="solar-site-overlay" />

                  {/* Bottom info strip — project-related stats */}
                  <div className="solar-site-info-strip">
                    <div className="solar-site-info-left">
                      <span className="solar-site-info-title">Commercial Rooftop Solar Installation</span>
                      <span className="solar-site-info-sub">Monitored & Managed via Solar PV Management System</span>
                    </div>
                    <div className="solar-site-info-stats">
                      <div className="site-stat-chip">
                        <span className="site-stat-val">1.2 MWh</span>
                        <span className="site-stat-label">Clean Yield</span>
                      </div>
                      <div className="site-stat-chip">
                        <span className="site-stat-val">45%</span>
                        <span className="site-stat-label">Self-Sufficiency</span>
                      </div>
                      <div className="site-stat-chip">
                        <span className="site-stat-val">2</span>
                        <span className="site-stat-label">Active Sites</span>
                      </div>
                      <div className="site-stat-chip">
                        <span className="site-stat-val">₹5.19L</span>
                        <span className="site-stat-label">Settled Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Browser Strip — Aligned with actual dashboard metrics */}
          <div className="solar-browser-footer-strip">
            <div className="solar-browser-footer-info">
              <span className="pulse-beacon" />
              <span>Live Operations: 8 Core Performance Metrics • Clean Solar Yield (1.2 MWh) • Active Installations (2)</span>
            </div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="solar-browser-footer-cta"
            >
              <span>Explore Live Admin Portal</span>
              <ArrowRightIcon size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
