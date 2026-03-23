import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from '../portfolio/ProjectCard'

export function FeaturedProjects() {
  const { projects, loading } = useProjects()
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  if (loading || featured.length === 0) return null

  return (
    <section className="py-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground">Featured Projects</h2>
        <Link
          to="/portfolio"
          className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          All projects →
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
