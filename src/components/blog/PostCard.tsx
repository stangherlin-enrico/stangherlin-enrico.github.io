import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'

type Props = { post: BlogPost }

export function PostCard({ post }: Props) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-md border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30"
    >
      <p className="text-xs font-mono text-muted-foreground mb-2">{date}</p>
      <div className="flex items-start justify-between mb-2">
        <h2 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h2>
        {/* Arrow icon */}
        <svg
          className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-secondary-foreground line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-1 text-xs font-medium font-mono rounded-sm border border-border bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
