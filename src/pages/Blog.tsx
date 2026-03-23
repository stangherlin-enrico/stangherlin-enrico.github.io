import { SEO } from '../components/ui/SEO'
import { SearchBar } from '../components/blog/SearchBar'
import { PostList } from '../components/blog/PostList'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { useSearch } from '../hooks/useSearch'

export function Blog() {
  const { posts, loading } = useBlogPosts()
  const { query, setQuery, results } = useSearch(posts)

  return (
    <>
      <SEO
        title="Blog"
        description="Articles and thoughts on software development."
        url="/blog"
      />
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">Blog</h1>
        <p className="text-secondary-foreground">Articles, notes, and things I've learned.</p>
      </div>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm font-mono">Loading posts...</p>
      ) : (
        <PostList posts={results} />
      )}
    </>
  )
}
