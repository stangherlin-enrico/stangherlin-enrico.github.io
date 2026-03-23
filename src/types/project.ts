export type ProjectStatus = 'released' | 'in-progress' | 'archived'

export type ChangelogType = 'Feature' | 'Fix' | 'Internal' | 'Breaking'

export interface ChangelogEntry {
  version: string
  type: ChangelogType
  date: string
  description: string
}

export interface Project {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  status: ProjectStatus
  openSource?: boolean
  confidential?: boolean
  featured?: boolean
  url?: string
  github?: string
  image?: string
  setupGuide?: string   // path to a downloadable setup/docs file (relative to public/)
  date: string
  changelog?: ChangelogEntry[]
}
