import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'
import { Badge } from '../ui/Badge'

type Props = { post: BlogPost }

export function PostCard({ post }: Props) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="border-b border-gray-100 py-6 last:border-0">
      <time className="text-xs text-gray-400 uppercase tracking-wide">{date}</time>
      <Link to={`/blog/${post.slug}`} className="group">
        <h2 className="mt-1 mb-2 text-xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="mb-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
  )
}
