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
  if (!mod) return <p className="text-gray-400 text-sm py-8">Loading...</p>

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
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          &larr; Back to blog
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <time className="text-xs text-gray-400 uppercase tracking-wide">{date}</time>
          <h1 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mb-4 text-lg text-gray-600">{frontmatter.excerpt}</p>
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <Content />
        </div>
      </article>

    </>
  )
}
