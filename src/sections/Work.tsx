import { motion, type MotionValue } from 'motion/react'
import { Reveal, Tilt } from '../lib/anim'
import { projects } from '../data/projects'

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium tracking-widest text-cyan uppercase">
            Selected work
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight text-fg sm:text-5xl">
            Footprints we've left behind.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const CardInner = (glow: MotionValue<string>) => (
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-8 backdrop-blur">
                <motion.div
                  style={{ background: glow }}
                  className="pointer-events-none absolute inset-0"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {p.category}
                    </span>
                    {p.link && (
                      <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mt-6 text-2xl font-semibold text-fg">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-muted">{p.blurb}</p>

                  <div className="mt-auto pt-6">
                    <div className="text-gradient font-display text-3xl font-bold">
                      {p.result}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-ink-2 px-2 py-1 text-[11px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )

            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <Tilt className="h-full">
                  {(glow) =>
                    p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block h-full"
                      >
                        {CardInner(glow)}
                      </a>
                    ) : (
                      CardInner(glow)
                    )
                  }
                </Tilt>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
