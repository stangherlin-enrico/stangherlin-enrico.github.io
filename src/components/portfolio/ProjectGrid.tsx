import { useState, useMemo } from 'react'
import type { Project } from '../../types/project'
import { ProjectCard } from './ProjectCard'

type Props = { projects: Project[] }

export function ProjectGrid({ projects }: Props) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  // Projects that contain ALL selected tags (AND logic)
  const filtered = useMemo(
    () =>
      activeTags.size === 0
        ? projects
        : projects.filter((p) => [...activeTags].every((t) => p.tags.includes(t))),
    [projects, activeTags]
  )

  // Tags present in the currently filtered projects
  const compatibleTags = useMemo(
    () => new Set(filtered.flatMap((p) => p.tags)),
    [filtered]
  )

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
    [projects]
  )

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })
  }

  if (projects.length === 0) {
    return <p className="text-muted-foreground text-sm">No projects yet.</p>
  }

  return (
    <div>
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTags(new Set())}
          className={`px-2.5 py-1 text-xs font-mono rounded-sm border transition-colors ${
            activeTags.size === 0
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
          }`}
        >
          All
        </button>

        {allTags.map((tag) => {
          const isActive = activeTags.has(tag)
          const isCompatible = compatibleTags.has(tag)
          if (!isActive && !isCompatible) return null

          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-1 text-xs font-mono rounded-sm border transition-colors ${
                isActive
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {tag}
            </button>
          )
        })}

        {activeTags.size > 0 && (
          <button
            onClick={() => setActiveTags(new Set())}
            className="px-2.5 py-1 text-xs font-mono rounded-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear ×
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16 font-mono text-sm">
          No projects match the selected filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
