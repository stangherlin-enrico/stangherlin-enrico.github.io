# Portfolio Setup Guide

> **Before you begin — read the LICENSE**
> This project is released under the *Enrico Stangherlin Portfolio — Source-Available License v1.0*.
> Using this code as a base for your own site is permitted **only under the conditions stated in the
> LICENSE file**, which include mandatory attribution and a strict prohibition on commercial use.
> Read it carefully before proceeding: https://github.com/stangherlin-enrico/stangherlin-enrico.github.io/blob/main/LICENSE

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Node.js | 18.x | LTS recommended |
| npm | 9.x | Included with Node |
| Git | Any recent | For cloning and deployment |
| GitHub account | — | Required for GitHub Pages |

---

## 1. Fork the repository

1. Go to https://github.com/stangherlin-enrico/stangherlin-enrico.github.io
2. Click **Fork** (top-right)
3. Name your fork `<your-username>.github.io` — GitHub Pages requires this exact naming for user sites
4. Keep the fork **public** (required for free GitHub Pages)

> ⚠️ If you name the repo anything other than `<username>.github.io`, the site will be served at
> `https://<username>.github.io/<repo-name>/` and you will need to set `base` in `vite.config.ts`
> accordingly.

---

## 2. Clone and install

```bash
git clone https://github.com/<your-username>/<your-username>.github.io.git
cd <your-username>.github.io
npm install
```

---

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 4. Personalise the content

### Personal info
Edit `src/data/profile.ts` — name, role, bio, location, email, phone, GitHub, LinkedIn.

### CV page
Edit `src/pages/CV.tsx` — all content is hardcoded in the component (work experience, education,
skills, languages, certifications). Replace every entry with your own.

### Projects
Each project is an MDX file in `src/content/projects/`. The frontmatter fields are:

```yaml
---
title: "Project Title"
excerpt: "Short description shown on the portfolio card."
tags: ["Tag1", "Tag2"]
status: "released"          # released | in-progress | archived
openSource: true            # optional
confidential: false         # optional — hides links if true
featured: true              # optional — shows on the home page
date: "2024-01-01"
github: "https://github.com/..."
url: "https://your-live-site.com"
---

Full description in Markdown here...
```

To add a project: create a new `.mdx` file in `src/content/projects/`. No other files need to change.

### Blog posts
Each post is an MDX file in `src/content/blog/`. Frontmatter:

```yaml
---
title: "Post Title"
date: "2025-03-01"
tags: ["tag1", "tag2"]
excerpt: "Short description for the listing page."
cover: "/images/blog/cover.png"   # optional
---
```

### CV PDF
The downloadable CV is generated from `scripts/cv-template.html` using Puppeteer:

```bash
npm run cv
```

This produces `dist/Enrico_Stangherlin_CV.pdf` and copies it to `public/cv/en-GB.pdf`.
Edit `scripts/cv-template.html` with your own data before generating.
The available downloads are controlled by `public/cv/manifest.json`.

---

## 5. Enable GitHub Pages

1. Go to your repository on GitHub → **Settings** → **Pages**
2. Under *Source*, select **GitHub Actions**
3. The workflow is already configured in `.github/workflows/deploy.yml` — it triggers automatically on every push to `main`

The first deploy will run after your next `git push`. Your site will be live at:
`https://<your-username>.github.io`

---

## 6. Attribution

As required by the license, add the following to your README and any credits/about page:

```
Based on work by Enrico Stangherlin (https://github.com/stangherlin-enrico)
```

---

## 7. Optional customisation

### Accent colour
The accent colour used throughout the site is defined in `tailwind.config.js` under `colors.accent`.
Change it to make the site your own.

### SEO
Base URL for og:url tags is set in `src/components/ui/SEO.tsx`. Update it to your domain.

---

*This guide was written for the version of the site available at the time of writing.
Check the repository for any updates.*
