import React from "react";
import {
  ServerDatabaseIcon,
  LockRoleIcon,
  PulseWifiIcon,
  LayersIcon,
  CheckCircleIcon,
} from "./LandingIcons";

const SYSTEM_METRICS = [
  {
    num: "28",
    label: "Business Modules",
    detail: "Complete coverage from lead generation to inverter monitoring",
    icon: <LayersIcon size={24} />,
  },
  {
    num: "7",
    label: "Role-Based Portals",
    detail: "Super Admin, Sales, Technician, Client, Accountant, Support, Admin",
    icon: <LockRoleIcon size={24} />,
  },
  {
    num: "2",
    label: "Specialized Databases",
    detail: "MongoDB for business data + TimescaleDB for time-series IoT feeds",
    icon: <ServerDatabaseIcon size={24} />,
  },
  {
    num: "Live",
    label: "Telemetry Protocols",
    detail: "Sub-second live streaming with MQTT Broker and Socket.io",
    icon: <PulseWifiIcon size={24} />,
  },
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Lead Ingestion", desc: "Multi-channel lead capture & automated status staging" },
  { step: "02", title: "Site Survey", desc: "Rooftop geometry, GPS tagging, and structural audit" },
  { step: "03", title: "Solar CAD Sizing", desc: "Capacity simulation, azimuth, tilt & ROI payback" },
  { step: "04", title: "Dynamic Quotation", desc: "Itemized BOM, GST taxes & automated jsPDF export" },
  { step: "05", title: "Project Approval", desc: "Customer digital sign-off portal & contract execution" },
  { step: "06", title: "Inventory Dispatch", desc: "Warehouse stock reservation, serialized equipment tracking" },
  { step: "07", title: "Field Installation", desc: "Civil works, structure mounting, and panel stringing" },
  { step: "08", title: "Electrical Testing", desc: "Voc, Isc, insulation resistance & DISCOM net metering" },
  { step: "09", title: "IoT Solar Monitoring", desc: "Real-time generation curves, inverter vitals & alerts" },
  { step: "10", title: "Warranty & AMC", desc: "Preventative service schedules & priority ticket desk" },
];

export default function OverviewSection() {
  return (
    <section id="architecture" className="solar-overview-section">
      <span id="overview" style={{ position: "absolute", top: 0, opacity: 0, pointerEvents: "none" }} />
      <div className="solar-overview-container">
        {/* Section Header */}
        <div className="solar-section-header">
          <span className="solar-section-pill">
            <span>System Architecture Overview</span>
          </span>
          <h2 className="solar-section-title">
            Enterprise Scale Built for Real Clean-Tech Operations
          </h2>
          <p className="solar-section-subtitle">
            An overview of the software engineering, multi-role security architecture,
            and complete 10-stage solar lifecycle implemented in this platform.
          </p>
        </div>

        {/* 4 Architecture Pillars */}
        <div className="solar-overview-metrics-grid">
          {SYSTEM_METRICS.map((metric, idx) => (
            <div key={idx} className="solar-overview-metric-card">
              <div className="metric-icon-box">{metric.icon}</div>
              <div className="metric-number">{metric.num}</div>
              <h4 className="metric-label">{metric.label}</h4>
              <p className="metric-detail">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* End-to-End Business Lifecycle Pipeline */}
        <div className="solar-lifecycle-workflow">
          <div className="workflow-header">
            <div>
              <h3 className="workflow-title">End-to-End Solar Business Lifecycle</h3>
              <p className="workflow-subtitle">
                A unified workflow connecting sales engineers, CAD designers, field technicians,
                and customers seamlessly without siloed tools.
              </p>
            </div>
            <span className="workflow-badge">10 Integrated Stages</span>
          </div>

          <div className="workflow-steps-grid">
            {WORKFLOW_STEPS.map((item, idx) => (
              <div key={idx} className="workflow-step-card">
                <div className="step-num-pill">{item.step}</div>
                <h5 className="step-card-title">{item.title}</h5>
                <p className="step-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Role-Based Access Control Showcase */}
        <div className="solar-rbac-preview-strip">
          <div className="rbac-strip-content">
            <div className="rbac-pill">
              <LockRoleIcon size={16} />
              <span>Security & Governance</span>
            </div>
            <h4>Granular Role-Based Access Control (RBAC)</h4>
            <p>
              Includes custom permission matrices across all 28 modules, separating administrative
              privileges, sales pipelines, field technician dispatches, and end-customer visibility.
            </p>
            <div className="rbac-roles-tags">
              <span className="role-tag">Super Admin</span>
              <span className="role-tag">Company Admin</span>
              <span className="role-tag">Sales Manager</span>
              <span className="role-tag">Field Technician</span>
              <span className="role-tag">Customer Portal</span>
              <span className="role-tag">Accountant</span>
              <span className="role-tag">Support Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

