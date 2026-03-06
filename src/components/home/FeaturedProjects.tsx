import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from '../portfolio/ProjectCard'

export function FeaturedProjects() {
  const { projects, loading } = useProjects()
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  if (loading || featured.length === 0) return null

  return (
    <section className="py-12 border-t border-gray-100">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
        <Link
          to="/portfolio"
          className="text-sm text-accent-600 hover:text-accent-700 font-medium"
        >
          All projects &rarr;
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
