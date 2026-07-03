import { Reveal, CountUp } from '../lib/anim'
import { stats } from '../data/site'

export default function Stats() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 rounded-3xl border border-line bg-surface p-10 backdrop-blur md:grid-cols-4 md:p-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-gradient font-display text-4xl font-bold sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
