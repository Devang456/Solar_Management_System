export const APP_NAME = "Solar Management System";
export const APP_VERSION = "1.0.0";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  DASHBOARD_OVERVIEW: "/dashboard",
  DASHBOARD_PLANTS: "/dashboard/plants",
  DASHBOARD_ANALYTICS: "/dashboard/analytics",
  DASHBOARD_ALERTS: "/dashboard/alerts",
  DASHBOARD_REPORTS: "/dashboard/reports",
  DASHBOARD_SETTINGS: "/dashboard/settings",
};

export const NAV_ITEMS = [
  { id: "overview", label: "Overview", path: "/dashboard" },
  { id: "plants", label: "My Plants", path: "/dashboard/plants" },
  { id: "analytics", label: "Analytics", path: "/dashboard/analytics" },
  { id: "alerts", label: "Alerts", path: "/dashboard/alerts" },
  { id: "reports", label: "Reports", path: "/dashboard/reports" },
  { id: "settings", label: "Settings", path: "/dashboard/settings" },
];

export const STATUS_COLORS = {
  Online: "#16a34a",
  Offline: "#dc2626",
  Maintenance: "#d97706",
  High: "#dc2626",
  Medium: "#d97706",
  Low: "#16a34a",
};
