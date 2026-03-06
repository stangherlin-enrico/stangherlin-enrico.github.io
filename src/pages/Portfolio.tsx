import { SEO } from '../components/ui/SEO'
import { ProjectGrid } from '../components/portfolio/ProjectGrid'
import { useProjects } from '../hooks/useProjects'

export function Portfolio() {
  const { projects, loading } = useProjects()

  return (
    <>
      <SEO
        title="Portfolio"
        description="Projects I've built — from web apps to tools and experiments."
        url="/portfolio"
      />
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Portfolio</h1>
        <p className="text-gray-600">Projects I've built and open source work.</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading projects…</p>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </>
  )
}
