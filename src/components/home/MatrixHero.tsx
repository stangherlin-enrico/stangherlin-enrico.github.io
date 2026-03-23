import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal } from 'lucide-react'
import { profile } from '../../data/profile'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?;:"[]{}\\|!@#$%^&*()_+-='

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 + 0.4, duration: 0.7, ease: 'easeOut' as const },
  }),
}

export function MatrixHero() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  useEffect(() => {
    if (!ready || !gridRef.current) return
    const grid = gridRef.current
    const SIZE = 60

    const createTile = () => {
      const tile = document.createElement('div')
      tile.classList.add('matrix-tile')
      tile.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
      tile.onclick = (e) => {
        const t = e.target as HTMLElement
        t.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
        t.classList.add('matrix-glitch')
        setTimeout(() => t.classList.remove('matrix-glitch'), 200)
      }
      return tile
    }

    const buildGrid = () => {
      grid.innerHTML = ''
      const cols = Math.floor(window.innerWidth / SIZE)
      const rows = Math.floor(window.innerHeight / SIZE)
      grid.style.setProperty('--cols', String(cols))
      grid.style.setProperty('--rows', String(rows))
      for (let i = 0; i < cols * rows; i++) grid.appendChild(createTile())
    }

    const onMouseMove = (e: MouseEvent) => {
      const radius = window.innerWidth / 4
      for (const el of grid.children) {
        const tile = el as HTMLElement
        const r = tile.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const intensity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / radius)
        tile.style.setProperty('--intensity', String(intensity))
      }
    }

    window.addEventListener('resize', buildGrid)
    window.addEventListener('mousemove', onMouseMove)
    buildGrid()

    return () => {
      window.removeEventListener('resize', buildGrid)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [ready])

  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black">

      {/* Matrix grid */}
      <div ref={gridRef} className="matrix-grid" />

      <style>{`
        .matrix-grid {
          display: grid;
          grid-template-columns: repeat(var(--cols), 1fr);
          grid-template-rows: repeat(var(--rows), 1fr);
          position: absolute;
          inset: 0;
        }
        .matrix-tile {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 1rem;
          --intensity: 0;
          opacity: calc(0.07 + var(--intensity) * 0.93);
          color: hsl(38, 92%, calc(45% + var(--intensity) * 35%));
          text-shadow: 0 0 calc(var(--intensity) * 14px) hsl(38, 92%, 55%);
          transform: scale(calc(1 + var(--intensity) * 0.18));
          transition: color 0.15s ease, text-shadow 0.15s ease, transform 0.15s ease;
          user-select: none;
        }
        .matrix-tile.matrix-glitch {
          animation: matrix-pop 0.2s ease;
        }
        @keyframes matrix-pop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.25); color: hsl(38,92%,80%); text-shadow: 0 0 12px hsl(38,92%,55%); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Overlay card */}
      <div className="relative z-10 text-center px-8 py-10 mx-4 bg-black/65 backdrop-blur-md rounded-xl border border-primary/20 max-w-2xl w-full">

        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-6"
        >
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono text-primary">{profile.role}</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
        >
          {profile.name.split(' ')[0]}<br />
          <span className="text-gradient">{profile.name.split(' ')[1]}</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base text-white/60 mb-10 max-w-lg mx-auto leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            View my work
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-white/20 text-white/80 font-semibold text-sm hover:border-primary/50 hover:text-primary transition-colors"
          >
            Read the blog
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
