import { Reveal, Magnetic } from '../lib/anim'

export default function CTA() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line px-8 py-16 text-center md:px-16 md:py-24">
            {/* glow wash */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet/20 via-fuchsia/15 to-cyan/20" />
            <h2 className="font-display mx-auto max-w-3xl text-3xl font-bold tracking-tight text-fg sm:text-5xl">
              Ready to leave a mark that <span className="text-gradient">converts?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              Tell us where you want to grow. We'll bring the strategy, the
              build, and the numbers.
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
