# Solar Panel Management System (SPMS)

A complete web-based platform to manage the entire solar business lifecycle — from lead generation and site survey to installation, monitoring, billing, and after-sales support.

---

## 📋 Overview

SPMS is a multi-role SaaS-style system built for solar companies to manage customers, leads, quotations, inventory, installations, technicians, IoT-based solar monitoring, billing, and support — all in one platform.

---

## 🚀 Tech Stack

**Frontend**
- React (Vite / Create React App)
- React Router (client-side routing)
- Tailwind CSS + shadcn/ui
- Axios (API calls)
- Recharts / Chart.js (analytics & production graphs)
- Socket.io-client (live dashboards & alerts)

**Backend**
- Node.js + Express.js
- REST API

**Database**
- MongoDB (core application data) with Mongoose ODM
- TimescaleDB (time-series IoT/monitoring data)
- Redis (sessions, refresh tokens, caching)

**Real-time / IoT**
- MQTT broker (EMQX / Mosquitto) for device data ingestion
- Socket.io (live dashboards & alerts)

**Auth**
- JWT + Refresh Tokens
- Role-Based Access Control (RBAC)

**Other Integrations**
- AWS S3 / Cloudflare R2 (file storage)
- Razorpay (payments — UPI, EMI, online)
- Twilio / MSG91 (SMS, WhatsApp)
- SendGrid / Postmark (email)
- Firebase Cloud Messaging (push notifications)
- Puppeteer / pdf-lib (PDF generation for quotations & invoices)

---

## 🧩 Core Modules (28 Total)

| # | Module | Description |
|---|--------|-------------|
| 1 | Authentication & Authorization | Login, JWT/refresh tokens, RBAC, session & device management |
| 2 | User Management | Manage employees, technicians, roles & permissions |
| 3 | Customer Management | Customer profiles, documents, notes, lifecycle status |
| 4 | Lead Management | Lead capture, follow-ups, conversion tracking |
| 5 | Quotation Management | Quote generation, tax/GST calculation, approval workflow |
| 6 | Product Catalog | Solar panels, inverters, batteries, accessories |
| 7 | Inventory Management | Stock in/out, transfers, low-stock alerts |
| 8 | Vendor Management | Vendor records, purchase orders, payments |
| 9 | Site Survey | Roof analysis, GPS data, survey reports |
| 10 | Solar System Design | Capacity, ROI, savings & payback calculations |
| 11 | Installation Management | Scheduling, checklists, progress tracking |
| 12 | Technician Management | Job assignment, attendance, live location |
| 13 | Maintenance Management | Service requests, AMC, resolution tracking |
| 14 | Testing Module | Electrical & performance testing before handover |
| 15 | Ticket Support System | Customer support tickets with priority levels |
| 16 | Solar Monitoring | Live production data, efficiency, CO₂ savings |
| 17 | Alert & Notification | Multi-channel alerts (email, SMS, push, WhatsApp) |
| 18 | Billing & Invoice | GST invoices, credit notes, receipts |
| 19 | Payment Module | Online, UPI, EMI, partial payments |
| 20 | AMC Management | Annual maintenance contract handling |
| 21 | Warranty Management | Warranty registration & claims |
| 22 | Document Management | Centralized document storage |
| 23 | Reports & Analytics | Sales, revenue, production & performance reports |
| 24 | Dashboard | Role-specific dashboards (Admin, Technician, Customer) |
| 25 | Settings | Company config, GST, branding, notification settings |
| 26 | Government Subsidy Management | Subsidy applications, eligibility, tracking |
| 27 | Daily Progress Log | Daily technician/engineer field reporting |
| 28 | Project Progress Reporting | End-to-end project timeline & milestone tracking |

---

## 🔄 Business Workflow

```
Lead Generation → Customer Registration → Site Survey → Solar Design
→ Quotation → Approval → Inventory Allocation → Installation
→ Testing → Billing → Payment → Monitoring → Maintenance → AMC → Support → Reports
```

---

## 👥 User Roles

- Super Admin
- Company Admin
- Sales Manager
- Technician
- Customer
- Accountant
- Support Team

---

## 🗄️ Database Structure (High-Level)

- **MongoDB** — users, customers, leads, quotations, products, inventory, invoices, tickets, subsidies, daily logs, etc. (stored as collections/documents)
- **TimescaleDB** — `device_readings` (high-frequency IoT monitoring data)
- **Redis** — session storage, refresh tokens, caching

