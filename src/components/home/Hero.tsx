import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'

export function Hero() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-primary mb-4 tracking-wider uppercase">
          {profile.role}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-[1.1] mb-6 text-foreground">
          Hi, I&apos;m{' '}
          <span className="text-gradient">{profile.name.split(' ')[0]}</span>
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-secondary-foreground">
          {profile.bio}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View my work
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  )
}
