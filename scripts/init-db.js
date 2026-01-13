require("dotenv").config();
const db = require("../db");
const seedProjects = require("../data/projects.json");

async function run() {
  // 1) table
  await db.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      description TEXT,
      link TEXT,
      stack TEXT[] DEFAULT '{}',
      details TEXT[] DEFAULT '{}',
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  // 2) seed (upsert by slug if slug exists)
  for (const p of seedProjects) {
    // make sure every project has a slug
    const slug =
      p.slug ||
      p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    await db.query(
      `
      INSERT INTO projects (title, slug, description, link, stack, details, featured)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        link = EXCLUDED.link,
        stack = EXCLUDED.stack,
        details = EXCLUDED.details
      `,
      [
        p.title,
        slug,
        p.description || null,
        p.link || null,
        p.stack || [],
        p.details || [],
        !!p.featured
      ]
    );
  }

  console.log("✅ DB init complete (projects table + seed).");
}

run().catch((e) => {
  console.error("❌ init-db failed:", e);
  process.exit(1);
});

