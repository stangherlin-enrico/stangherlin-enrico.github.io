import type { BlogTag } from '../data/blogTags'

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: BlogTag[]
  excerpt: string
  cover?: string
}
