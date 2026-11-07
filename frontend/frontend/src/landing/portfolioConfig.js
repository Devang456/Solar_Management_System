/**
 * Portfolio & Project Configuration
 * 
 * Customize these fields to match your personal developer portfolio,
 * GitHub repository, and contact preferences.
 */
export const PORTFOLIO_CONFIG = {
  // Your developer portfolio URL (defaults to window.PORTFOLIO_URL, or #portfolio fallback)
  portfolioUrl: (typeof window !== "undefined" && window.PORTFOLIO_URL) || "https://github.com",
  
  // GitHub Repository URL for this project
  githubRepoUrl: "https://github.com",
  
  // Developer & Project Details
  developerName: "Solar Platform Engineer",
  projectName: "Solar Management System (SPMS)",
  projectTagline: "Next-Gen Commercial Solar Energy SaaS & Operations Platform",
  version: "v1.0.0",
  
  // Primary contact / email if applicable
  contactEmail: "dev@solarmanagement.io",
  
  // Core system metrics verified from the codebase
  metrics: {
    modulesCount: 28,
    rolesCount: 7,
    uptimeSLA: "99.9%",
    protocolsSupported: "MQTT / WebSockets / REST",
  }
};

