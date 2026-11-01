# Pokuri Lahari - Personal Portfolio

A sleek, responsive personal portfolio for Pokuri Lahari, Computer Science and Engineering student at KLH University. Features real credential badges, interactive architecture flow diagrams, scrollspy navigation, ambient portrait card animations, and an infinite marquee carousel.

---

## 📁 Repository Structure

For standard static hosting (e.g., **GitHub Pages** or **Vercel**), keep this clean structure:

```text
pokuri-lahari-portfolio/
├── index.html                    <-- Main entry point (or copy portfolio.html)
├── assets/
│   ├── badges/                   <-- Real vector badges
│   │   ├── google-cloud-arcade.svg
│   │   ├── aws-certified-cloud-practitioner.svg
│   │   ├── aviatrix-ace-associate.svg
│   │   └── microsoft-azure-ai-fundamentals.svg
│   └── images/                   <-- Local portfolio assets
│       ├── portrait.jpg
│       ├── sage-diagram.png
│       ├── multi-agent-diagram.png
│       ├── aws-builder-avatar.png
│       └── aws-builder-hero.png
└── README.md
```

---

## 🚀 Deployment Instructions

### Option A: Deploy to GitHub Pages (100% Free, 2 Minutes)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a repository named `pokuri-lahari-portfolio` (or `<your-username>.github.io`).
2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio with real badges and local assets"
   git branch -M main
   git remote add origin https://github.com/<your-username>/pokuri-lahari-portfolio.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - In GitHub, go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select Branch: `main`, Folder: `/ (root)`.
   - Click **Save**. Within 60 seconds, your site is live at `https://<your-username>.github.io/pokuri-lahari-portfolio/`!

---

### Option B: Deploy to Vercel (Instant Zero-Config)

1. Go to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository `pokuri-lahari-portfolio`.
3. Framework Preset: **Other** (for pure static `index.html`) or **Vite** (if deploying the Vite project).
4. Click **Deploy**. Vercel gives you an immediate live HTTPS domain with global CDN caching.

---

## 🎨 Design System & Colors

- **Background Cream**: `#FAF8F0` / `#FAF8F1`
- **Signature Coral Accent**: `#EA533D` (Hover: `#FF5A43`, Active: `#D94530`)
- **Charcoal Text**: `#111111`
- **Headings Font**: `Bricolage Grotesque` (Bold, Extrabold, Italic)
- **Body Font**: `Inter`
- **Tags & Badges Font**: `Fragment Mono`