See `/docs/schema.md` (planned) for the full collection/document schema.

---

## 📁 Project Structure (Planned — React + Node/Express)

```
spms/
├── frontend/                  # React app (Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/              # Route-level pages
│   │   ├── context/             # Auth / global state context
│   │   ├── hooks/                # Custom hooks
│   │   ├── api/                   # Axios instance & API calls
│   │   └── utils/
│   ├── public/
│   └── package.json
│
├── backend/                   # Node.js + Express API
│   ├── src/
│   │   ├── config/             # DB connection, roles, env config
│   │   ├── models/              # Mongoose schemas
│   │   ├── middleware/           # Auth, RBAC, error handling
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── customers/
│   │   │   ├── leads/
│   │   │   ├── quotations/
│   │   │   ├── products/
│   │   │   ├── inventory/
│   │   │   ├── vendors/
│   │   │   ├── site-survey/
│   │   │   ├── solar-design/
│   │   │   ├── installations/
│   │   │   ├── technicians/
│   │   │   ├── maintenance/
│   │   │   ├── testing/
│   │   │   ├── tickets/
│   │   │   ├── monitoring/
│   │   │   ├── iot-devices/
│   │   │   ├── alerts/
│   │   │   ├── billing/
│   │   │   ├── payments/
│   │   │   ├── amc/
│   │   │   ├── warranty/
│   │   │   ├── documents/
│   │   │   ├── reports/
│   │   │   ├── dashboard/
│   │   │   ├── settings/
│   │   │   ├── subsidy/
│   │   │   ├── daily-log/
│   │   │   └── project-progress/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── docs/                       # Documentation, ER diagrams, schema
└── README.md
```

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd spms

# Install frontend dependencies
cd frontend
npm install
npm run dev

# Install backend dependencies
cd ../backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in both `frontend` and `backend` with:

