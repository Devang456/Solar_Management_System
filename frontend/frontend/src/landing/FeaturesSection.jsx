import React from "react";
import {
  ChartActivityIcon,
  CadDesignIcon,
  InstallationIcon,
  QuotationDocIcon,
  TechnicianGpsIcon,
  SubsidyGovIcon,
  BillingPaymentIcon,
  ShieldWarrantyIcon,
} from "./LandingIcons";

const FEATURES = [
  {
    id: "monitoring",
    icon: <ChartActivityIcon size={26} />,
    tag: "IoT & Telemetry",
    title: "Real-Time Solar Monitoring",
    description:
      "Monitor live kilowatt generation vs facility consumption curves, inverter telemetry, grid feed-in rates, and lifetime carbon offset in real-time.",
    highlight: "Daily/Weekly/Monthly curves with MQTT telemetry streams",
  },
  {
    id: "cad-sizing",
    icon: <CadDesignIcon size={26} />,
    tag: "Engineering CAD",
    title: "Solar Design & Sizing Engine",
    description:
      "Simulate rooftop geometric area, azimuth, tilt angles, panel counts, string inverter matching, and financial payback period with calculated ROI.",
    highlight: "Comprehensive kWp sizing & tree shading simulation",
  },
  {
    id: "installations",
    icon: <InstallationIcon size={26} />,
    tag: "Field Milestones",
    title: "End-to-End Installation Lifecycle",
    description:
      "Track multi-phase site deployments from civil foundation and structure mounting to panel laying, inverter wiring, and final DISCOM net metering.",
    highlight: "Milestone-driven progress logs with inspection checklists",
  },
  {
    id: "quotations",
    icon: <QuotationDocIcon size={26} />,
    tag: "Commercial Engine",
    title: "Dynamic Quotations & GST Billing",
    description:
      "Generate automated bills of materials with itemized panel and inverter schedules, automated GST tax computation, and instant jsPDF exports.",
    highlight: "Customer approval workflow with digital acceptance portal",
  },
  {
    id: "technicians",
    icon: <TechnicianGpsIcon size={26} />,
    tag: "Workforce Management",
    title: "Technician & Task Operations",
    description:
      "Dispatch certified field technicians, monitor daily GPS attendance, schedule maintenance visits, and track daily progress logs in real time.",
    highlight: "Role-specific technician portals and mobile attendance",
  },
  {
    id: "subsidy",
    icon: <SubsidyGovIcon size={26} />,
    tag: "Regulatory Portal",
    title: "Government Subsidy Management",
    description:
      "Streamline PM Surya Ghar and state DISCOM subsidy paperwork, tracking eligibility, feasibility inspections, and milestone disbursement status.",
    highlight: "Centralized subsidy documentation & timeline tracking",
  },
  {
    id: "billing",
    icon: <BillingPaymentIcon size={26} />,
    tag: "Finance & Invoicing",
    title: "GST Invoices & Online Payments",
    description:
      "Manage milestone invoices, track outstanding balances, generate GST-compliant tax invoices, and collect payments via Razorpay gateway.",
    highlight: "Integrated credit notes, receipts & payment ledgers",
  },
  {
    id: "warranty",
    icon: <ShieldWarrantyIcon size={26} />,
    tag: "Lifecycle Support",
    title: "AMC & Electrical Testing",
    description:
      "Execute pre-handover electrical testing (Voc, Isc, insulation resistance), register component warranties, and manage annual maintenance contracts.",
    highlight: "Integrated support ticket desk with SLA priority queues",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="solar-features-section">
      <div className="solar-features-container">
        {/* Section Header */}
        <div className="solar-section-header">
          <span className="solar-section-pill">
            <span>28 Core Business Modules</span>
          </span>
          <h2 className="solar-section-title">
            Engineered for the Entire Solar Lifecycle
          </h2>
          <p className="solar-section-subtitle">
            Every feature is built and implemented in the actual codebase — from initial roof
            cadastral survey to megawatt inverter telemetry and customer handover.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="solar-features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="solar-feature-card">
              <div className="solar-feature-top">
                <div className="solar-feature-icon-wrapper">
                  {feature.icon}
                </div>
                <span className="solar-feature-tag">{feature.tag}</span>
              </div>

              <h3 className="solar-feature-title">{feature.title}</h3>
              <p className="solar-feature-desc">{feature.description}</p>

              <div className="solar-feature-highlight">
                <span className="highlight-dot" />
                <span>{feature.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

