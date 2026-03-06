import { useState, useMemo } from 'react'
import type { Project } from '../../types/project'
import { ProjectCard } from './ProjectCard'

type Props = { projects: Project[] }

export function ProjectGrid({ projects }: Props) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [filtersOpen, setFiltersOpen] = useState(true)

  // Projects that contain ALL selected tags (AND logic — selection narrows results)
  const filtered = useMemo(
    () =>
      activeTags.size === 0
        ? projects
        : projects.filter((p) => [...activeTags].every((t) => p.tags.includes(t))),
    [projects, activeTags]
  )

  // Tags present in the currently filtered projects — determines what can still be selected
  const compatibleTags = useMemo(
    () => new Set(filtered.flatMap((p) => p.tags)),
    [filtered]
  )

  // All tags, sorted — used as the full reference list
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
    return <p className="text-gray-500">No projects yet.</p>
  }

  return (
    <div>
      {/* Filter header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg
            className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Filters
          {activeTags.size > 0 && (
            <span className="ml-0.5 rounded-full bg-accent-600 px-1.5 py-0.5 text-[10px] font-semibold text-white leading-none">
              {activeTags.size}
            </span>
          )}
        </button>

        {activeTags.size > 0 && (
          <button
            onClick={() => setActiveTags(new Set())}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Tag filter — full panel when open */}
      {filtersOpen && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTags(new Set())}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeTags.size === 0
                ? 'bg-accent-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      )}

      {/* Active filters summary when collapsed */}
      {!filtersOpen && activeTags.size > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {[...activeTags].map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="flex items-center gap-1 rounded-full bg-accent-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-accent-700"
            >
              {tag}
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No projects match the selected filters.</p>
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
