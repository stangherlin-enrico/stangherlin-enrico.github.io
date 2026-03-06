import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              LinkedIn
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
