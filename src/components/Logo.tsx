import { Link } from 'react-router-dom'
import { site } from '../data/site'

/** Wordmark + gradient footprint mark. */
export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <defs>
          <linearGradient id="dfg" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#7c5cff" />
            <stop offset="0.5" stopColor="#d946ef" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* stylised footprint: sole + toes */}
        <path
          d="M20 4c3.3 0 5 2.8 5 6.5S22.5 20 19 22c-2.4 1.4-3.5 3.2-3.8 5.4-.2 1.6-1.3 2.6-2.9 2.6-2 0-3.3-1.6-3.3-3.8 0-3 1.6-5.6 4.4-8.2C16.2 15.2 15 13 15 10c0-3.6 1.8-6 5-6Z"
          fill="url(#dfg)"
        />
        <circle cx="9" cy="8" r="2.4" fill="url(#dfg)" />
        <circle cx="6" cy="13" r="2" fill="url(#dfg)" opacity="0.8" />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
        {site.name}
      </span>
    </Link>
  )
}
