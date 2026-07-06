import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Continuous ambient background for the hero: a trail of glowing
 * footprints walking across the section + a cursor-aware particle
 * constellation. Renders nothing under prefers-reduced-motion.
 */
export default function HeroEffects() {
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <ParticleField />
      <FootprintTrail />
    </div>
  )
}

/* ── Footprint trail ────────────────────────────────────────────── */

const STEPS = 8
const STEP_INTERVAL = 1.1 // s between footfalls
const VISIBLE = 3 // s each print stays visible
const CYCLE = STEPS * STEP_INTERVAL + VISIBLE

// walk along a quadratic bezier arc: sets off near the CTAs, curves
// right, then climbs to the top-right corner — clear of the copy.
// coords are % of the hero box
const P0 = { x: 38, y: 93 }
const P1 = { x: 85, y: 74 }
const P2 = { x: 93, y: 14 }

const prints = Array.from({ length: STEPS }, (_, i) => {
  const t = i / (STEPS - 1)
  const u = 1 - t
  const x = u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x
  const y = u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y
  // tangent → step direction; normal → feet straddle the path
  const dx = 2 * u * (P1.x - P0.x) + 2 * t * (P2.x - P1.x)
  const dy = 2 * u * (P1.y - P0.y) + 2 * t * (P2.y - P1.y)
  const len = Math.hypot(dx, dy)
  const left = i % 2 === 0
  const side = left ? 1.4 : -1.4
  return {
    x: x + (-dy / len) * side,
    y: y + (dx / len) * side,
    // 109° aligns the footprint glyph with the direction of travel;
    // ±4° of toe-out wobble keeps the gait organic
    rot: Math.atan2(dy, dx) * (180 / Math.PI) + 109 + (left ? -4 : 4),
    left,
  }
})

function FootprintTrail() {
  return (
    <>
      {prints.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `rotate(${p.rot}deg) ${p.left ? 'scaleX(-1)' : ''}`,
          }}
        >
          <motion.svg
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="none"
            style={{
              filter:
                'drop-shadow(0 0 6px rgba(217,70,239,0.9)) drop-shadow(0 0 16px rgba(124,92,255,0.5))',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              duration: VISIBLE,
              times: [0, 0.15, 0.6, 1],
              delay: i * STEP_INTERVAL,
              repeat: Infinity,
              repeatDelay: CYCLE - VISIBLE,
              ease: 'easeInOut',
            }}
          >
            {/* same footprint mark as the logo */}
            <path
              d="M20 4c3.3 0 5 2.8 5 6.5S22.5 20 19 22c-2.4 1.4-3.5 3.2-3.8 5.4-.2 1.6-1.3 2.6-2.9 2.6-2 0-3.3-1.6-3.3-3.8 0-3 1.6-5.6 4.4-8.2C16.2 15.2 15 13 15 10c0-3.6 1.8-6 5-6Z"
              fill="#d946ef"
            />
            <circle cx="9" cy="8" r="2.4" fill="#7c5cff" />
            <circle cx="6" cy="13" r="2" fill="#22d3ee" opacity="0.8" />
          </motion.svg>
        </div>
      ))}
    </>
  )
}

/* ── Particle constellation ─────────────────────────────────────── */

const LINK_DIST = 110
const MOUSE_DIST = 130

function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let particles: { x: number; y: number; vx: number; vy: number }[] = []
    const mouse = { x: -9999, y: -9999 }
    let raf = 0
    let visible = true

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.floor((w * h) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }))
    }

    // ponytail: O(n²) link pass — fine at ≤70 particles, grid-bucket it if count grows
    function frame() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        // gentle cursor repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const md = Math.hypot(dx, dy)
        if (md < MOUSE_DIST && md > 0) {
          const f = ((MOUSE_DIST - md) / MOUSE_DIST) * 0.6
          p.x += (dx / md) * f
          p.y += (dy / md) * f
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(236,234,245,0.45)'
        ctx!.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(124,92,255,${(1 - d / LINK_DIST) * 0.22})`
            ctx!.stroke()
          }
        }
      }
      if (visible) raf = requestAnimationFrame(frame)
    }

    function onMouse(e: globalThis.MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(frame)
    })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0" />
}
