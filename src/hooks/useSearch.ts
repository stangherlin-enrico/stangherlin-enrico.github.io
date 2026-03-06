import { useMemo, useState } from 'react'
import { createPostIndex } from '../utils/search'
import type { BlogPost } from '../types/blog'

export function useSearch(posts: BlogPost[]) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => createPostIndex(posts), [posts])

  const results = useMemo(() => {
    if (!query.trim()) return posts
    return fuse.search(query).map((r) => r.item)
  }, [query, fuse, posts])

  return { query, setQuery, results }
}
