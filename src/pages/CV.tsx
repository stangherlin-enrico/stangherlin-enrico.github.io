import { useEffect, useRef, useState } from 'react'
import { SEO } from '../components/ui/SEO'
import { profile } from '../data/profile'

// ─── Section ────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-5 shrink-0 bg-primary" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

// ─── Timeline ───────────────────────────────────────────────────────────────

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-1 border-l-2 border-border pl-6 space-y-8">
      {children}
    </div>
  )
}

function TimelineItem({
  title,
  subtitle,
  subtitleHref,
  period,
  location,
  children,
}: {
  title: string
  subtitle: string
  subtitleHref?: string
  period: string
  location?: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative">
      {/* dot */}
      <span className="absolute -left-[31px] top-[6px] flex h-3 w-3 items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
      </span>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <span className="font-semibold text-foreground">{title}</span>
        <span className="text-xs font-medium tabular-nums font-mono text-muted-foreground">{period}</span>
      </div>

      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        {subtitleHref ? (
          <a
            href={subtitleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {subtitle}
          </a>
        ) : (
          <span className="text-sm font-medium text-primary">{subtitle}</span>
        )}
        {location && (
          <>
            <span className="text-border">·</span>
            <span className="text-xs text-muted-foreground">{location}</span>
          </>
        )}
      </div>

      {children && (
        <div className="mt-2.5 text-sm leading-relaxed text-secondary-foreground">{children}</div>
      )}
    </div>
  )
}

// ─── Project card ────────────────────────────────────────────────────────────

function ProjectCard({
  title,
  status,
  tags,
  children,
}: {
  title: string
  status: string
  tags: string[]
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <span className="font-semibold text-foreground">{title}</span>
        <span className="shrink-0 rounded-sm border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {status}
        </span>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-secondary-foreground">{children}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-mono border border-border rounded-sm bg-secondary text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Skill group ─────────────────────────────────────────────────────────────

function SkillGroup({ label, items, soft }: { label: string; items: string[]; soft?: boolean }) {
  return (
    <div>
      <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s}
            className={`rounded-sm px-3 py-1 text-sm font-mono ${
              soft
                ? 'border border-border text-secondary-foreground'
                : 'bg-secondary text-secondary-foreground border border-border'
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Download dropdown ───────────────────────────────────────────────────────

type CvVersion = { label: string; file: string }

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

function DownloadDropdown() {
  const [versions, setVersions] = useState<CvVersion[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/cv/manifest.json')
      .then((r) => r.json())
      .then((data: CvVersion[]) => setVersions(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (versions.length === 0) return null

  if (versions.length === 1) {
    return (
      <a
        href={versions[0].file}
        download="StangherlinEnrico_CV.pdf"
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <DownloadIcon />
        Download PDF
      </a>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <DownloadIcon />
        Download PDF
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-44 rounded-md border border-border bg-card py-1 shadow-lg">
          {versions.map(({ label, file }) => (
            <a
              key={file}
              href={file}
              download="StangherlinEnrico_CV.pdf"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Reference strings ───────────────────────────────────────────────────────

const REFERENCE_EN = `I had the pleasure of working together with Enrico in the same team and, from the very start, I was struck by his pragmatic approach and his ability to truly go deep into things. Enrico never stops at the surface — he wants to understand, improve and continuously improve himself.

His passion for computer science is evident and it is what drives him to constantly seek new information, solutions and points of view. Even after our team experience, we continued to exchange views on topics related to software development and software as a strategic asset, and every exchange with him is always stimulating.

Enrico wants to do things well, and this comes through in every detail of his work. His decisions are considered, the result of research, care and attention to quality.

I strongly recommend Enrico to any team that wishes to have a person capable of raising the level of their software, attentive to detail and oriented towards continuous growth.`

const REFERENCE_IT = `Ho avuto il piacere di lavorare insieme a Enrico nello stesso team e, fin da subito, mi ha colpito il suo approccio pragmatico e la sua capacità di andare davvero in profondità nelle cose. Enrico non si ferma mai alla superficie, vuole capire, migliorare e migliorarsi continuamente.

La sua passione per l'informatica è evidente ed è ciò che lo spinge a cercare costantemente nuove informazioni, soluzioni e punti di vista. Anche dopo la nostra esperienza di team, abbiamo continuato a confrontarci su temi legati allo sviluppo software e al software come asset strategico, e ogni scambio con lui è sempre stimolante.

Enrico vuole fare le cose bene, e questo emerge in ogni dettaglio del suo lavoro. Le sue decisioni sono ponderate, frutto di ricerca, cura e attenzione alla qualità.

Consiglio vivamente Enrico a qualsiasi team che desideri una persona capace di elevare il livello del proprio software, attenta ai dettagli e orientata alla crescita continua.`

// ─── Page ────────────────────────────────────────────────────────────────────

export function CV() {
  const [showOriginal, setShowOriginal] = useState(false)

  return (
    <>
      <SEO
        title="CV"
        description="Curriculum vitae of Enrico Stangherlin — software developer."
        url="/cv"
      />

      {/* ── Disclaimer ── */}
      <div className="mb-8 flex items-start gap-2.5 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
        <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <span>
          This page includes additional sections — projects and references — not present in the downloadable PDF.
        </span>
      </div>

      {/* ── Header ── */}
      <div className="mb-12 border-b border-border pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
              Enrico Stangherlin
            </h1>
            <p className="mt-1 text-base font-medium text-primary">Software Engineer</p>
          </div>
          <DownloadDropdown />
        </div>

        {/* Contact row */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {profile.location}
          </span>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className="max-w-2xl">

        {/* ── Summary ── */}
        <Section title="Summary">
          <p className="leading-7 text-secondary-foreground">
            Software Engineer with two years of professional experience across backend, mobile and
            frontend development, and an active Computer Science student at the University of Padua.
            I approach every problem with a critical, research-driven mindset — I want to understand
            deeply, not just deliver quickly. I have contributed to complex enterprise systems in C#,
            Java and Swift, and I independently design and build high-complexity projects where I apply
            the same methodologies I use to mentor early-stage developers. I seek environments where
            technology is a lever for innovation and accessibility, and where the quality of thought
            behind a solution matters as much as the solution itself.
          </p>
        </Section>

        {/* ── Relevant Projects ── */}
        <Section title="Relevant Projects">
          <div className="space-y-4">
            <ProjectCard
              title="StangaNetLib — .NET C# Library Ecosystem"
              status="Released · Open source"
              tags={['C#', '.NET', 'TDD', 'Clean Architecture', 'Redis', 'JWT', 'Auth0', 'GDPR']}
            >
              Suite of 10 independent, composable .NET 8 / .NET 9 libraries developed with a
              Test-Driven Development approach, each fully covered by unit and integration tests.
              Designed to provide Clean Architecture building blocks with zero external dependencies
              at the core. Covers: shared domain contracts, result primitives and guard clauses (Core),
              keyed locks, throttle and bounded work queues (Concurrency), unified cache abstraction
              (in-memory / Redis), structured observability with GDPR-safe log masking, image
              optimisation and multi-provider media storage, JWT authentication with per-device token
              rotation, BCrypt password hashing and Auth0 integration, distributed rate limiting,
              idempotency middleware, a full GDPR compliance toolkit (AES-256 pseudonymisation, audit
              trail, data export/deletion), and a generic multi-step content approval workflow.
            </ProjectCard>
          </div>
        </Section>

        {/* ── Work Experience ── */}
        <Section title="Work Experience">
          <Timeline>
            <TimelineItem
              title="Software Developer"
              subtitle="Modi Nuovi SPA"
              subtitleHref="https://www.modi.it/"
              period="Dec 2023 – Jul 2025"
              location="San Martino di Lupari, Italy"
            >
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Backend development in C# / .NET for business-critical modules</li>
                <li>Rich UI components built with DevExpress and Bootstrap</li>
                <li>Native Android development in Java and iOS development in Swift</li>
                <li>Collaborated in cross-functional teams delivering end-to-end features</li>
              </ul>
            </TimelineItem>
            <TimelineItem
              title="Software Developer"
              subtitle="VIDA SRL"
              subtitleHref="https://vidasoftware.it/it/"
              period="Jun 2023 – Nov 2023"
              location="Riese Pio X, Italy"
            >
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>C# / .NET backend development and maintenance</li>
                <li>Frontend integration with HTML and CSS</li>
              </ul>
            </TimelineItem>
          </Timeline>
        </Section>

        {/* ── Education ── */}
        <Section title="Education">
          <Timeline>
            <TimelineItem
              title="Bachelor's Degree Student — Computer Science"
              subtitle="Università degli Studi di Padova"
              subtitleHref="https://www.unipd.it/"
              period="Oct 2025 – Present"
              location="Padova, Italy"
            >
              EQF Level 6 · Focus: software development, networks and databases.
            </TimelineItem>
            <TimelineItem
              title="Technical Diploma — ICT"
              subtitle="ITT Eugenio Barsanti"
              subtitleHref="https://www.barsantigalilei.edu.it/"
              period="Sep 2016 – Jun 2021"
              location="Castelfranco Veneto, Italy"
            >
              Final grade: 85/100 · Thesis: Drone application · EQF Level 4
            </TimelineItem>
          </Timeline>
        </Section>

        {/* ── Skills ── */}
        <Section title="Skills">
          <div className="space-y-5">
            <SkillGroup
              label="Hard Skills"
              items={[
                'C#', '.NET', 'JavaScript', 'TypeScript',
                'HTML', 'CSS', 'Bootstrap', 'DevExpress',
                'SQL', 'SQL Server', 'MySQL', 'PostgreSQL',
                'Entity Framework Core', 'Redis',
                'Android (Java / Kotlin)', 'iOS (Swift / SwiftUI)',
                'React', 'Blazor', 'SignalR',
                'Clean Architecture', 'Git', 'OOP',
              ]}
            />
            <SkillGroup
              label="Soft Skills"
              soft
              items={[
                'Problem Solving', 'Teamwork', 'Autonomy',
                'Continuous Learning', 'Critical Thinking',
                'Ownership', 'Attention to Detail',
              ]}
            />
          </div>
        </Section>

        {/* ── Languages ── */}
        <Section title="Languages">
          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Mother tongue
              </span>
              <span className="font-medium text-foreground">Italian</span>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-4">
                <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Other
                </span>
                <span className="font-medium text-foreground">English</span>
              </div>
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-muted-foreground" colSpan={2}>
                        Understanding
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-muted-foreground" colSpan={2}>
                        Speaking
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-muted-foreground">
                        Writing
                      </th>
                    </tr>
                    <tr className="border-t border-border">
                      <th className="px-4 py-1.5 text-left font-normal text-muted-foreground">Listening</th>
                      <th className="px-4 py-1.5 text-left font-normal text-muted-foreground">Reading</th>
                      <th className="px-4 py-1.5 text-left font-normal text-muted-foreground">Spoken interaction</th>
                      <th className="px-4 py-1.5 text-left font-normal text-muted-foreground">Spoken production</th>
                      <th className="px-4 py-1.5 text-left font-normal text-muted-foreground">Writing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="px-4 py-2.5 font-semibold text-foreground">B2</td>
                      <td className="px-4 py-2.5 font-semibold text-foreground">B2</td>
                      <td className="px-4 py-2.5 font-semibold text-foreground">B1</td>
                      <td className="px-4 py-2.5 font-semibold text-foreground">B1</td>
                      <td className="px-4 py-2.5 font-semibold text-foreground">B1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Levels: A1–A2 Basic · B1–B2 Independent · C1–C2 Proficient (CEFR)
                · Reading &amp; Listening certified B2 by Università degli Studi di Padova (Nov 2025)
              </p>
            </div>
          </div>
        </Section>

        {/* ── Certifications ── */}
        <Section title="Certifications">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'English B2 — Reading & Listening',
                issuer: 'Università degli Studi di Padova · CLA',
                date: 'Nov 2025',
                href: 'https://bestr.it/award/show/z_tJmkBRSCeRD22hJ0L-Ug',
              },
              {
                title: 'Introduction to Cybersecurity',
                issuer: 'Cisco Networking Academy',
                date: 'Mar 2021',
                href: 'https://www.credly.com/badges/d075f125-f53f-45cc-acc2-9a6f5b02bb5b',
              },
              {
                title: 'CCNA Routing and Switching: Introduction to Networks',
                issuer: 'Cisco Networking Academy',
                date: 'Sep 2020',
                href: undefined,
              },
              {
                title: 'Workers Safety Training — Low Risk',
                issuer: 'AGSG',
                date: 'Mar 2024',
                href: undefined,
              },
            ].map(({ title, issuer, date, href }) => (
              <div
                key={title}
                className="rounded-md border border-border bg-card p-4"
              >
                <p className="font-medium text-foreground leading-snug">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{issuer} · {date}</p>
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-xs text-primary hover:underline"
                  >
                    View credential →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── References ── */}
        <Section title="References">
          <figure className="relative overflow-hidden rounded-md border border-border bg-card px-7 pb-6 pt-8">
            {/* Decorative quote mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-2 select-none font-serif text-7xl leading-none text-border"
            >
              &ldquo;
            </span>

            <blockquote className="relative whitespace-pre-line text-sm leading-7 text-secondary-foreground italic">
              {showOriginal ? REFERENCE_IT : REFERENCE_EN}
            </blockquote>

            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <div>
                <p className="font-semibold text-foreground">Emanuele Furlan</p>
                <p className="text-xs text-muted-foreground">Software Craftsman Freelance</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  {showOriginal ? 'Show translation' : 'See original (Italian)'}
                </button>
                <a
                  href="https://www.linkedin.com/in/enrico-stangherlin-82b8a31b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  LinkedIn →
                </a>
              </div>
            </figcaption>
          </figure>
        </Section>

      </div>
    </>
  )
}
