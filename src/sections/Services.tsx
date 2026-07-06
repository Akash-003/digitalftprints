import { motion } from 'motion/react'
import { Reveal, Tilt, WordReveal, DeckItem } from '../lib/anim'
import { services } from '../data/site'

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium tracking-widest text-fuchsia uppercase">
            What we do
          </p>
        </Reveal>
        <WordReveal
          segments={[
            'Four levers. One outcome:',
            { text: 'growth.', accent: true },
          ]}
          className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight text-fg sm:text-5xl"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <DeckItem key={s.id} offset={i % 2 === 1}>
              <Tilt className="h-full">
                {(glow) => (
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 backdrop-blur">
                    <motion.div
                      style={{ background: glow }}
                      className="pointer-events-none absolute inset-0"
                    />
                    <div className="relative">
                      <span className="font-display text-sm text-muted">
                        0{i + 1}
                      </span>
                      <h3 className="font-display mt-3 text-2xl font-semibold text-fg">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-muted">{s.blurb}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Tilt>
            </DeckItem>
          ))}
        </div>
      </div>
    </section>
  )
}
