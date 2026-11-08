import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast";
import { adminLoginSchema } from "../../utils/AdminValidation";
import { hasAnyAccess } from "../../config/roles";
import { SolarBrandLogo } from "../../landing/LandingIcons";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();
  // Default selected tab MUST be "demo" per requirements
  const [activeTab, setActiveTab] = useState("demo"); // "demo" | "admin"
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { success, error: showError } = useToast();

  // Regular Administrator / Staff Login Form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: adminLoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      const result = await login(values.email, values.password);
      setLoading(false);
      setSubmitting(false);

      if (result?.success) {
        const hasAccess = hasAnyAccess(result.user?.permissions);
        success(
          hasAccess
            ? `Welcome back, ${result.user?.name || "Admin"}!`
            : "Signed in. Your account has no assigned permissions yet."
        );
        navigate(hasAccess ? "/admin/dashboard" : "/admin/access-denied");
      } else {
        showError(result?.message || "Invalid email or password.");
      }
    },
  });

  // One-Click Recruiter Demo Login Handler
  const handleDemoLogin = async () => {
    if (demoLoading || loading) return;
    setDemoLoading(true);
    try {
      const result = await demoLogin();
      setDemoLoading(false);

      if (result?.success) {
        success("Signed in as Recruiter Demo! Exploring 28 modules with read-only access.");
        navigate("/admin/dashboard");
      } else {
        showError(result?.message || "Demo login service temporarily unavailable. Please try again.");
      }
    } catch (err) {
      setDemoLoading(false);
      showError(err?.message || "Unable to establish demo session. Please try again.");
    }
  };

  return (
    <div className="solar-auth-page">
      {/* =========================================================================
          LEFT SHOWCASE PANEL (Desktop 50%) — Compact, Balanced Solar Visual
          ========================================================================= */}
      <aside className="solar-auth-showcase">
        {/* Ambient Glowing Energy Spheres */}
        <div className="solar-showcase-glow solar-showcase-glow--emerald" />
        <div className="solar-showcase-glow solar-showcase-glow--amber" />
        <div className="solar-showcase-grid-overlay" />

        <div className="solar-showcase-content">
          {/* Brand Header */}
          <Link to="/" className="solar-showcase-brand" title="Return to Homepage">
            <div className="solar-showcase-logo-frame">
              <SolarBrandLogo size={32} />
            </div>
            <div className="solar-showcase-brand-text">
              <span className="solar-showcase-brand-title">SolarOps</span>
              <span className="solar-showcase-brand-badge">Enterprise SaaS</span>
            </div>
          </Link>

          {/* Hero Headline & Description */}
          <div className="solar-showcase-hero">
            <div className="solar-showcase-pill">
              <span className="pulse-dot" />
              <span>Solar Telemetry &amp; Operations</span>
            </div>
            <h1 className="solar-showcase-headline">
              Powering a Smarter <span className="solar-gradient-text">Solar Future</span>
            </h1>
            <p className="solar-showcase-desc">
              Monitor solar performance, manage installations, and explore intelligent energy
              management from one powerful dashboard.
            </p>
          </div>

          {/* 3 Compact Feature Highlights */}
          <div className="solar-showcase-features">
            <div className="solar-feature-card">
              <div className="solar-feature-icon-box solar-feature-icon-box--green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="solar-feature-text">
                <div className="solar-feature-title-row">
                  <h4>Real-time Energy Monitoring</h4>
                  <span className="solar-stat-chip">1.2 MWh Live</span>
                </div>
                <p>Sub-second photovoltaic generation yield, inverter telemetry, and self-consumption.</p>
              </div>
            </div>

            <div className="solar-feature-card">
              <div className="solar-feature-icon-box solar-feature-icon-box--amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div className="solar-feature-text">
                <div className="solar-feature-title-row">
                  <h4>Solar Installation Management</h4>
                  <span className="solar-stat-chip">10 Stages</span>
                </div>
                <p>Rooftop CAD sizing, GPS structural audits, serialized BOM inventory, and dispatch.</p>
              </div>
            </div>

            <div className="solar-feature-card">
              <div className="solar-feature-icon-box solar-feature-icon-box--cyan">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="solar-feature-text">
                <div className="solar-feature-title-row">
                  <h4>Maintenance &amp; Performance Tracking</h4>
                  <span className="solar-stat-chip">99.98% Vitals</span>
                </div>
                <p>Automated DISCOM net metering, AMC preventative service tickets, and predictive alerts.</p>
              </div>
            </div>
          </div>

          {/* Bottom Live Operations Telemetry */}
          <div className="solar-showcase-footer">
            <div className="solar-live-status-pill">
              <span className="live-status-dot" />
              <span>Platform Telemetry: <strong>Online</strong> (v1.0.0)</span>
            </div>
            <span className="solar-showcase-security-tag">
              28 Modules • RBAC Security
            </span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT AUTHENTICATION PANEL (Desktop 50%) — Compact Two-Tab SaaS Card
          ========================================================================= */}
      <main className="solar-auth-main">
        {/* Mobile Header Brand Bar */}
        <div className="solar-auth-mobile-header">
          <Link to="/" className="solar-mobile-brand">
            <SolarBrandLogo size={28} />
            <span className="solar-mobile-brand-name">SolarOps</span>
          </Link>
          <Link to="/" className="solar-mobile-home-btn">
            ← Home
          </Link>
        </div>

        <div className="solar-auth-card-container">
          <div className="solar-auth-card">
            {/* Top Security & Status Bar */}
            <div className="solar-auth-header-top">
              <span className="solar-badge-portal">Portal Access</span>
              <span className="solar-badge-secure">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>256-bit SSL</span>
              </span>
            </div>

            {/* ===================================================================
                MODERN TWO-TAB SEGMENTED CONTROL
                =================================================================== */}
            <div className="solar-auth-tabs-nav" role="tablist" aria-label="Authentication Options">
              <button
                type="button"
                role="tab"
                id="tab-demo"
                aria-selected={activeTab === "demo"}
                aria-controls="panel-demo"
                className={`solar-tab-btn ${activeTab === "demo" ? "active" : ""}`}
                onClick={() => setActiveTab("demo")}
              >
                <span className="solar-tab-icon">✦</span>
                <span className="solar-tab-text">Explore Demo</span>
                <span className="solar-tab-pill-badge">Recruiter</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-admin"
                aria-selected={activeTab === "admin"}
                aria-controls="panel-admin"
                className={`solar-tab-btn ${activeTab === "admin" ? "active" : ""}`}
                onClick={() => setActiveTab("admin")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="solar-tab-icon-svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="solar-tab-text">Admin Login</span>
              </button>
            </div>

            {/* ===================================================================
                TAB 1: EXPLORE DEMO (DEFAULT ACTIVE)
                =================================================================== */}
            {activeTab === "demo" && (
              <div
                id="panel-demo"
                role="tabpanel"
                aria-labelledby="tab-demo"
                className="solar-tab-panel solar-tab-panel--demo"
              >
                <div className="solar-demo-header">
                  <div className="solar-demo-badge-row">
                    <span className="solar-recruiter-badge">RECRUITER DEMO</span>
                    <span className="solar-demo-instant-tag">Instant Access • No Password</span>
                  </div>
                  <h2 className="solar-demo-heading">Welcome to SolarOps Demo</h2>
                  <p className="solar-demo-description">
                    Explore the Solar Management System and discover its dashboard, modules, and energy management capabilities.
                  </p>
                </div>

                {/* Compact Capability Chips */}
                <div className="solar-demo-highlights-grid">
                  <div className="solar-demo-chip">
                    <span className="solar-chip-dot" />
                    <span>28 Business Modules</span>
                  </div>
                  <div className="solar-demo-chip">
                    <span className="solar-chip-dot" />
                    <span>Real-Time Inverter IoT</span>
                  </div>
                  <div className="solar-demo-chip">
                    <span className="solar-chip-dot" />
                    <span>Rooftop CAD Sizing</span>
                  </div>
                  <div className="solar-demo-chip">
                    <span className="solar-chip-dot" />
                    <span>Safe Read-Only Sandbox</span>
                  </div>
                </div>

                {/* Primary Demo CTA */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={demoLoading || loading}
                  className="solar-demo-primary-btn"
                  aria-label="Explore Demo Dashboard"
                >
                  {demoLoading ? (
                    <span className="solar-btn-loading-wrap">
                      <span className="solar-spinner" />
                      <span>Authenticating Demo Access...</span>
                    </span>
                  ) : (
                    <span className="solar-btn-label-wrap">
                      <span>Explore Demo Dashboard →</span>
                    </span>
                  )}
                </button>

                <p className="solar-demo-subtext">
                  Instant access • No password required
                </p>
              </div>
            )}

            {/* ===================================================================
                TAB 2: ADMIN LOGIN (STANDARD CREDENTIALS)
                =================================================================== */}
            {activeTab === "admin" && (
              <div
                id="panel-admin"
                role="tabpanel"
                aria-labelledby="tab-admin"
                className="solar-tab-panel solar-tab-panel--admin"
              >
                <div className="solar-admin-header">
                  <h2 className="solar-auth-title">Admin Sign In</h2>
                  <p className="solar-auth-subtitle">
                    Enter your administrator credentials to access the production management portal.
                  </p>
                </div>

                <form noValidate className="solar-login-form" onSubmit={formik.handleSubmit}>
                  {/* Email / Username Field */}
                  <div className="solar-input-group">
                    <label htmlFor="email" className="solar-input-label">
                      Email or Username <span className="req-star">*</span>
                    </label>
                    <div className={`solar-input-box ${formik.touched.email && formik.errors.email ? "has-error" : ""}`}>
                      <span className="solar-input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 4L12 13L2 4" />
                        </svg>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="username"
                        placeholder="admin@solar.com or username"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={loading || demoLoading}
                        className="solar-input-field"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <span className="solar-input-error-msg">{formik.errors.email}</span>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="solar-input-group">
                    <div className="solar-password-label-row">
                      <label htmlFor="password" className="solar-input-label">
                        Password <span className="req-star">*</span>
                      </label>
                      <Link to="/admin/forgot-password" className="solar-forgot-link">
                        Forgot password?
                      </Link>
                    </div>
                    <div className={`solar-input-box ${formik.touched.password && formik.errors.password ? "has-error" : ""}`}>
                      <span className="solar-input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={loading || demoLoading}
                        className="solar-input-field"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="solar-password-toggle-btn"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <span className="solar-input-error-msg">{formik.errors.password}</span>
                    )}
                  </div>

                  {/* Remember Me Option */}
                  <div className="solar-form-options">
                    <label className="solar-checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="solar-checkbox"
                      />
                      <span>Remember me</span>
                    </label>
                  </div>

                  {/* Primary Sign In Button */}
                  <button
                    type="submit"
                    disabled={loading || demoLoading}
                    className="solar-signin-btn"
                  >
                    {loading ? (
                      <span className="solar-btn-loading-wrap">
                        <span className="solar-spinner" />
                        <span>Signing in...</span>
                      </span>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Back to Homepage Link & Trust Footnote */}
            <div className="solar-auth-card-footer">
              <Link to="/" className="solar-back-home-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back to Homepage</span>
              </Link>
              <p className="solar-auth-footnote">
                Protected by JWT 256-bit encryption &amp; role-based access control.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
