# Portfolio Server

A personal portfolio website built with **Node.js**, **Express**, and **EJS**, showcasing projects, skills, and contact information. This project is designed to demonstrate full‑stack fundamentals, clean project structure, and deployment readiness.

---

## 🚀 Features

* Express server with EJS templating
* Dynamic project data loaded from JSON
* Clean, modern UI with custom CSS
* Dockerized for consistent deployment
* Environment variable support via dotenv
* Production‑ready middleware (Helmet, Compression, Morgan)

---

## 🧰 Tech Stack

* **Backend:** Node.js, Express
* **Templating:** EJS
* **Styling:** CSS (custom)
* **Security & Performance:** Helmet, Compression
* **Logging:** Morgan
* **Containerization:** Docker
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
portfolio-server/
│
├── data/
│   └── projects.json        # Project data
│
├── public/
│   └── css/
│       └── styles.css       # Site styling
│
├── views/
│   ├── layout.ejs           # Base layout
│   ├── index.ejs            # Home page
│   ├── projects.ejs         # Projects page
│   └── contact.ejs          # Contact page
│
├── server.js                # Express app entry point
├── package.json
├── Dockerfile
└── README.md
```

---

## ▶️ Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🐳 Running with Docker

### Build the image

```bash
docker build -t portfolio-server .
```

### Run the container

```bash
docker run -p 3000:3000 portfolio-server
```

---

## 🎯 Purpose

This project was built as part of my transition into IT and software development, demonstrating:

* Backend fundamentals
* MVC‑style organization
* Real‑world tooling (Docker, Git)
* Troubleshooting and deployment workflows

---

## 📬 Contact

If you’d like to connect or learn more:

* GitHub: [https://github.com/chpmnk0924nd-dotcom](https://github.com/chpmnk0924nd-dotcom)
* LinkedIn: (https://www.linkedin.com/in/nicholas-deno/)

---

**Built by Nick Deno**
# portfolio-server
