import { useState, useCallback, useMemo } from "react";
import { mockPlants, mockAlerts, mockAnalytics } from "../models";

const useDashboardController = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const plants = useMemo(() => {
    let filtered = mockPlants;
    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status.toLowerCase() === filterStatus);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [searchTerm, filterStatus]);

  const alerts = mockAlerts;

  const analytics = mockAnalytics;

  const stats = useMemo(() => ({
    totalPlants: mockPlants.length,
    onlinePlants: mockPlants.filter((p) => p.status === "Online").length,
    totalCapacity: "2.75 MW",
    todayOutput: "12,500 kWh",
    alerts: mockAlerts.filter((a) => a.severity === "High").length,
  }), []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    handleTabChange,
    sidebarCollapsed,
    toggleSidebar,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    plants,
    alerts,
    analytics,
    stats,
  };
};

export default useDashboardController;
