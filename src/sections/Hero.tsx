import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'motion/react'
import { Magnetic } from '../lib/anim'
import HeroEffects from './HeroEffects'

const words = ['revenue.', 'rankings.', 'installs.', 'growth.']

const headline: { text: string; accent?: boolean }[] = [
  { text: 'We' },
  { text: 'leave' },
  { text: 'digital footprints', accent: true },
  { text: 'that' },
  { text: 'move' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  // content drifts up slower than the page and fades as you scroll away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center px-5 pt-24"
    >
      <HeroEffects />
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-6xl"
      >
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
              className={t.accent ? 'text-gradient' : ''}
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
          Performance marketing, web & app development, SEO, and growth
          consultation for brands that want to move fast.
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
      </motion.div>

      {/* scroll cue — fades once scrolling starts */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.25em] text-muted uppercase">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute top-0 left-0 h-4 w-px bg-gradient-to-b from-fuchsia to-cyan"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeIn' }}
          />
        </span>
      </motion.div>
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
      initial={{ opacity: 0, y: 28, rotateX: -40, filter: 'blur(8px)' }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        transitionEnd: { filter: 'none' },
      }}
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
    <span className="inline-block align-baseline">
      <AnimatePresence mode="wait">
        {/* accent class lives on the animating span: background-clip:text
            breaks if a filtered child renders in its own layer */}
        <motion.span
          key={words[i]}
          className="text-gradient inline-block"
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.35 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
