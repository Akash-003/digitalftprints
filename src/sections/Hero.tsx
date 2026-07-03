import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Magnetic } from '../lib/anim'
import { site } from '../data/site'

const words = ['revenue.', 'rankings.', 'installs.', 'growth.']

const headline: { text: string; gradient?: boolean }[] = [
  { text: 'We' },
  { text: 'leave' },
  { text: 'digital footprints', gradient: true },
  { text: 'that' },
  { text: 'move' },
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center px-5 pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
          A young, dynamic growth studio
        </motion.div>

        <h1 className="font-display max-w-4xl text-5xl leading-[1.02] font-bold tracking-tight text-fg sm:text-6xl md:text-7xl">
          {headline.map((t, i) => (
            <Word
              key={i}
              delay={0.1 + i * 0.08}
              className={t.gradient ? 'text-gradient' : ''}
            >
              {t.text}
            </Word>
          ))}
          <Word delay={0.1 + headline.length * 0.08}>
            <CyclingWord />
          </Word>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-7 max-w-xl text-lg text-muted"
        >
          {site.blurb} Performance marketing, web & app development, SEO, and
          consultation — built to move revenue, not just impressions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Magnetic
            href="/#work"
            className="inline-block rounded-full bg-gradient-to-r from-violet via-fuchsia to-cyan px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia/20"
          >
            See our work
          </Magnetic>
          <Magnetic
            href="/contact"
            className="inline-block rounded-full border border-line bg-surface px-7 py-3.5 text-sm font-semibold text-fg backdrop-blur"
          >
            Let's talk →
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}

function Word({
  children,
  delay,
  className = '',
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <motion.span
      className={`mr-[0.25em] inline-block ${className}`}
      initial={{ opacity: 0, y: 28, rotateX: -40 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

/** Cycles through the outcome words at the end of the headline. */
function CyclingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="text-gradient inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className="inline-block"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
