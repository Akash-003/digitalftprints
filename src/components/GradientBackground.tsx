import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'motion/react'

const GRID =
  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)'

/** Fixed, animated aurora behind all content. Pure CSS motion. */
export default function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* drifting colour blobs */}
      <div className="animate-drift absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-violet/30 blur-[120px]" />
      <div
        className="animate-drift absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-fuchsia/25 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-drift absolute -bottom-48 left-1/4 h-[40rem] w-[40rem] rounded-full bg-cyan/20 blur-[130px]"
        style={{ animationDelay: '-12s' }}
      />
      {/* subtle grid + top vignette */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: GRID, backgroundSize: '64px 64px' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/40 to-ink" />
      {/* above the vignette so the glow stays visible down the page */}
      <CursorSpotlight />
    </div>
  )
}

/**
 * Soft glow that trails the cursor and reveals the grid around it.
 * Site-wide (lives in the fixed background). No-op on touch devices.
 */
function CursorSpotlight() {
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const x = useSpring(mx, { stiffness: 120, damping: 25 })
  const y = useSpring(my, { stiffness: 120, damping: 25 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  const glow = useMotionTemplate`radial-gradient(550px circle at ${x}px ${y}px, rgba(124,92,255,0.11), rgba(217,70,239,0.04) 45%, transparent 70%)`
  const mask = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, black, transparent)`

  return (
    <>
      {/* colour glow */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />
      {/* brighter grid lines, revealed only around the cursor */}
      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: GRID,
          backgroundSize: '64px 64px',
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </>
  )
}
