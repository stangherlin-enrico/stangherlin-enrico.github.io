# stangherlin-enrico.github.io

Personal portfolio and blog site for Enrico Stangherlin — software developer and Computer Science student at the University of Padua.

Live at: **[stangherlin-enrico.github.io](https://stangherlin-enrico.github.io)**

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Content | MDX (blog posts and project pages) |
| MDX plugins | remark-frontmatter, remark-mdx-frontmatter, remark-gfm, rehype-highlight |
| Routing | React Router v6 |
| SEO | react-helmet-async |
| Search | Fuse.js |
| CV generation | Puppeteer Core (headless Chrome/Edge) |
| Deploy | GitHub Actions → GitHub Pages |

## Project structure

```
src/
  App.tsx                  # Route definitions
  main.tsx                 # Entry point
  data/
    profile.ts             # Personal info, skills
    projects.ts            # Portfolio projects list
  content/
    blog/                  # Blog posts (.mdx)
    projects/              # Project detail pages (.mdx)
  pages/
    Home.tsx
    Portfolio.tsx
    ProjectDetail.tsx
    Blog.tsx
    BlogPost.tsx
    CV.tsx
    About.tsx
  components/
    layout/                # Layout, Footer
    blog/                  # PostCard, PostList, SearchBar, TagFilter
    ui/                    # Button, Badge, SEO
  hooks/
    useBlogPosts.ts
    useSearch.ts
  utils/
    search.ts
  types/
    blog.ts
scripts/
  generate-cv.mjs          # Generates PDF CV via Puppeteer
  cv-template.html         # HTML source for the CV
public/
  cv/
    en-GB.pdf              # Generated CV (committed after running npm run cv)
    manifest.json          # CV language manifest
.github/
  workflows/
    deploy.yml             # CI: build + deploy to GitHub Pages
```

## Local development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`. The CI workflow also copies `dist/index.html` to `dist/404.html` to support client-side SPA routing on GitHub Pages.

## CV generation

The CV is an HTML template rendered to PDF via headless Chrome/Edge.

**Prerequisites:** Google Chrome or Microsoft Edge must be installed.

```bash
# Generate colour + B&W versions
npm run cv

# Options
npm run cv -- --no-bw            # Colour only
npm run cv -- --no-place-date    # Skip place and date field
npm run cv -- --no-signature     # Skip signature even if image exists
npm run cv -- --help             # Show all options
```

Generated files:
- `dist/Enrico_Stangherlin_CV.pdf` — colour version (temporary)
- `dist/Enrico_Stangherlin_CV_BW.pdf` — B&W version (temporary)
- `public/cv/en-GB.pdf` — copied here to be served by the site (commit this)
- `public/cv/manifest.json` — language manifest for the CV page (commit this)

To add a signature, place `signature.png` in the `private/` directory (gitignored).

## Deployment

Deployment is fully automated via GitHub Actions on every push to `main`. The workflow installs dependencies, runs `npm run build`, and publishes the `dist/` folder to GitHub Pages.

Manual trigger is also available via `workflow_dispatch` in the GitHub Actions UI.

## Adding content

**New blog post:** create a `.mdx` file in `src/content/blog/` with frontmatter:

```mdx
---
title: Post title
date: 2025-01-01
tags: [tag1, tag2]
description: Short description shown in the post list.
---

Content here...
```

**New project:** add an entry to `src/data/projects.ts` and optionally a `.mdx` detail page in `src/content/projects/`.

## License

MIT
