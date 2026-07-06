import { Reveal, Magnetic } from '../lib/anim'

// deterministic pseudo-random star positions (x%, y%, delay s, size px)
const stars = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37 + 13) % 100,
  y: (i * 53 + 7) % 100,
  delay: (i * 0.7) % 5,
  size: i % 3 === 0 ? 2 : 1,
}))

export default function CTA() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line px-8 py-16 text-center md:px-16 md:py-24">
            {/* slow-rotating conic border glow */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl p-px"
              style={{
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            >
              <div className="absolute -inset-full animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_10%,#7c5cff,#d946ef,#22d3ee,transparent_60%)]" />
            </div>

            {/* glow wash */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet/20 via-fuchsia/15 to-cyan/20" />

            {/* ambient starfield */}
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
              {stars.map((s, i) => (
                <span
                  key={i}
                  className="animate-twinkle absolute rounded-full bg-fg"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: s.size,
                    height: s.size,
                    animationDelay: `-${s.delay}s`,
                  }}
                />
              ))}
            </div>

            <h2 className="font-display mx-auto max-w-3xl text-3xl font-bold tracking-tight text-fg sm:text-5xl">
              Ready to leave a mark that{' '}
              <span className="text-gradient">converts?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              Tell us where you want to grow.
            </p>
            <div className="mt-9 flex justify-center">
              <Magnetic
                href="/contact"
                className="inline-block rounded-full bg-fg px-8 py-4 text-sm font-semibold text-ink"
              >
                Start a project →
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
