import type { BlogPost } from '../../types/blog'
import { PostCard } from './PostCard'

type Props = { posts: BlogPost[] }

export function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return <p className="py-8 text-center text-gray-500">No posts found.</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
