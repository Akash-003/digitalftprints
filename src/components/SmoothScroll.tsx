import { useEffect } from 'react'
import Lenis from 'lenis'

/** Current Lenis instance, or null (unmounted / reduced motion). */
export let lenis: Lenis | null = null

/** Inertia smooth-scrolling for the whole page. Renders nothing. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new Lenis({ lerp: 0.12 })
    let raf = requestAnimationFrame(function loop(time) {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return null
}
