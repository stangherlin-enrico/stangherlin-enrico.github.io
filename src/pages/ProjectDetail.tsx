import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { SEO } from '../components/ui/SEO'
import type { Project, ProjectStatus, ChangelogType } from '../types/project'

type MdxModule = {
  frontmatter: Omit<Project, 'slug'>
  default: React.ComponentType
}

const mdxModules = import.meta.glob('../content/projects/*.mdx')

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ProjectStatus, string> = {
  'released':    'bg-[hsl(152,60%,42%,0.15)] text-[hsl(152,60%,52%)] border-[hsl(152,60%,42%,0.3)]',
  'in-progress': 'bg-primary/10 text-primary border-primary/30',
  'archived':    'bg-muted text-muted-foreground border-border',
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  'released':    'Released',
  'in-progress': 'In progress',
  'archived':    'Archived',
}

const CHANGELOG_STYLES: Record<ChangelogType, string> = {
  Feature:  'bg-[hsl(152,60%,42%,0.15)] text-[hsl(152,60%,52%)]  border-[hsl(152,60%,42%,0.3)]',
  Fix:      'bg-[hsl(200,80%,55%,0.15)] text-[hsl(200,80%,65%)]  border-[hsl(200,80%,55%,0.3)]',
  Breaking: 'bg-[hsl(0,60%,55%,0.15)]  text-[hsl(0,60%,65%)]    border-[hsl(0,60%,55%,0.3)]',
  Internal: 'bg-muted text-muted-foreground border-border',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ project }: { project: Omit<Project, 'slug'> }) {
  const { status, openSource, confidential, url, github, tags, date, setupGuide } = project

  return (
    <aside className="shrink-0 w-full md:w-56 lg:w-64">
      <div className="rounded-md border border-border bg-card p-5 space-y-5">

        {/* Status & visibility */}
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
          <div className="flex flex-wrap gap-1.5">
            <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-sm ${STATUS_STYLES[status]}`}>
              {STATUS_LABELS[status]}
            </span>
            {openSource && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-sm bg-[hsl(200,80%,55%,0.15)] text-[hsl(200,80%,65%)] border-[hsl(200,80%,55%,0.3)]">
                Open source
              </span>
            )}
            {confidential && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-sm bg-[hsl(0,60%,55%,0.15)] text-[hsl(0,60%,65%)] border-[hsl(0,60%,55%,0.3)]">
                Confidential
              </span>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Started</p>
          <p className="text-sm text-secondary-foreground">{formatDate(date)}</p>
        </div>

        {/* Links */}
        {!confidential && (github || url) && (
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Links</p>
            <div className="flex flex-col gap-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Live site
                </a>
              )}
            </div>
          </div>
        )}

        {/* Confidential note */}
        {confidential && (
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Links</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Links are not available for confidential projects pending public release.
            </p>
          </div>
        )}

        {/* Setup guide download */}
        {setupGuide && (
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Documentation</p>
            <a
              href={setupGuide}
              download="portfolio-setup-guide.md"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Setup guide
            </a>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              Read the{' '}
              <a
                href="https://github.com/stangherlin-enrico/stangherlin-enrico.github.io/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                LICENSE
              </a>
              {' '}before using the code.
            </p>
          </div>
        )}

        {/* Stack */}
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/portfolio?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium font-mono rounded-sm border border-border bg-secondary text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </aside>
  )
}

// ─── Changelog ───────────────────────────────────────────────────────────────

function Changelog({ entries }: { entries: NonNullable<Project['changelog']> }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="mt-16 border-t border-border pt-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 font-display text-xl font-bold text-foreground hover:text-primary transition-colors mb-6"
      >
        Changelog
        <svg
          className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="space-y-4">
          {entries.map((entry, i) => (
            <div key={i} className="flex gap-4 items-start pl-4 border-l-2 border-border">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold text-primary">{entry.version}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium font-mono border rounded-sm ${CHANGELOG_STYLES[entry.type]}`}>
                    {entry.type}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">{entry.date}</span>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [mod, setMod] = useState<MdxModule | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const path = `../content/projects/${slug}.mdx`
    const loader = mdxModules[path]
    if (!loader) { setNotFound(true); return }
    loader().then((m: unknown) => setMod(m as MdxModule))
  }, [slug])

  if (notFound) return <Navigate to="/portfolio" replace />
  if (!mod) return <p className="text-sm text-muted-foreground py-8 font-mono">Loading…</p>

  const { frontmatter, default: Content } = mod
  const { title, excerpt, changelog } = frontmatter

  return (
    <>
      <SEO title={title} description={excerpt} url={`/portfolio/${slug}`} />

      {/* Back link */}
      <div className="mb-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to portfolio
        </Link>
      </div>

      {/* Title & excerpt */}
      <div className="mb-8 border-b border-border pb-8">
        <h1 className="font-display mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="text-lg leading-relaxed text-secondary-foreground">{excerpt}</p>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <article className="min-w-0 flex-1">
          <div className="prose max-w-none">
            <Content />
          </div>
        </article>
        <Sidebar project={frontmatter} />
      </div>

      {/* Changelog */}
      {changelog && changelog.length > 0 && (
        <Changelog entries={changelog} />
      )}
    </>
  )
}
