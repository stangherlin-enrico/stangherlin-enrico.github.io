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
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-600">Articles, notes, and things I've learned.</p>
      </div>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading posts...</p>
      ) : (
        <PostList posts={results} />
      )}
    </>
  )
}
