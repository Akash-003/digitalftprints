import { Link } from 'react-router-dom'
import { site } from '../data/site'
import Logo from './Logo'

const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  whatsapp: 'WhatsApp',
}

export default function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url)

  return (
    <footer className="relative z-10 border-t border-line px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted">{site.blurb}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm md:items-end">
          <a
            href={`mailto:${site.email}`}
            className="text-fg transition-colors hover:text-fuchsia"
          >
            {site.email}
          </a>
          <div className="flex gap-4 text-muted">
            {socials.length > 0 ? (
              socials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-fg"
                >
                  {socialLabels[key] ?? key}
                </a>
              ))
            ) : (
              <Link to="/contact" className="transition-colors hover:text-fg">
                Get in touch →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
