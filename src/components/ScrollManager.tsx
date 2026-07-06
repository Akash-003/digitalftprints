import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { lenis } from './SmoothScroll'

/** Scrolls to top on route change, or to the #hash target if present. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // wait a frame so the target section is mounted
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -64 })
        else el.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
