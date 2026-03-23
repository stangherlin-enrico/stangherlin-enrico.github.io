import { Link } from 'react-router-dom'
import { SEO } from '../components/ui/SEO'
import { profile } from '../data/profile'

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-10 mt-10 first:border-t-0 first:pt-0 first:mt-0">
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

// ─── Contact row ─────────────────────────────────────────────────────────────

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const external = href.startsWith('http') || href.startsWith('mailto')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground transition-colors hover:border-primary/50 hover:text-primary"
    >
      {icon}
      {label}
    </a>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function About() {
  return (
    <>
      <SEO
        title="About"
        description={`About Enrico Stangherlin — ${profile.role}. About this site, license and contact information.`}
        url="/about"
      />

      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">About</h1>
        <p className="text-secondary-foreground">Who I am, how this site works, and how to get in touch.</p>
      </div>

      <div className="max-w-2xl">

        {/* ── Who I am ── */}
        <Section title="Who I am">
          <div className="space-y-4 text-base leading-7 text-secondary-foreground">
            <p>
              I'm <strong className="text-foreground">Enrico Stangherlin</strong>, a software engineer
              based in {profile.location}. I have two years of professional experience across backend,
              mobile and frontend development, and I'm currently studying Computer Science at the
              University of Padua.
            </p>
            <p>
              I approach every problem with a research-driven mindset: I want to understand deeply,
              not just deliver quickly. I've contributed to enterprise systems in C#, Java and Swift,
              and I independently design and build high-complexity projects — from .NET library
              ecosystems to full-stack consumer products.
            </p>
            <p>
              I look for environments where technology is a lever for innovation and accessibility,
              and where the quality of thought behind a solution matters as much as the solution itself.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <ContactLink
              href={`mailto:${profile.email}`}
              label={profile.email}
              icon={
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
            />
            <ContactLink
              href={profile.linkedin}
              label="LinkedIn"
              icon={
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
            />
            <ContactLink
              href={profile.github}
              label="GitHub"
              icon={
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              }
            />
          </div>
        </Section>

        {/* ── About this site ── */}
        <Section title="About this site">
          <div className="space-y-4 text-base leading-7 text-secondary-foreground">
            <p>
              This site is my personal portfolio and blog — a place to document projects, write about
              software, and maintain a professional profile. It's built entirely from scratch with
              React, Vite and Tailwind CSS, and deployed on GitHub Pages via GitHub Actions.
            </p>
            <p>
              The source code is publicly available. If you want to use it as a starting point for
              your own portfolio, read the{' '}
              <a href="#license" className="font-medium text-primary hover:underline">
                license section below
              </a>{' '}
              and download the setup guide from the{' '}
              <Link to="/portfolio/personal-portfolio" className="font-medium text-primary hover:underline">
                project page
              </Link>
              .
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: 'Framework',   value: 'React 18 + Vite 6' },
              { label: 'Language',    value: 'TypeScript' },
              { label: 'Styling',     value: 'Tailwind CSS v3' },
              { label: 'Content',     value: 'MDX' },
              { label: 'Search',      value: 'Fuse.js' },
              { label: 'Hosting',     value: 'GitHub Pages' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-md border border-border bg-card px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Open to ── */}
        <Section title="Open to">
          <ul className="space-y-3 text-base leading-7 text-secondary-foreground">
            {[
              { title: 'Collaboration',     desc: 'Open source contributions, technical discussions, or working on interesting problems together.' },
              { title: 'Feedback',          desc: "If you spot something wrong or have a suggestion, I'm happy to hear it." },
            ].map(({ title, desc }) => (
              <li key={title} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span><strong className="text-foreground">{title}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── License ── */}
        <Section title="License">
          <div id="license" className="mb-4 text-sm leading-relaxed text-secondary-foreground">
            The source code of this site is released under a custom <em>Source-Available</em> license.
            Personal, non-commercial use as a portfolio template is permitted with mandatory attribution.
            The full terms are reproduced below.
          </div>

          <div className="rounded-md border border-border bg-card p-6">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-secondary-foreground">{LICENSE_TEXT}</pre>
          </div>
        </Section>

      </div>
    </>
  )
}

// ─── License text ─────────────────────────────────────────────────────────────

const LICENSE_TEXT = `Enrico Stangherlin Portfolio — Source-Available License v1.0

Copyright (c) 2025 Enrico Stangherlin. All rights reserved.

────────────────────────────────────────────────────────────────
GRANT OF RIGHTS
────────────────────────────────────────────────────────────────

Subject to the conditions below, you are granted a limited,
non-exclusive, non-transferable right to:

  1. VIEW     — Read and study the source code for personal
                learning and reference purposes.

  2. TEMPLATE — Use this project as a starting point for your
                own personal, non-commercial portfolio or
                GitHub Pages site, provided all conditions
                below are met.

────────────────────────────────────────────────────────────────
CONDITIONS
────────────────────────────────────────────────────────────────

  ATTRIBUTION REQUIRED (MANDATORY IN ALL CASES)

    Any use of this code, in whole or in part, must include
    clear and prominent credit to the original author. This
    credit must appear in:

      - The project's README or main documentation, AND
      - Any user-facing credits, about pages, or footer,
        where technically applicable.

    The attribution must read, at minimum:

      "Based on work by Enrico Stangherlin
       (https://github.com/stangherlin-enrico)"

    Removing, hiding, or obscuring this attribution is
    strictly prohibited.

  NO COMMERCIAL USE

    You may not use this code, in whole or in part, for any
    commercial purpose, including but not limited to: selling,
    licensing, embedding in a revenue-generating product or
    service, or use within a commercial organisation's internal
    tooling.

  NO REDISTRIBUTION AS A TEMPLATE OR THEME

    You may not publish, distribute, sublicense, package, or
    make publicly available this code (or any derivative of it)
    as a reusable template, theme, or boilerplate for others.
    Using it for your own personal site is permitted; sharing
    it as a ready-made product is not.

  NO CLAIM OF AUTHORSHIP

    You may not represent this code, or any work substantially
    derived from it, as your own original creation. You may not
    remove or alter any copyright notices present in the source.

  PERSONAL USE ONLY

    Derivative works must remain personal, non-commercial sites
    (e.g. a personal GitHub Pages portfolio). Any other use
    requires prior written permission from the author.

────────────────────────────────────────────────────────────────
DISCLAIMER
────────────────────────────────────────────────────────────────

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
NON-INFRINGEMENT. IN NO EVENT SHALL ENRICO STANGHERLIN BE
LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN
CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`
