import {
  motion,
  useInView,
  useMotionValue,
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

/** Fade + rise into view on scroll. `delay` staggers siblings. */
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
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
      ease: [0.22, 1, 0.36, 1],
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

/** Button that leans toward the cursor. Renders an anchor. */
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
  const sx = useSpring(x, { stiffness: 250, damping: 15 })
  const sy = useSpring(y, { stiffness: 250, damping: 15 })

  function move(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
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
      {children}
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
  const rx = useSpring(useTransform(y, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  })
  const ry = useSpring(useTransform(x, [0, 1], [-8, 8]), {
    stiffness: 200,
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
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children(glow)}
    </motion.div>
  )
}
