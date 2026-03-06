import { useEffect, useState } from 'react'
import { loadAllProjects } from '../utils/mdx'
import type { Project } from '../types/project'

const mdxModules = import.meta.glob('../content/projects/*.mdx')

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllProjects(mdxModules as Parameters<typeof loadAllProjects>[0]).then(
      (p) => {
        setProjects(p)
        setLoading(false)
      }
    )
  }, [])

  return { projects, loading }
}
