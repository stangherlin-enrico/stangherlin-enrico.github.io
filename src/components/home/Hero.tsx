import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-medium text-accent-600 uppercase tracking-wider">
          {profile.role}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Hi, I'm {profile.name.split(' ')[0]}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600">
          {profile.bio}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700"
          >
            View my work
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  )
}
