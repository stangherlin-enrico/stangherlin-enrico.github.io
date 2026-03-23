/**
 * Canonical blog tag list.
 * All blog posts must use only these tags.
 * Add new tags here before using them in a post.
 */
export const BLOG_TAGS = [
  'meta',       // Posts about the blog or site itself
  'personal',   // Personal reflections and life updates
  'dev',        // Software development — architecture, tools, craft
  'projects',   // Progress updates on specific projects
  'music',      // Music recommendations and thoughts
  'thoughts',   // General observations that don't fit elsewhere
] as const

export type BlogTag = typeof BLOG_TAGS[number]
