import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
} from 'motion/react'
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Fade + rise + focus into view on scroll. `delay` staggers siblings. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        // 'none' so the lingering filter doesn't break backdrop-blur children
        transitionEnd: { filter: 'none' },
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

export type HeadingSegment = string | { text: string; accent: true }

/**
 * Heading whose words stagger in on scroll. Segments marked `accent`
 * render in the brand gradient (`.text-gradient`).
 */
export function WordReveal({
  segments,
  className,
  as = 'h2',
}: {
  segments: HeadingSegment[]
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const Tag = as
  let i = 0
  return (
    <Tag className={className}>
      {segments.map((seg, s) => {
        const accent = typeof seg !== 'string'
        const text = accent ? seg.text : seg
        return text.split(' ').map((word) => (
          <motion.span
            key={`${s}-${word}-${i}`}
            className={`mr-[0.25em] inline-block ${accent ? 'text-gradient' : ''}`}
            initial={{ opacity: 0, y: '0.5em', filter: 'blur(6px)' }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transitionEnd: { filter: 'none' },
            }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05 * i++, ease: EASE }}
          >
            {word}
          </motion.span>
        ))
      })}
    </Tag>
  )
}

/** Translates children vertically against scroll for a depth offset. */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * Grid-card wrapper: `offset` items (right column) drift slightly against
 * scroll so two-column grids read as a staggered deck.
 */
export function DeckItem({
  children,
  offset,
}: {
  children: ReactNode
  offset: boolean
}) {
  if (!offset) return <Reveal>{children}</Reveal>
  return (
    <Parallax speed={20}>
      <Reveal delay={0.08} className="h-full">
        {children}
      </Reveal>
    </Parallax>
  )
}

/** Counts from 0 → `value` once scrolled into view. */
export function CountUp({
  value,
  suffix = '',
  decimals,
}: {
  value: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')
  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(v.toFixed(dp)),
    })
    return () => controls.stop()
  }, [inView, value, dp])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/** Button that leans toward the cursor; the label lags behind the pill. */
export function Magnetic({
  children,
  href,
  className,
  onClick,
}: {
  children: ReactNode
  href: string
  className?: string
  onClick?: () => void
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 17 })
  const sy = useSpring(y, { stiffness: 200, damping: 17 })
  // label trails the pill slightly for a layered feel
  const lx = useTransform(sx, (v) => v * -0.35)
  const ly = useTransform(sy, (v) => v * -0.35)

  function move(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      <motion.span className="inline-block" style={{ x: lx, y: ly }}>
        {children}
      </motion.span>
    </motion.a>
  )
}

/** Card that tilts in 3D toward the cursor. */
export function Tilt({
  children,
  className,
}: {
  children: (glow: MotionValue<string>) => ReactNode
  className?: string
}) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [5, -5]), {
    stiffness: 150,
    damping: 20,
  })
  const ry = useSpring(useTransform(x, [0, 1], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  })
  const glow = useTransform(
    [x, y],
    ([gx, gy]: number[]) =>
      `radial-gradient(400px circle at ${gx * 100}% ${gy * 100}%, rgba(217,70,239,0.18), transparent 60%)`,
  )

  function move(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  function reset() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={reset}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children(glow)}
    </motion.div>
  )
}
