// scripts/seed-projects.js
require("dotenv").config();
const db = require("../db");

/**
 * Realistic, unique projects (25)
 * - stack: array of strings
 * - details: array of bullet strings
 * - featured: boolean (6 total)
 *
 * NOTE: Adjust links to match real repos when you have them.
 */

const projects = [
  {
    title: "Dockerized Portfolio + Postgres",
    slug: "dockerized-portfolio-postgres",
    featured: true,
    stack: ["Node.js", "Express", "EJS", "Docker", "Postgres"],
    description: "Portfolio site served by Express, containerized with Docker Compose, backed by Postgres for projects data.",
    link: "https://github.com/chpmnk0924nd-dotcom/portfolio-server",
    details: [
      "Built routes for projects, skills, and a DB viewer page.",
      "Containerized app + database using Compose with health checks.",
      "Designed a seed workflow to keep portfolio data clean and realistic."
    ]
  },
  {
    title: "Network Segmentation + VLAN Practice",
    slug: "network-segmentation-vlan-practice",
    featured: true,
    stack: ["Networking", "VLANs", "Routing", "Firewall Rules"],
    description: "Designed a home-lab style segmented network (lab vs. family) with VLAN tagging and routing rules.",
    link: "https://github.com/chpmnk0924nd-dotcom/network-segmentation-lab",
    details: [
      "Planned IP ranges and separation by device type.",
      "Validated isolation rules with packet testing.",
      "Documented troubleshooting steps and baseline checks."
    ]
  },
  {
    title: "Wireshark Notes: TCP/TLS Stream Debugging",
    slug: "wireshark-tcp-tls-stream-debugging",
    featured: true,
    stack: ["Wireshark", "TCP", "TLS", "Troubleshooting"],
    description: "Practical notes and examples for diagnosing blank Follow Stream output, TLS handshakes, and packet filtering.",
    link: "https://github.com/chpmnk0924nd-dotcom/wireshark-notes",
    details: [
      "Captured traffic and verified correct interface selection.",
      "Used display filters to isolate relevant TCP sessions.",
      "Explained why Follow TLS Stream may show dots/blank output without keys."
    ]
  },
  {
    title: "Inventory Tracker (CSV → DB)",
    slug: "inventory-tracker-csv-to-db",
    featured: true,
    stack: ["Postgres", "SQL", "Data Cleanup", "Node.js"],
    description: "Prototype inventory tracker that imports CSV data into Postgres and runs basic queries for reporting.",
    link: "https://github.com/chpmnk0924nd-dotcom/inventory-tracker",
    details: [
      "Validated CSV schema and normalized columns.",
      "Created tables + indexes for fast lookups.",
      "Built simple query endpoints for summaries."
    ]
  },
  {
    title: "Helpdesk Ticket Workflow Prototype",
    slug: "helpdesk-ticket-workflow-prototype",
    featured: true,
    stack: ["Workflows", "ITSM Concepts", "Data"],
    description: "Modeled a basic ticket lifecycle (intake → triage → resolution) with priorities and categories.",
    link: "https://github.com/chpmnk0924nd-dotcom/ticketing-prototype",
    details: [
      "Defined ticket statuses and priority rules.",
      "Designed a simple data model for reporting.",
      "Added sample tickets to demonstrate realistic workload."
    ]
  },
  {
    title: "Windows 11 Performance Cleanup + Baseline",
    slug: "windows-11-performance-cleanup-baseline",
    featured: true,
    stack: ["Windows", "Performance", "Startup Apps", "Maintenance"],
    description: "Documented a repeatable cleanup + baseline checklist to reduce startup bloat and improve responsiveness.",
    link: "https://github.com/chpmnk0924nd-dotcom/windows11-baseline",
    details: [
      "Reviewed startup impact and background apps.",
      "Checked storage health and trimmed temp files safely.",
      "Captured before/after metrics for repeatable results."
    ]
  },

  // --- remaining 19 (non-featured) ---
  {
    title: "Home Networking Lab",
    slug: "home-networking-lab",
    featured: false,
    stack: ["Networking", "Routing", "NAS", "Services"],
    description: "Built a home lab network and hosted services on a NAS with documentation.",
    link: "https://github.com/chpmnk0924nd-dotcom/home-network-lab",
    details: [
      "Hosted SMB + backups + lightweight services.",
      "Documented troubleshooting and monitoring basics."
    ]
  },
  {
    title: "SQL / MySQL Practice Database",
    slug: "sql-mysql-practice-database",
    featured: false,
    stack: ["MySQL", "SQL", "Schema Design"],
    description: "Designed tables and queries to practice joins, validation, and common DB troubleshooting.",
    link: "https://github.com/chpmnk0924nd-dotcom/sql-practice",
    details: [
      "Built normalized tables and sample data.",
      "Practiced joins, constraints, and query tuning basics."
    ]
  },
  {
    title: "Resume Site Content Pipeline",
    slug: "resume-site-content-pipeline",
    featured: false,
    stack: ["Content", "JSON", "Templates", "Automation"],
    description: "Structured resume content as JSON and rendered it consistently across pages/components.",
    link: "https://github.com/chpmnk0924nd-dotcom/resume-pipeline",
    details: [
      "Standardized project/skills schema.",
      "Reduced duplicated edits across the site."
    ]
  },
  {
    title: "Express API Health + Diagnostics Endpoints",
    slug: "express-api-health-diagnostics",
    featured: false,
    stack: ["Node.js", "Express", "Monitoring"],
    description: "Added health checks and simple diagnostics routes to support container monitoring and uptime checks.",
    link: "https://github.com/chpmnk0924nd-dotcom/express-health",
    details: [
      "Implemented /health returning JSON status.",
      "Used structured logging for easier troubleshooting."
    ]
  },
  {
    title: "Postgres Schema + Seed Workflow",
    slug: "postgres-schema-seed-workflow",
    featured: false,
    stack: ["Postgres", "SQL", "Data Modeling"],
    description: "Created a simple projects schema and repeatable seed workflow for realistic sample data.",
    link: "https://github.com/chpmnk0924nd-dotcom/postgres-seed",
    details: [
      "Used JSON arrays for stack and details.",
      "Added unique slug constraint to prevent duplicates."
    ]
  },
  {
    title: "Git Hygiene: Secrets + node_modules Cleanup",
    slug: "git-hygiene-secrets-node-modules",
    featured: false,
    stack: ["Git", ".gitignore", "Security"],
    description: "Fixed repo hygiene by removing tracked secrets and node_modules, then locking in ignore rules.",
    link: "https://github.com/chpmnk0924nd-dotcom/git-hygiene",
    details: [
      "Stopped tracking node_modules and .env safely.",
      "Verified clean status and remote configuration."
    ]
  },
  {
    title: "Basic Log Parser (PowerShell)",
    slug: "basic-log-parser-powershell",
    featured: false,
    stack: ["PowerShell", "Windows", "Automation"],
    description: "Wrote a simple log parser to extract errors and summarize event patterns.",
    link: "https://github.com/chpmnk0924nd-dotcom/log-parser-powershell",
    details: [
      "Filtered by severity/keywords.",
      "Exported summaries for quick review."
    ]
  },
  {
    title: "Nginx Reverse Proxy Notes (Local Lab)",
    slug: "nginx-reverse-proxy-notes",
    featured: false,
    stack: ["Nginx", "Networking", "HTTP"],
    description: "Reverse proxy notes for routing traffic to multiple local services with clean URLs.",
    link: "https://github.com/chpmnk0924nd-dotcom/nginx-notes",
    details: [
      "Mapped paths to services.",
      "Documented common proxy gotchas."
    ]
  },
  {
    title: "Docker Compose Patterns (Multi-Service)",
    slug: "docker-compose-patterns-multi-service",
    featured: false,
    stack: ["Docker", "Compose", "DevOps"],
    description: "Practical Compose patterns for app + db + volumes + health checks.",
    link: "https://github.com/chpmnk0924nd-dotcom/compose-patterns",
    details: [
      "Used named volumes for persistence.",
      "Validated service-to-service networking."
    ]
  },
  {
    title: "Database Viewer Page (Admin-lite)",
    slug: "database-viewer-page",
    featured: false,
    stack: ["Express", "Postgres", "EJS"],
    description: "Built an internal page to list DB tables/rows for quick demo and verification.",
    link: "https://github.com/chpmnk0924nd-dotcom/db-viewer",
    details: [
      "Added server route to query and render rows.",
      "Used safe escaping and clean table UI."
    ]
  },

  // 15 more realistic “portfolio filler” items (still unique + believable)
  ...Array.from({ length: 15 }).map((_, i) => {
    const n = i + 1;
    return {
      title: [
        "Active Directory Lab Basics",
        "Network Printer Troubleshooting Notes",
        "Asset Tagging + Inventory Checklist",
        "Basic Backup Strategy (3-2-1) Writeup",
        "SSH + Key Auth Setup Notes",
        "DNS Troubleshooting Cheatsheet",
        "DHCP Scope Planning Exercise",
        "Simple Status Page (Uptime-style)",
        "Firewall Rule Review Workbook",
        "Service Ticket Templates Pack",
        "Basic Endpoint Hardening Checklist",
        "Intro to Subnetting Practice Set",
        "LAN Speed Test + Baseline Notes",
        "Email Header Analysis Notes",
        "Patch Tuesday Tracking Sheet"
      ][i],
      slug: [
        "active-directory-lab-basics",
        "network-printer-troubleshooting-notes",
        "asset-tagging-inventory-checklist",
        "backup-strategy-3-2-1-writeup",
        "ssh-key-auth-setup-notes",
        "dns-troubleshooting-cheatsheet",
        "dhcp-scope-planning-exercise",
        "simple-status-page-uptime-style",
        "firewall-rule-review-workbook",
        "service-ticket-templates-pack",
        "basic-endpoint-hardening-checklist",
        "intro-to-subnetting-practice-set",
        "lan-speed-test-baseline-notes",
        "email-header-analysis-notes",
        "patch-tuesday-tracking-sheet"
      ][i],
      featured: false,
      stack: [
        ["Windows Server", "Active Directory"],
        ["Networking", "Troubleshooting"],
        ["IT Operations", "Process"],
        ["Backups", "NAS", "Process"],
        ["SSH", "Security"],
        ["DNS", "Networking"],
        ["DHCP", "Networking"],
        ["Monitoring", "HTTP"],
        ["Firewall", "Networking"],
        ["ITSM", "Documentation"],
        ["Security", "Windows"],
        ["Subnetting", "Networking"],
        ["Networking", "Performance"],
        ["Email", "Security"],
        ["Windows", "Operations"]
      ][i],
      description: `Practical lab notes and documentation project (${n}) that demonstrates real IT workflows and troubleshooting.`,
      link: "https://github.com/chpmnk0924nd-dotcom",
      details: [
        "Built as a repeatable checklist / notes set.",
        "Focused on clarity and real-world troubleshooting steps."
      ]
    };
  })
];

async function main() {
  console.log("Seeding projects with realistic data...");

  // Wipe + reseed to remove the fake-looking duplicates
  await db.query("TRUNCATE TABLE projects RESTART IDENTITY;");

  for (const p of projects) {
    await db.query(
      `
      INSERT INTO projects (title, slug, description, link, stack, details, featured)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      `,
      [
        p.title,
        p.slug,
        p.description,
        p.link,
        JSON.stringify(p.stack || []),
        JSON.stringify(p.details || []),
        !!p.featured
      ]
    );
  }

  console.log(`✅ Seeded ${projects.length} projects.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
