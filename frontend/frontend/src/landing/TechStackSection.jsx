import React, { useState } from "react";
import {
  ReactIcon,
  ViteIcon,
  NodeIcon,
  ExpressIcon,
  MongoIcon,
  TimescaleIcon,
  RedisIcon,
  RechartsIcon,
  LeafletIcon,
  TanStackIcon,
  FormikIcon,
  PdfIcon,
  SocketIoIcon,
} from "./TechIcons";

const TECH_CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "viz", label: "Data Visualization & GIS" },
  { id: "backend", label: "Backend & Database" },
  { id: "realtime", label: "IoT & Real-Time" },
];

const TECHNOLOGIES = [
  {
    name: "React 19",
    category: "frontend",
    badge: "Core Framework",
    icon: <ReactIcon size={34} />,
    desc: "Modern functional component architecture, React 19 Suspense, custom context hooks, and lazy route splitting.",
    version: "v19.2.7",
  },
  {
    name: "Vite 6",
    category: "frontend",
    badge: "Build Tooling",
    icon: <ViteIcon size={34} />,
    desc: "Lightning-fast dev server with optimized production bundling and manual chunk splitting.",
    version: "v6.0.7",
  },
  {
    name: "React Router v7",
    category: "frontend",
    badge: "Routing Engine",
    icon: <ReactIcon size={34} />,
    desc: "Declarative client-side routing, protected auth guards, and dynamic parameter paths for all 28 modules.",
    version: "v7.18.1",
  },
  {
    name: "TanStack React Query v5",
    category: "frontend",
    badge: "Server State",
    icon: <TanStackIcon size={34} />,
    desc: "Optimistic updates, server state caching, and background refetching for live operations.",
    version: "v5.101.4",
  },
  {
    name: "Recharts v3",
    category: "viz",
    badge: "Data Visualization",
    icon: <RechartsIcon size={34} />,
    desc: "Custom ComposedCharts, AreaCharts, and BarCharts rendering live solar generation and consumption curves.",
    version: "v3.9.2",
  },
  {
    name: "Leaflet & React-Leaflet",
    category: "viz",
    badge: "Geospatial GIS",
    icon: <LeafletIcon size={34} />,
    desc: "Interactive satellite mapping for roof site surveys, GPS coordinates, and field technician tracking.",
    version: "v1.9.4 / v5.0",
  },
  {
    name: "Formik & Yup",
    category: "frontend",
    badge: "Form Validation",
    icon: <FormikIcon size={34} />,
    desc: "Strict schema validation and form handling for complex multi-step solar CAD design and customer registration.",
    version: "v2.4.9 / v1.7",
  },
  {
    name: "jsPDF & AutoTable",
    category: "viz",
    badge: "Document Export",
    icon: <PdfIcon size={34} />,
    desc: "Automated client-side PDF document generation for GST-compliant quotations, invoices, and survey reports.",
    version: "v4.2.1 / v5.0",
  },
  {
    name: "Node.js & Express.js",
    category: "backend",
    badge: "RESTful Server",
    icon: <NodeIcon size={34} />,
    desc: "Robust micro-service architecture with 60+ modular REST API endpoints and JWT RBAC middleware.",
    version: "ES Modules",
  },
  {
    name: "MongoDB & Mongoose",
    category: "backend",
    badge: "Document Database",
    icon: <MongoIcon size={34} />,
    desc: "Scalable document persistence for customer profiles, quotation BOMs, inventory assets, and user roles.",
    version: "Mongoose ODM",
  },
  {
    name: "TimescaleDB",
    category: "backend",
    badge: "Time-Series Engine",
    icon: <TimescaleIcon size={34} />,
    desc: "Hypertable storage optimized for high-frequency IoT inverter telemetry, irradiance, and grid feed-in data.",
    version: "Time-Series",
  },
  {
    name: "Redis",
    category: "backend",
    badge: "In-Memory Cache",
    icon: <RedisIcon size={34} />,
    desc: "High-speed caching for authenticated user sessions, refresh tokens, and rate-limiting counters.",
    version: "In-Memory",
  },
  {
    name: "Socket.io & MQTT",
    category: "realtime",
    badge: "IoT Data Stream",
    icon: <SocketIoIcon size={34} />,
    desc: "Bi-directional WebSocket push and EMQX MQTT broker integration for sub-second telemetry and alert dispatch.",
    version: "Real-Time",
  },
];

export default function TechStackSection() {
  const [filter, setFilter] = useState("all");

  const filteredTech = filter === "all"
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => t.category === filter);

  return (
    <section id="tech-stack" className="solar-tech-section">
      <div className="solar-tech-container">
        {/* Section Header */}
        <div className="solar-section-header">
          <span className="solar-section-pill">
            <span>Verified Codebase Technologies</span>
          </span>
          <h2 className="solar-section-title">
            Modern, Resilient Full-Stack Architecture
          </h2>
          <p className="solar-section-subtitle">
            Every technology displayed is actively configured and utilized in this repository.
            Built with modern industry standards for high reliability and developer ergonomics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="solar-tech-filters">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`solar-tech-filter-btn ${filter === cat.id ? "active" : ""}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="solar-tech-grid">
          {filteredTech.map((tech) => (
            <div key={tech.name} className="solar-tech-card">
              <div className="solar-tech-top">
                <div className="solar-tech-icon-box">{tech.icon}</div>
                <span className="solar-tech-version">{tech.version}</span>
              </div>

              <div className="solar-tech-info">
                <div className="solar-tech-name-row">
                  <h4 className="solar-tech-name">{tech.name}</h4>
                  <span className="solar-tech-badge">{tech.badge}</span>
                </div>
                <p className="solar-tech-desc">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

