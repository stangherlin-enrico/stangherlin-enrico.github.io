import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Glitchy404 } from '../components/ui/Glitchy404'
import { SEO } from '../components/ui/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15 + 0.2, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export function NotFound() {
  return (
    <>
      <SEO title="404 — Page not found" description="This page does not exist." url="/404" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* Glitchy number */}
        <div className="w-full overflow-x-hidden flex justify-center mb-6">
          <Glitchy404 width={700} height={190} color="hsl(38,92%,55%)" />
        </div>

        {/* Text */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="font-mono text-xs text-primary uppercase tracking-widest mb-3"
        >
          Page not found
        </motion.p>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4"
        >
          Nothing here but glitches.
        </motion.h1>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-secondary-foreground max-w-sm mb-10 leading-relaxed"
        >
          The page you're looking for was moved, deleted, or never existed.
          Either way, the address is wrong.
        </motion.p>

        {/* Actions */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m5-5l2 2" />
            </svg>
            Go home
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            View portfolio
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            Read blog
          </Link>
        </motion.div>

      </div>
    </>
  )
}
