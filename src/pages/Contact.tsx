import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import PageWrap from '../components/PageWrap'
import { Reveal } from '../lib/anim'
import { site, services } from '../data/site'

// ── Submit handler ──────────────────────────────────────────────
// Currently opens the visitor's email app with everything pre-filled.
// To upgrade to a real backend later (e.g. Web3Forms), replace the body
// of `submit()` with a fetch() POST — nothing else needs to change.
function buildMailto(data: {
  name: string
  email: string
  company: string
  service: string
  message: string
}) {
  const subject = `New enquiry — ${data.service || 'General'} — ${data.name}`
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || '—'}`,
    `Service: ${data.service || '—'}`,
    '',
    data.message,
  ].join('\n')
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

const fieldCls =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-fuchsia/60 backdrop-blur'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      company: String(form.get('company') || ''),
      service: String(form.get('service') || ''),
      message: String(form.get('message') || ''),
    }
    window.location.href = buildMailto(data)
    setSent(true)
  }

  return (
    <PageWrap>
      <section className="relative min-h-screen px-5 pt-32 pb-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1.2fr]">
          {/* Left — pitch + direct contact */}
          <div>
            <Reveal>
              <p className="text-sm font-medium tracking-widest text-fuchsia uppercase">
                Contact
              </p>
              <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-fg sm:text-6xl">
                Let's build your next{' '}
                <span className="text-gradient">footprint.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted">
                Tell us about your brand and where you want to grow. We usually
                reply within one business day.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-4">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-fg transition-colors hover:text-fuchsia"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface">
                    ✉
                  </span>
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — the form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              className="rounded-3xl border border-line bg-surface p-7 backdrop-blur sm:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Your name" className={fieldCls} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={fieldCls}
                />
              </div>
              <input
                name="company"
                placeholder="Company (optional)"
                className={`${fieldCls} mt-4`}
              />
              <select name="service" defaultValue="" className={`${fieldCls} mt-4`}>
                <option value="" disabled>
                  What can we help with?
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.title} className="bg-ink-2">
                    {s.title}
                  </option>
                ))}
                <option value="Other" className="bg-ink-2">
                  Something else
                </option>
              </select>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project…"
                className={`${fieldCls} mt-4 resize-none`}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet via-fuchsia to-cyan py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia/20"
              >
                Send message
              </motion.button>

              {sent && (
                <p className="mt-4 text-center text-sm text-cyan">
                  Your email app should have opened with your message ready to
                  send. If not, email us at{' '}
                  <a href={`mailto:${site.email}`} className="underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  )
}
