require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const skills = require("./data/skills.json");

const FEATURED_LIMIT = 6;

/**
 * Small helper: run a query safely and return rows.
 */
async function q(sql, params = []) {
  const result = await db.query(sql, params);
  return result.rows;
}

/**
 * Tries to load featured projects. If the "featured" column doesn't exist yet,
 * or if none are featured, it falls back to newest projects.
 */
async function loadHomepageProjects() {
  // 1) Try featured first (may fail if column doesn't exist)
  try {
    const featured = await q(
      `
      SELECT title, slug, description, link, stack, details
      FROM projects
      WHERE featured = true
      ORDER BY id DESC
      LIMIT $1
      `,
      [FEATURED_LIMIT]
    );

    if (featured.length) return featured;
  } catch (err) {
    // If the featured column doesn't exist, Postgres error code is 42703
    // We swallow it and fall back. Any other error should be re-thrown.
    if (err && err.code !== "42703") throw err;
  }

  // 2) Fallback: newest projects
  return await q(
    `
    SELECT title, slug, description, link, stack, details
    FROM projects
    ORDER BY id DESC
    LIMIT $1
    `,
    [FEATURED_LIMIT]
  );
}

/**
 * Routes
 */

app.get("/", async (req, res, next) => {
  try {
    const projects = await loadHomepageProjects();

    res.render("index", {
      title: "Nick Deno | IT Portfolio",
      projects,
      skills,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/projects", async (req, res, next) => {
  try {
    const projects = await q(
      `
      SELECT title, slug, description, link, stack, details
      FROM projects
      ORDER BY id DESC
      `
    );

    res.render("projects", { title: "Projects | Nick Deno", projects });
  } catch (err) {
    next(err);
  }
});

app.get("/projects/:slug", async (req, res, next) => {
  try {
    const rows = await q(
      `
      SELECT title, slug, description, link, stack, details
      FROM projects
      WHERE slug = $1
      LIMIT 1
      `,
      [req.params.slug]
    );

    const project = rows[0];
    if (!project) return res.status(404).render("404", { title: "Not Found" });

    res.render("project", { title: `${project.title} | Nick Deno`, project });
  } catch (err) {
    next(err);
  }
});

app.get("/skills", (req, res) => {
  res.render("skills", { title: "Skills | Nick Deno", skills });
});

app.get("/api/skills", (req, res) => res.json(skills));

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact | Nick Deno", sent: false, error: null });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).render("contact", {
      title: "Contact | Nick Deno",
      sent: false,
      error: "Please fill out all fields.",
    });
  }

  console.log("CONTACT FORM:", { name, email, message });

  res.render("contact", {
    title: "Contact | Nick Deno",
    sent: true,
    error: null,
  });
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/admin/db", async (req, res, next) => {
  try {
    const projects = await q(`
      SELECT id, title, slug, description, link, stack
      FROM projects
      ORDER BY id DESC
      LIMIT 100
    `);

    // Optional: if you have a skills table, this will work.
    // If you DON'T have a skills table yet, comment this out.
    let skillsRows = [];
    try {
      skillsRows = await q(`
        SELECT id, name, category, level
        FROM skills
        ORDER BY category, level DESC
        LIMIT 200
      `);
    } catch (e) {
      // ignore if table doesn't exist
      if (e.code !== "42P01") throw e; // 42P01 = undefined_table
    }

    res.render("admin-db", {
      title: "Database Viewer",
      projects,
      skillsRows,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Error handler (prevents “mystery” 500s)
 */
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err);

  // If headers already sent, let Express handle it
  if (res.headersSent) return next(err);

  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

module.exports = app;
