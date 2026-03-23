import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { SEO } from '../components/ui/SEO'
import { Badge } from '../components/ui/Badge'
import type { BlogPost as BlogPostType } from '../types/blog'

type MdxModule = {
  frontmatter: Omit<BlogPostType, 'slug'>
  default: React.ComponentType
}

const mdxModules = import.meta.glob('../content/blog/*.mdx')

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [mod, setMod] = useState<MdxModule | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const path = `../content/blog/${slug}.mdx`
    const loader = mdxModules[path]
    if (!loader) {
      setNotFound(true)
      return
    }
    loader().then((m: unknown) => setMod(m as MdxModule))
  }, [slug])

  if (notFound) return <Navigate to="/blog" replace />
  if (!mod) return <p className="text-muted-foreground text-sm py-8 font-mono">Loading...</p>

  const { frontmatter, default: Content } = mod
  const date = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.excerpt}
        image={frontmatter.cover}
        url={`/blog/${slug}`}
      />

      <div className="mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to blog
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <time className="text-xs font-mono text-muted-foreground uppercase tracking-wide">{date}</time>
          <h1 className="font-display mt-2 mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mb-4 text-lg text-secondary-foreground">{frontmatter.excerpt}</p>
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="prose max-w-none">
          <Content />
        </div>
      </article>
    </>
  )
}
