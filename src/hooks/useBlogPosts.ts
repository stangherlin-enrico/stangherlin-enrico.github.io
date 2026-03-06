import { useEffect, useState } from 'react'
import { loadAllPosts } from '../utils/mdx'
import type { BlogPost } from '../types/blog'

const mdxModules = import.meta.glob('../content/blog/*.mdx')

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllPosts(mdxModules as Parameters<typeof loadAllPosts>[0]).then(
      (p) => {
        setPosts(p)
        setLoading(false)
      }
    )
  }, [])

  return { posts, loading }
}
