import { Link } from 'react-router-dom'
import type { Project, ProjectStatus } from '../../types/project'

// ─── Status badge ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ProjectStatus, string> = {
  'released':    'bg-green-100 text-green-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  'archived':    'bg-gray-100  text-gray-500',
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  'released':    'Released',
  'in-progress': 'In progress',
  'archived':    'Archived',
}

// ─── Card ────────────────────────────────────────────────────────────────────

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  const { slug, title, excerpt, tags, status, openSource, confidential, url, github, image } = project

  return (
    <article className="group flex flex-col rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      {image && (
        <img
          src={image}
          alt={title}
          className="mb-4 h-40 w-full rounded object-cover"
        />
      )}

      {/* Title */}
      <h3 className="mb-2 font-semibold text-gray-900 leading-snug flex items-center gap-1.5">
        {confidential && (
          <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        )}
        {title}
      </h3>

      {/* Badges */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
          {STATUS_LABELS[status]}
        </span>
        {openSource && (
          <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-medium text-accent-700">
            Open source
          </span>
        )}
        {confidential && (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
            Confidential
          </span>
        )}
      </div>

      {/* Excerpt */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{excerpt}</p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={`/portfolio/${slug}`}
          className="text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
        >
          Details →
        </Link>
        {!confidential && url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Live site
          </a>
        )}
        {!confidential && github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </article>
  )
}
