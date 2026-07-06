const items = [
  'Performance Marketing',
  'Web Development',
  'App Development',
  'SEO',
  'Business Consultation',
  'Growth Strategy',
  'Paid Ads',
  'Conversion',
]

/** Infinite scrolling capability band. Duplicated list = seamless loop. */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-lg text-muted">{item}</span>
            <span className="text-fuchsia">✦</span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}
