import React, { useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import DashboardPreview from "./DashboardPreview";
import FeaturesSection from "./FeaturesSection";
import OverviewSection from "./OverviewSection";
import TechStackSection from "./TechStackSection";
import ShowcaseSection from "./ShowcaseSection";
import CTASection from "./CTASection";
import LandingFooter from "./LandingFooter";
import "./LandingPage.css";

export default function LandingPage() {
  useEffect(() => {
    // Set document title and SEO metadata
    const originalTitle = document.title;
    document.title = "SolarOps - Enterprise Solar Management & IoT Energy Platform";

    // Scroll to top on initial mount
    window.scrollTo(0, 0);

    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="solar-landing">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Interactive Dashboard Preview */}
      <DashboardPreview />

      {/* 28 Core Business Features */}
      <FeaturesSection />

      {/* System Architecture & Overview */}
      <OverviewSection />

      {/* Implemented Technology Stack */}
      <TechStackSection />

      {/* Interactive Application Showcase */}
      <ShowcaseSection />

      {/* Call to Action */}
      <CTASection />

      {/* Professional Footer */}
      <LandingFooter />
    </div>
  );
}
