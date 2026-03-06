import type { BlogPost } from '../types/blog'
import type { Project } from '../types/project'

type MdxModule<T> = {
  frontmatter: Omit<T, 'slug'>
  default: React.ComponentType
}

type GlobModules = Record<string, () => Promise<MdxModule<any>>>

export function slugFromPath(path: string): string {
  return path
    .split('/')
    .pop()!
    .replace(/\.mdx$/, '')
}

export async function loadAllPosts(modules: GlobModules): Promise<BlogPost[]> {
  const entries = Object.entries(modules)
  const posts = await Promise.all(
    entries.map(async ([path, loader]) => {
      const mod = await loader()
      return { slug: slugFromPath(path), ...mod.frontmatter } as BlogPost
    })
  )
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function loadAllProjects(modules: GlobModules): Promise<Project[]> {
  const entries = Object.entries(modules)
  const projects = await Promise.all(
    entries.map(async ([path, loader]) => {
      const mod = await loader()
      return { slug: slugFromPath(path), ...mod.frontmatter } as Project
    })
  )
  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