```
# Backend
PORT=5000
MONGODB_URI=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
AWS_S3_BUCKET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SENDGRID_API_KEY=
TWILIO_ACCOUNT_SID=
FIREBASE_CONFIG=
MQTT_BROKER_URL=

# Frontend
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📦 Functional Module Documentation

### 1. Authentication & Authorization Module
**Purpose:** Controls system access and ensures that only authorized users can access specific resources.

**Features:**
User Registration • User Login • User Logout • Forgot Password • Reset Password • Email Verification • Change Password • JWT Authentication • Refresh Token Authentication • Session Management • Multi-Device Login Management • Account Lock after Multiple Failed Login Attempts • Role-Based Access Control (RBAC)

**Supported Roles:** Super Admin, Company Admin, Sales Manager, Technician, Customer, Accountant, Support Team

---

### 2. User Management Module
**Purpose:** Manages employees, technicians, customers, and internal users.

**Features:** Create/Update/Delete User • Activate/Deactivate User • Assign Roles • Assign Permissions • Search/Filter Users • Pagination Support • User Profile Management • Profile Image Upload • User Activity Logs

**User Information:** Name, Email Address, Phone Number, Role, Department, Joining Date, Status, Profile Image

---

### 3. Customer Management Module
**Purpose:** Stores customer information throughout the complete customer lifecycle.

**Features:** Add/Update Customer • Customer Profile Management • Address Management • Document Upload • Customer Notes • Tags Management • Communication History • Customer Timeline

**Customer Status:** Lead → Interested → Proposal Sent → Negotiation → Confirmed → Installation Pending → Installed → Active Customer

---

### 4. Lead Management Module
**Purpose:** Tracks potential customers and sales opportunities.

**Features:** Create Lead • Assign Lead • Lead Follow-Up • Follow-Up Reminder • Lead Conversion • Lead History Tracking

**Lead Sources:** Website, Facebook, Instagram, Google Ads, Referral, Walk-In, Tele Calling

**Lead Status:** New, Contacted, Proposal Sent, Negotiation, Won, Lost

---

### 5. Quotation Management Module
**Purpose:** Generates professional quotations for customers.

**Features:** Create/Update/Delete Quotation • Download PDF • Tax Calculation • GST Calculation • Discount Management • Quote Approval Workflow • Quote Expiry Tracking

**Quotation Items:** Solar Panels, Inverters, Batteries, Mounting Structures, Installation Charges, Wiring Charges, Transportation Charges

---

### 6. Product Catalog Module
**Purpose:** Manages all solar products and accessories.

**Product Categories:** Solar Panels, Inverters, Batteries, Solar Water Pumps, Charge Controllers, Mounting Structures, Connectors, Cables

**Features:** Product CRUD Operations • Category Management • Brand Management • Product Images • Product Specifications • Warranty Information • Stock Management

---

### 7. Inventory Management Module
**Purpose:** Tracks stock movement and warehouse operations.

**Features:** Stock In/Out • Purchase Entry • Transfer Stock • Vendor Management • Warehouse Management • Barcode Support • Low Stock Alerts • Serial Number Tracking

---

### 8. Vendor Management Module
**Purpose:** Maintains supplier and procurement records.

**Features:** Vendor Registration • Vendor CRUD Operations • Purchase Orders • Vendor Payments • Contact Management • Vendor Performance Analysis

---

### 9. Site Survey Module
**Purpose:** Collects physical site data before installation.

**Features:** Schedule Site Visit • Roof Type Selection • Roof Size Calculation • Roof Angle Measurement • Shadow Analysis • GPS Coordinates Capture • Electricity Bill Upload • Site Photos Upload • Survey Report Generation

---

### 10. Solar System Design Module
**Purpose:** Calculates the optimal solar configuration for customers.

**Features:** Monthly Consumption Analysis • Capacity Recommendation • Roof Area Calculation • Number of Panels Calculation • Energy Production Estimation • ROI Calculation • Savings Calculation • Payback Period Calculation

**Example:**
- Monthly Consumption: 900 Units
- Recommended Capacity: 7 kW
- Estimated Savings: ₹7,000 – ₹8,500/month
- Estimated Payback Period: 4–5 Years

---

### 11. Installation Management Module
**Purpose:** Tracks installation activities and project progress.

**Features:** Schedule Installation • Assign Technician • Installation Checklist • Material Checklist • Installation Photo Upload • Completion Verification

**Installation Status:** Pending, Scheduled, In Progress, Completed, On Hold

---

### 12. Technician Management Module
**Purpose:** Manages field engineers and installation teams.

**Features:** Assign Jobs • Attendance Tracking • Live Location Tracking • Daily Work Reports • Task Completion Tracking • Performance Reports

---

### 13. Maintenance Management Module
**Purpose:** Handles after-sales support and maintenance services.

**Features:** Maintenance Requests • AMC Management • Service Requests • Complaint Management • Schedule Visits • Resolution Tracking

---

### 14. Testing Module
**Purpose:** Ensures that the installed solar plant is working correctly through various electrical and performance tests before project completion.

**Features:** Electrical Testing • String Testing • Inverter Testing • Earthing Testing • Insulation Resistance Testing • Voltage Testing • Current Testing • Performance Verification • Safety Compliance Check • Final Inspection • Testing Document Upload • Testing Photo Upload

**Test Parameters:** Open Circuit Voltage (Voc), Short Circuit Current (Isc), AC Output Voltage, Frequency, Earthing Resistance, Inverter Efficiency, Performance Ratio (PR)

---

### 15. Ticket Support System
**Purpose:** Allows customers to raise support requests.

**Features:** Raise Ticket • Assign Support Agent • Ticket Comments • Attachments Support • Status Tracking • Priority Levels

**Priority Levels:** Low, Medium, High, Critical

---

### 16. Solar Monitoring Module
**Purpose:** Provides live monitoring and analytics for installed systems.

**Features:** Daily/Weekly/Monthly/Yearly Production • Live Monitoring • Power Generation Graphs • Efficiency Analysis • CO₂ Savings Calculation

**Monitoring Metrics:** Current Output, Voltage, Current, Frequency, Battery Health, Grid Export, Grid Import, Temperature, Efficiency Percentage

---

### 17. Alert & Notification Module
**Purpose:** Provides real-time notifications and alerts.

**Notification Types:** Maintenance Due, Low Production Alert, Device Offline Alert, Payment Due Reminder, Warranty Expiry Alert

**Notification Channels:** Email, SMS, Push Notification, WhatsApp

---

### 18. Billing & Invoice Module
**Purpose:** Handles customer billing operations.

**Features:** Invoice Generation • GST Invoice • Credit Notes • Receipts • Due Payment Tracking

---

### 19. Payment Module
**Purpose:** Manages payment collection and history.

**Features:** Online Payments • UPI Payments • Partial Payments • EMI Payments • Payment History • Refund Management

---

### 20. AMC Management Module
**Purpose:** Handles Annual Maintenance Contracts.

**Features:** AMC Plans • Renewal Reminders • Contract Status Tracking • Visit Scheduling

---

### 21. Warranty Management Module
**Purpose:** Tracks warranty details for installed products.

**Features:** Warranty Registration • Warranty Claims • Warranty Expiry Notifications

---

### 22. Document Management Module
**Purpose:** Stores all customer and project-related documents.

**Supported Documents:** Agreement, Invoice, Installation Report, Site Survey Report, Warranty Certificate, Government Approval Documents

---

### 23. Reports & Analytics Module
**Purpose:** Provides business insights and decision-making reports.

**Reports:** Sales Report, Revenue Report, Installation Report, Production Report, Technician Performance Report, Customer Growth Report

---

### 24. Dashboard Module

**Admin Dashboard:** Revenue Overview, Sales Overview, Installations, Active Customers, Pending Tickets, Production Overview

**Technician Dashboard:** Today's Tasks, Pending Jobs, Completed Jobs

**Customer Dashboard:** Solar Production, Savings, Bills, Support Tickets

---

### 25. Settings Module
**Purpose:** Stores company-wide configurations.

**Features:** Company Information • GST Configuration • Email Templates • Notification Settings • Theme Settings • System Configuration • Branding Settings

---

### 26. Government Subsidy Management Module
**Purpose:** Manages government subsidy applications and approvals.

**Features:** Subsidy Application Creation • Subsidy Eligibility Check • Government Scheme Selection • Document Verification • Application Submission Tracking • Approval Workflow • Subsidy Status Tracking • Customer Notifications • Subsidy Amount Calculation • Subsidy Payment Tracking

**Supported Schemes:** PM Surya Ghar Yojana, State Government Subsidies, Residential Subsidy Programs, Commercial Incentive Programs

**Required Documents:** Aadhaar Card, PAN Card, Electricity Bill, Bank Details, Property Documents, Installation Certificate, Net Meter Approval

**Subsidy Status:** Draft, Submitted, Under Verification, Approved, Rejected, Subsidy Released

---

### 27. Daily Progress Log Module
**Purpose:** Used by technicians, engineers, and project managers for daily reporting.

**Features:** Daily Work Entry • Site Progress Tracking • Task Completion Updates • Material Usage Entry • Workforce Tracking • Delay Reason Tracking • Weather Conditions Tracking • Image Upload • Video Upload • GPS Location Capture • Supervisor Approval • Customer Signature

**Daily Log Fields:** Date, Project Name, Technician Name, Work Performed, Materials Used, Pending Tasks, Issues Found, Next Day Plan, Customer Remarks, Status

**Status:** Not Started, In Progress, Completed, Delayed, Blocked

---

### 28. Project Progress Reporting Module
**Purpose:** Tracks project execution from lead generation to project handover.

**Features:** Project Timeline • Milestone Tracking • Completion Percentage • Delayed Activity Tracking • Resource Allocation • Cost Tracking • Budget Tracking • Risk Tracking • Dependency Tracking • Project Health Score

**Project Milestones:** Lead Created → Survey Completed → Quotation Approved → Payment Received → Material Procured → Installation Started → Testing Completed → Commissioning Completed → Handover Completed

---

## 🛣️ Roadmap

- [ ] Auth & RBAC module
- [ ] Customer & Lead management
- [ ] Quotation & Inventory modules
- [ ] Installation, Testing & Technician management
- [ ] IoT monitoring integration
- [ ] Billing, payments & AMC
- [ ] Government subsidy management
- [ ] Daily progress log & project reporting
- [ ] Reports & Dashboards
- [ ] Notifications (Email/SMS/WhatsApp/Push)

---

## 📊 Total Modules: 28

**System Coverage:** Lead → Sales → Installation → Testing → Monitoring → Maintenance → Support → Analytics

---

## 📄 License

Specify your license here (e.g., MIT, Proprietary).

## 🤝 Contributing

Contribution guidelines to be added as the project structure is finalized.