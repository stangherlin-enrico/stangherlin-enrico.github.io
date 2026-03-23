import { Link } from 'react-router-dom'
import type { Project, ProjectStatus } from '../../types/project'

// ─── Status badge ─────────────────────────────────────────────────────────────

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

// ─── Visibility badge ─────────────────────────────────────────────────────────

function VisibilityBadge({ openSource, confidential }: { openSource?: boolean; confidential?: boolean }) {
  if (openSource) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-sm bg-[hsl(200,80%,55%,0.15)] text-[hsl(200,80%,65%)] border-[hsl(200,80%,55%,0.3)]">
        Open source
      </span>
    )
  }
  if (confidential) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-sm bg-[hsl(0,60%,55%,0.15)] text-[hsl(0,60%,65%)] border-[hsl(0,60%,55%,0.3)]">
        Confidential
      </span>
    )
  }
  return null
}

// ─── Card ─────────────────────────────────────────────────────────────────────

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  const { slug, title, excerpt, tags, status, openSource, confidential } = project

  return (
    <Link
      to={`/portfolio/${slug}`}
      className="group block rounded-md border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(38,92%,55%,0.15)]"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        {/* Arrow icon */}
        <svg
          className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 ml-2"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      <p className="text-sm text-secondary-foreground mb-4 leading-relaxed line-clamp-2">
        {excerpt}
      </p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-sm ${STATUS_STYLES[status]}`}>
          {STATUS_LABELS[status]}
        </span>
        <VisibilityBadge openSource={openSource} confidential={confidential} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-1 text-xs font-medium font-mono rounded-sm border border-border bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
