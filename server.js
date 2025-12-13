require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const projects = require("./data/projects.json");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Nick Deno | IT Portfolio",
    projects: projects.slice(0, 3),
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects | Nick Deno", projects });
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
