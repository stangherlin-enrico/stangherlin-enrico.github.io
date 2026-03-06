import Fuse from 'fuse.js'
import type { BlogPost } from '../types/blog'

export function createPostIndex(posts: BlogPost[]): Fuse<BlogPost> {
  return new Fuse(posts, {
    keys: ['title', 'excerpt', 'tags'],
    threshold: 0.35,
    includeScore: true,
  })
}
